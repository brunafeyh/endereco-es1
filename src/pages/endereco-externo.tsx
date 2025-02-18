import { FC } from "react"
import { PageLayout } from "../layout/page-layout"
import { Typography, useTheme } from "@mui/material"
import { FONT_WEIGHTS } from "../temas/fontes"

const titulo = 'Busca de Endereço Externo'

export const PaginadeBuscaDeEnderecoExterno: FC = () => {
    const theme = useTheme()
    return (
        <PageLayout title={titulo}>
            <Typography mb={2} fontSize={theme.spacing(2)} fontWeight={FONT_WEIGHTS.light}>{titulo}</Typography>
        </PageLayout>
    )
}