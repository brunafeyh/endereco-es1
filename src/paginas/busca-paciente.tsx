import { FC, useState } from "react";
import { PageLayout } from "../layout/page-layout";
import {
    TextField,
    Typography,
    useTheme,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
} from "@mui/material";
import { FONT_WEIGHTS } from "../temas/fontes";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { PacienteTipo } from "../tipos/paciente";
import PacienteService from "../servicos/paciente";

const TITULO = "Buscar Paciente por ID";

export const PaginadeBuscadePacienteporId: FC = () => {
    const theme = useTheme();
    const [id, setId] = useState<string>("");
    const [paciente, setPaciente] = useState<PacienteTipo>();

    const service = new PacienteService();

    const mutation = useMutation<PacienteTipo, Error, string>({
        mutationFn: (idDigitado) => service.buscarPacienteporID(Number(idDigitado)),
        onSuccess: (data) => {
            setPaciente(data);
        },
        onError: (error) => {
            console.error("Erro ao buscar paciente:", error);
            setPaciente(undefined);
        },
    });

    const handleBuscar = () => {
        if (!id) return;
        mutation.mutate(id);
    };

    return (
        <PageLayout title={TITULO}>
            <Box marginLeft={30}>
                <Typography
                    mb={2}
                    fontSize={theme.spacing(2.5)}
                    fontWeight={FONT_WEIGHTS.light}
                >
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
                        Erro ao buscar paciente.
                    </Typography>
                )}

                {paciente && (
                    <Card sx={{ mt: 4, p: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Typography
                                fontWeight={FONT_WEIGHTS.medium}
                                fontSize={theme.spacing(2)}
                                gutterBottom
                            >
                                Dados do Paciente
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>ID</Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {paciente.id ?? "-"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>Nome</Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {paciente.nome ?? "-"}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>Sexo</Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {paciente.sexo.nome ?? "-"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>
                                        CEP Endereço
                                    </Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {paciente.enderecoEspecifico.endereco.cep ?? "-"}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>
                                        Número
                                    </Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {paciente.enderecoEspecifico.numero ?? "-"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>
                                        Complemento
                                    </Typography>
                                    <Typography color="textSecondary" mb={2}>
                                        {paciente.enderecoEspecifico.complemento ?? "-"}
                                    </Typography>
                                </Grid>
                            </Grid>

                            {/* Listagem de Telefones */}
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>
                                        Telefones
                                    </Typography>
                                </Grid>
                            </Grid>
                            {paciente.telefones && paciente.telefones.length > 0 ? (
                                paciente.telefones.map((tel, index) => (
                                    <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                                        <Grid item xs={4}>
                                            <Typography color="textSecondary">
                                                Número: {tel.numero}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography color="textSecondary">
                                                DDD: {tel.ddd.numeroDDD}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography color="textSecondary">
                                                DDI: {tel.ddi.numeroDDI}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ))
                            ) : (
                                <Typography color="textSecondary" mb={2}>
                                    Nenhum telefone cadastrado.
                                </Typography>
                            )}

                            {/* Listagem de Emails */}
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12}>
                                    <Typography fontWeight={FONT_WEIGHTS.medium}>
                                        Emails
                                    </Typography>
                                </Grid>
                            </Grid>
                            {paciente.emails && paciente.emails.length > 0 ? (
                                paciente.emails.map((mail, index) => (
                                    <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                                        <Grid item xs={12}>
                                            <Typography color="textSecondary">
                                                Email: {mail.email}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ))
                            ) : (
                                <Typography color="textSecondary" mb={2}>
                                    Nenhum email cadastrado.
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                )}
            </Box>
        </PageLayout>
    );
};
