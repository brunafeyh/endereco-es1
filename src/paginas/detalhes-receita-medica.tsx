import { FC } from "react";
import { PageLayout } from "../layout/page-layout";
import { Box, Typography, useTheme, Grid, Card, CardContent } from "@mui/material";
import { FONT_WEIGHTS } from "../temas/fontes";
import { useParams } from "react-router-dom";
import { usarReceitaMedicaPorNumero } from "../hooks/receita-medica/usar-receita-medica-por-numero";
import { formatarData } from "../utilidades/formatar-data"; // Caso queira formatar a data de emissão

const title = 'Receita Médica'

export const DetalhesReceitaMedica: FC = () => {
    const theme = useTheme();
    const { id } = useParams();
    const { data, isLoading, error } = id ? usarReceitaMedicaPorNumero(Number(id)) : { data: null };

    if (isLoading) {
        return <Typography>Carregando...</Typography>;
    }

    if (error) {
        return <Typography>Erro ao carregar a receita médica.</Typography>;
    }

    // Dados da receita médica
    const { medico, paciente, diagnosticoCID, medicamentoReceitaMedicas, dataEmissao } = data || {};

    return (
        <PageLayout title={title}>
            <Box marginLeft={30} width="100%">
                <Typography mb={2} fontSize={theme.spacing(2.5)} fontWeight={FONT_WEIGHTS.light}>
                    {title}
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} gap={2}>
                        <Card sx={{mb: 2}}>
                            <CardContent >
                                <Typography gutterBottom>Dados da Receita</Typography>
                                <Typography><strong>Data de Emissão:</strong> {formatarData(dataEmissao || '')}</Typography>
                                <Typography><strong>Diagnóstico CID:</strong> {diagnosticoCID?.codigo} - {diagnosticoCID?.descricao}</Typography>
                            </CardContent>
                        </Card >
                        <Card>
                            <CardContent >
                                <Typography gutterBottom>Médico</Typography>
                                <Typography><strong>Nome:</strong> {medico?.nome}</Typography>
                                <Typography><strong>CRM:</strong> {medico?.crm?.crm}</Typography>
                                <Typography><strong>Sexo:</strong> {medico?.sexo?.nome}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography>Paciente</Typography>
                                <Typography><strong>Nome:</strong> {paciente?.nome}</Typography>
                                <Typography><strong>CPF:</strong> {paciente?.cpf?.cpf}</Typography>
                                <Typography><strong>Sexo:</strong> {paciente?.sexo?.nome}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Typography mt={3}>Medicamentos Prescritos</Typography>
                {medicamentoReceitaMedicas && medicamentoReceitaMedicas.length > 0 ? (
                    medicamentoReceitaMedicas.map((medicamento, index) => (
                        <Card key={index} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography><strong>Medicamento {index + 1}:</strong> {medicamento.medicamento?.nome || 'Não especificado'}</Typography>
                                <Typography><strong>Data Início:</strong> {formatarData(medicamento.dataInicio)}</Typography>
                                <Typography><strong>Data Fim:</strong> {formatarData(medicamento.dataFim)}</Typography>
                                <Typography><strong>Posologia:</strong> {medicamento.posologia}</Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography>Nenhum medicamento prescrito.</Typography>
                )}
            </Box>
        </PageLayout>
    )
}
