import { FC } from "react";
import { PageLayout } from "../layout/page-layout";
import { Typography, useTheme } from "@mui/material";
import { FONT_WEIGHTS } from "../temas/fontes";

const TITULO = 'Busca de Paciente por ID'

export const PaginadeBuscadePacientePorId: FC = () => {
    const theme = useTheme()
    return (
        <PageLayout title={TITULO}>
            <Typography mb={2} fontSize={theme.spacing(2)} fontWeight={FONT_WEIGHTS.light}>{TITULO}</Typography>
        </PageLayout>
    )
}