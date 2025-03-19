import { FC } from "react";
import { PageLayout } from "../layout/page-layout";
import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Tabela from "../componentes/simple-table";
import { TableCellBody, TableRowBody } from "../componentes/simple-table/styles";
import { FONT_WEIGHTS } from "../temas/fontes";
import { usarReceitasMedicas } from "../hooks/receita-medica/usar-receita-medica";
import { formatarData } from "../utilidades/formatar-data";
import { useNavigate } from "react-router-dom";

const TITULO = "Busca de Receitas Médicas";

export const columns = [
    { field: "numero", headerName: "Número" },
    { field: "dataEmissao", headerName: "Data de Emissão" },
    { field: "medico", headerName: "Médico" },
    { field: "paciente", headerName: "Paciente" },
    { field: "diagnosticoCID", headerName: "Diagnóstico CID" },
]


export const BuscarReceitasMedicas: FC = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { data, isLoading, error } = usarReceitasMedicas()

    return (
        <PageLayout title={TITULO}>
            <Box marginLeft={20} width={1000}>
                <Typography
                    mb={2}
                    fontSize={theme.spacing(2.5)}
                    fontWeight={FONT_WEIGHTS.light}
                >
                    {TITULO}
                </Typography>

                <Tabela
                    columns={columns}
                    data={data || []}
                    totalRows={data?.length || 0}
                    renderData={(row: Record<string, any>) => {
                        console.log(row.id)
                        return (
                            <TableRowBody key={row.id} sx={{cursor: 'pointer'}}hover onClick={() => navigate(`/detalhes-receita-medica/${row.numero}`)}>
                                <TableCellBody>{formatarData(row.dataEmissao || '-')}</TableCellBody>
                                <TableCellBody>{row.numero || '-'}</TableCellBody>
                                <TableCellBody>{row.medico?.nome || '-'}</TableCellBody>
                                <TableCellBody>{row.paciente?.nome || '-'}</TableCellBody>
                                <TableCellBody>{row.diagnosticoCID?.codigo || '-'}</TableCellBody>
                            </TableRowBody>

                        )
                    }
                    }
                    isLoading={isLoading}
                    error={error}
                />
            </Box>
        </PageLayout>
    );
};
