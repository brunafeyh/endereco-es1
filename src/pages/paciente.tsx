import { Typography } from "@mui/material";
import { FC } from "react";
import { PageLayout } from "../layout/page-layout";

const TITULO = 'Registro de Paciente'

export const PaginadeRegistroDePaciente: FC = () => {
    return (
        <PageLayout title={TITULO}>
            <Typography color="red">{TITULO}</Typography>
        </PageLayout>
    )
}