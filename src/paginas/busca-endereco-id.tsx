import { FC, useState } from "react";
import { PageLayout } from "../layout/page-layout";
import { TextField, Typography, useTheme, Button, Card, CardContent, Divider, Grid } from "@mui/material";
import { FONT_WEIGHTS } from "../temas/fontes";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { EnderecoTipo } from "../tipos/endereco";
import EnderecoService from "../servicos/endereco";

const TITULO = "Buscar Endereço por ID"

export const PaginadeBuscadeEnderecoporId: FC = () => {
    const theme = useTheme()
    const [id, setId] = useState<string>("")
    const [endereco, setEndereco] = useState<EnderecoTipo>()

    const service = new EnderecoService()

    const mutation = useMutation<EnderecoTipo, Error, string>({
        mutationFn: (idDigitado) => service.obterEnderecoID(Number(idDigitado)),
        onSuccess: (data) => {
            setEndereco(data);
        },
        onError: (error) => {
            console.error("Erro ao buscar endereço:", error);
            setEndereco(undefined);
        },
    })

    const handleBuscar = () => {
        if (!id) return;
        mutation.mutate(id);
    }

    return (
        <PageLayout title={TITULO}>
            <Box marginLeft={30}>
                <Typography mb={2} fontSize={theme.spacing(2)} fontWeight={FONT_WEIGHTS.light}>
                    {TITULO}
                </Typography>
                <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Grid item xs={8}>
                        <TextField
                            label="ID"
                            variant="filled"
                            type="text"
                            fullWidth
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleBuscar}
                            disabled={!id || mutation.isPending}
                        >
                            Buscar
                        </Button>
                    </Grid>
                </Grid>

                {mutation.isPending && <Typography mt={2}>Carregando...</Typography>}
                {mutation.error && (
                    <Typography mt={2} color="error">
                        Erro ao buscar endereço.
                    </Typography>
                )}

                {endereco && (
                    <Card sx={{ mt: 4, p: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Typography fontWeight={FONT_WEIGHTS.medium} fontSize={theme.spacing(2)} gutterBottom>
                                Endereço
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>ID</Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {endereco.id ?? "-"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>CEP</Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {endereco.cep ?? "-"}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>Logradouro</Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {endereco.logradouro?.nome ?? "-"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>Tipo de Logradouro</Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {endereco.logradouro?.tipoLogradouro?.nome ?? "-"}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>Bairro</Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {endereco.bairro?.nome ?? "-"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>Cidade</Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {endereco.cidade?.nome ?? "-"}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>Unidade Federativa</Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {endereco.cidade?.unidadeFederativa?.nome ?? "-"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>Sigla UF</Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {endereco.cidade?.unidadeFederativa?.sigla ?? "-"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </PageLayout>
    );
}