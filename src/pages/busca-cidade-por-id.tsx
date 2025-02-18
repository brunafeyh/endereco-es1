import { FC } from "react";
import { PageLayout } from "../layout/page-layout";
import { Typography, useTheme } from "@mui/material"
import { FONT_WEIGHTS } from "../temas/fontes";
const title = "Busca de Cidade"

export const BuscadeCidadePage: FC = () => {
    const theme = useTheme()
    return (
        <PageLayout title={title}>
            <Typography mb={2} fontSize={theme.spacing(2)} fontWeight={FONT_WEIGHTS.light}>{title}</Typography>
        </PageLayout>
    )
}