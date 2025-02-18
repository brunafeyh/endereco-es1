import { FC } from "react"
import { TableCellBody, TableRowBody } from "../componentes/simple-table/styles"
import Tabela from "../componentes/simple-table"
import { PageLayout } from "../layout/page-layout"
import { Typography, useTheme } from "@mui/material"
import { FONT_WEIGHTS } from "../temas/fontes"
import { Box } from "@mui/system"

const TITULO = "Busca de Endereço por CEP"

export const columns = [
    { field: "id", headerName: "Id" },
    { field: "logradouro", headerName: "Logradouro" },
    { field: "tipoLogradouro", headerName: "Tipo Logradouro" },
    { field: "bairro", headerName: "Bairro" },
    { field: "cidade", headerName: "Cidade" },
    { field: "uf", headerName: "UF" },
]

export const mockData = [
    { id: 1, logradouro: "cell text", tipoLogradouro: "cell text", bairro: "cell text", cidade: "cell text", uf: "cell text" },
    { id: 2, logradouro: "cell text", tipoLogradouro: "cell text", bairro: "cell text", cidade: "cell text", uf: "cell text" },
    { id: 3, logradouro: "cell text", tipoLogradouro: "cell text", bairro: "cell text", cidade: "cell text", uf: "cell text" },
]

const renderData = (row: Record<string, any>) => (
    <TableRowBody key={row.id}>
        <TableCellBody>{row.id}</TableCellBody>
        <TableCellBody>{row.logradouro}</TableCellBody>
        <TableCellBody>{row.tipoLogradouro}</TableCellBody>
        <TableCellBody>{row.bairro}</TableCellBody>
        <TableCellBody>{row.cidade}</TableCellBody>
        <TableCellBody>{row.uf}</TableCellBody>
    </TableRowBody>
)

export const PaginadeBuscadeEnderecoporCep: FC = () => {
    const theme = useTheme()
    return (
        <PageLayout title={TITULO}>
            <Box marginLeft={30}>
                <Typography mb={2} fontSize={theme.spacing(2)} fontWeight={FONT_WEIGHTS.light}>{TITULO}</Typography>
                <Tabela
                    columns={columns}
                    data={mockData}
                    totalRows={mockData.length}
                    renderData={renderData}
                />
            </Box>
        </PageLayout>
    )
}