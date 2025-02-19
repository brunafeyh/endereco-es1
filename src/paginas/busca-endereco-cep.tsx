import { FC, useState } from "react";
import { PageLayout } from "../layout/page-layout";
import { TextField, Typography, useTheme, Button } from "@mui/material";
import { Box } from "@mui/system";
import Tabela from "../componentes/simple-table";
import { TableCellBody, TableRowBody } from "../componentes/simple-table/styles";
import { FONT_WEIGHTS } from "../temas/fontes";
import { useMutation } from "@tanstack/react-query";
import { EnderecoTipo } from "../tipos/endereco";
import EnderecoService from "../servicos/endereco";

const TITULO = "Busca de Endereço por CEP";

export const columns = [
  { field: "id", headerName: "Id" },
  { field: "logradouro", headerName: "Logradouro" },
  { field: "tipoLogradouro", headerName: "Tipo Logradouro" },
  { field: "bairro", headerName: "Bairro" },
  { field: "cidade", headerName: "Cidade" },
  { field: "uf", headerName: "UF" },
];

const renderData = (row: Record<string, any>) => (
  <TableRowBody key={row.id}>
    <TableCellBody>{row.id || '-'}</TableCellBody>
    <TableCellBody>{row.logradouro?.nome || '-'}</TableCellBody>
    <TableCellBody>{row.logradouro?.tipoLogradouro?.nome || '-'}</TableCellBody>
    <TableCellBody>{row.bairro?.nome || '-'}</TableCellBody>
    <TableCellBody>{row.cidade?.nome || '-'}</TableCellBody>
    <TableCellBody>{row.cidade?.unidadeFederativa?.sigla || '-'}</TableCellBody>
  </TableRowBody>
);

export const PaginadeBuscadeEnderecoporCep: FC = () => {
  const theme = useTheme();
  const [cep, setCep] = useState<string>("");
  const [enderecos, setEnderecos] = useState<EnderecoTipo[]>([]);
  console.log(enderecos);

  const service = new EnderecoService();

  const mutation = useMutation<EnderecoTipo[], Error, string>({
    mutationFn: (cep) => service.listarEnderecosCEP(cep),
    onSuccess: (data) => {
      setEnderecos(data);
    },
    onError: (error) => {
      console.error("Erro ao buscar endereços:", error);
      setEnderecos([]);
    },
  });

  const handleBuscar = () => {
    if (!cep) return;
    mutation.mutate(cep);
  };

  return (
    <PageLayout title={TITULO}>
      <Box marginLeft={20}>
        <Typography
          mb={2}
          fontSize={theme.spacing(2.5)}
          fontWeight={FONT_WEIGHTS.light}
        >
          {TITULO}
        </Typography>

        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="CEP"
            variant="filled"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleBuscar}
            disabled={!cep || mutation.isPending}
          >
            Buscar
          </Button>
        </Box>

        <Tabela
          columns={columns}
          data={enderecos}
          totalRows={enderecos.length}
          renderData={renderData}
          isLoading={mutation.isPending}
          error={mutation.error}
        />
      </Box>
    </PageLayout>
  );
};
