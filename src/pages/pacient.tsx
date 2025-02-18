import { Typography } from "@mui/material";
import { FC } from "react";
import { PageLayout } from "../layout/page-layout";

const TITLE_PAGE = 'Registro de Paciente'

export const PacientRegisterPage: FC = () => {
    return (
        <PageLayout title={TITLE_PAGE}>
    <Typography color="red">{TITLE_PAGE}</Typography>
    </PageLayout>
    )
}