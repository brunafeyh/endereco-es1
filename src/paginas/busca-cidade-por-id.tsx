import { FC, useState } from "react";
import { PageLayout } from "../layout/page-layout";
import { TextField, Typography, useTheme, Button, Card, CardContent, Divider, Grid, Box, CircularProgress } from "@mui/material";
import { FONT_WEIGHTS } from "../temas/fontes";
import { useMutation } from "@tanstack/react-query";
import CidadeService from "../servicos/cidade";
import { CidadeTipo } from "../tipos/cidade";
import { UNIOESTE_COLORS } from "../temas/cores";

const title = "Buscar Cidade por ID"

export const BuscadeCidadePage: FC = () => {
    const theme = useTheme();
    const [value, setValue] = useState<string>("");
    const [cidade, setCidade] = useState<CidadeTipo | undefined>(undefined);

    const service = new CidadeService();

    const mutation = useMutation<CidadeTipo, Error, number>({
        mutationFn: (id: number) => service.obterCidadeporId(id),
        onSuccess: (data) => {
            setCidade(data)
        },
        onError: (error) => {
            console.error("Erro ao buscar cidade:", error);
            setCidade(undefined)
        },
    })

    const handleBuscar = () => {
        if (!value) return;
        mutation.mutate(Number(value))
    }

    return (
        <PageLayout title={title}>
            <Box ml={40}>
                <Typography mb={2} fontSize={theme.spacing(2)} fontWeight={FONT_WEIGHTS.light}>
                    {title}
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            label="ID"
                            variant="filled"
                            type="text"
                            fullWidth
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" fullWidth onClick={handleBuscar} disabled={!value || mutation.isPending}>
                            Buscar
                        </Button>
                    </Grid>
                </Grid>

                {mutation.error && <Typography mt={2} color="error">Erro ao buscar cidade.</Typography>}

                {cidade && (
                    <Card sx={{ mt: 4, p: 2, boxShadow: 3 }}>
                        <CardContent>

                            {mutation.isPending ? <CircularProgress sx={{ color: UNIOESTE_COLORS.primary.p60 }} /> :
                                (
                                    <>
                                        <Typography fontWeight={FONT_WEIGHTS.medium} fontSize={theme.spacing(2)} gutterBottom>
                                            Cidade
                                        </Typography>
                                        <Divider sx={{ mb: 2 }} />

                                        <Typography fontWeight={FONT_WEIGHTS.medium}>ID</Typography>
                                        <Typography color="textSecondary" mb={2}>{cidade.id}</Typography>

                                        <Typography fontWeight={FONT_WEIGHTS.medium}>Nome</Typography>
                                        <Typography color="textSecondary" mb={2}>{cidade.nome}</Typography>

                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography fontWeight={FONT_WEIGHTS.medium}>Unidade Federativa</Typography>
                                                <Typography color="textSecondary">{cidade.unidadeFederativa.nome}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography fontWeight={FONT_WEIGHTS.medium}>Sigla UF</Typography>
                                                <Typography color="textSecondary">{cidade.unidadeFederativa.sigla}</Typography>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}

                        </CardContent>
                    </Card>
                )}
            </Box>
        </PageLayout>
    );
};
