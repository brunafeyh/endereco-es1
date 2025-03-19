import { FC } from "react";
import { PageLayout } from "../layout/page-layout";
import { Box, Typography, useTheme } from "@mui/material";
import { FONT_WEIGHTS } from "../temas/fontes";
import { ReceitaMedicaForm } from "../componentes/formularios/cadastro-receita-medica";

const title = 'Cadastrar Receita Médica'

export const CadastroReceitaMedica: FC = () =>{
    const theme = useTheme()
    return (
        <PageLayout title={title}>
            <Box marginLeft={30}>
                <Typography mb={2} fontSize={theme.spacing(2.5)} fontWeight={FONT_WEIGHTS.light}>
                    {title}
                </Typography>
                <ReceitaMedicaForm/>
                </Box>
        </PageLayout>
    )
}