import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { PacienteTipo } from "../tipos/paciente";
import { usarSexos } from "../hooks/usar-sexos";
import { usarDDDs } from "../hooks/usar-ddds";
import { usarDDIs } from "../hooks/usar-ddis";
import { PageLayout } from "../layout/page-layout";
import { FONT_WEIGHTS } from "../temas/fontes";
import EnderecoService from "../servicos/endereco";
import { usarPacienteMutations } from "../hooks/usar-paciente-mutations";

const PaginaCriarPaciente: React.FC = () => {
    const { criarPaciente } = usarPacienteMutations()
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
    } = useForm<PacienteTipo>();

    const {
        fields: telefoneFields,
        append: appendTelefone,
        remove: removeTelefone,
    } = useFieldArray({
        control,
        name: "telefones",
    });
    const {
        fields: emailFields,
        append: appendEmail,
        remove: removeEmail,
    } = useFieldArray({
        control,
        name: "emails",
    });

    const { data: sexos } = usarSexos();
    const { data: ddds } = usarDDDs();
    const { data: ddis } = usarDDIs();

    
    const handleSexoChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const selectedValue = event.target.value;
        const selectedSexo = sexos?.find((s) => s.sigla.padEnd(10, " ") === selectedValue);
        if (selectedSexo) {
            setValue("sexo.sigla", selectedValue);
            setValue("sexo.nome", selectedSexo.nome);
        }
    };

    const handleEnderecoIdChange = async (
        event: React.FocusEvent<HTMLInputElement>
    ) => {
        const idInput = event.target.value;
        if (!idInput) return;
        const enderecoId = parseInt(idInput, 10);
        if (isNaN(enderecoId)) return;

        try {
            const enderecoService = new EnderecoService();
            let endereco = await enderecoService.obterEnderecoID(enderecoId);
            if (endereco?.logradouro.tipoLogradouro.sigla && endereco.logradouro.tipoLogradouro.sigla.length < 10) {
                endereco.logradouro.tipoLogradouro.sigla = endereco.logradouro.tipoLogradouro.sigla.padEnd(10, " ");
            }
            if (
                endereco?.cidade?.unidadeFederativa?.sigla &&
                endereco.cidade.unidadeFederativa.sigla.length < 10
            ) {
                endereco.cidade.unidadeFederativa.sigla =
                    endereco.cidade.unidadeFederativa.sigla.padEnd(10, " ");
            }

            setValue("enderecoEspecifico.endereco", endereco);
        } catch (error) {
            console.error("Erro ao buscar endereço:", error);
        }
    };

    const onSubmit = (data: PacienteTipo) => {
        console.log("Paciente cadastrado:", data);
        criarPaciente.mutate(data)
    }

    const { onChange: sexoOnChange, ...sexoRegister } = register("sexo.sigla");

    return (
        <PageLayout title="Cadastro de Paciente">
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
                <Typography variant="h4" mb={3} fontWeight={FONT_WEIGHTS.medium}>
                    Cadastro de Paciente
                </Typography>

                <TextField
                    label="Nome"
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register("nome")}
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                />

                <TextField
                    label="CPF"
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register("cpf.cpf")}
                    error={!!errors.cpf?.cpf}
                    helperText={errors.cpf?.cpf?.message}
                />
                <Typography variant="h6" mt={2} mb={1}>
                    Endereço Específico
                </Typography>
                <TextField
                    label="Número"
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register("enderecoEspecifico.numero")}
                    error={!!errors.enderecoEspecifico?.numero}
                    helperText={errors.enderecoEspecifico?.numero?.message}
                />
                <TextField
                    label="Complemento"
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register("enderecoEspecifico.complemento")}
                    error={!!errors.enderecoEspecifico?.complemento}
                    helperText={errors.enderecoEspecifico?.complemento?.message}
                />
           
                <TextField
                    label="ID do Endereço"
                    fullWidth
                    sx={{ mb: 2 }}
                    onBlur={handleEnderecoIdChange}
                    helperText="Digite o ID do endereço e saia do campo para buscar"
                />

               
                <Typography variant="h6" mt={2} mb={1}>
                    Sexo
                </Typography>
                <TextField
                    select
                    label="Sexo"
                    fullWidth
                    sx={{ mb: 2 }}
                    {...sexoRegister}
                    error={!!errors.sexo?.sigla}
                    helperText={errors.sexo?.sigla?.message}
                    value={watch("sexo.sigla") || ""}
                    onChange={(e) => {
                        sexoOnChange(e)
                        handleSexoChange(e)
                    }}
                >
                    <MenuItem value="">Selecione Sexo</MenuItem>
                    {sexos?.map((s) => {
                        const paddedSigla = s.sigla.padEnd(10, " ");
                        return (
                            <MenuItem key={paddedSigla} value={paddedSigla}>
                                {s.nome}
                            </MenuItem>
                        );
                    })}
                </TextField>

                <Typography variant="h6" mt={2} mb={1}>
                    Telefones
                </Typography>
                {telefoneFields.map((field, index) => (
                    <Box key={field.id} display="flex" gap={2} mb={2}>
                        <TextField
                            label="Número"
                            fullWidth
                            {...register(`telefones.${index}.numero` as const)}
                            error={!!errors.telefones?.[index]?.numero}
                            helperText={errors.telefones?.[index]?.numero?.message}
                        />
                        <TextField
                            select
                            label="DDD"
                            fullWidth
                            {...register(`telefones.${index}.ddd.numeroDDD` as const)}
                            error={!!errors.telefones?.[index]?.ddd?.numeroDDD}
                            helperText={errors.telefones?.[index]?.ddd?.numeroDDD?.message}
                            value={watch(`telefones.${index}.ddd.numeroDDD`) || ""}
                        >
                            <MenuItem value="">Selecione DDD</MenuItem>
                            {ddds?.map((ddd) => (
                                <MenuItem key={ddd.numeroDDD} value={ddd.numeroDDD}>
                                    {ddd.numeroDDD}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="DDI"
                            fullWidth
                            {...register(`telefones.${index}.ddi.numeroDDI` as const)}
                            error={!!errors.telefones?.[index]?.ddi?.numeroDDI}
                            helperText={errors.telefones?.[index]?.ddi?.numeroDDI?.message}
                            value={watch(`telefones.${index}.ddi.numeroDDI`) || ""}
                        >
                            <MenuItem value="">Selecione DDI</MenuItem>
                            {ddis?.map((ddi) => (
                                <MenuItem key={ddi.numeroDDI} value={ddi.numeroDDI}>
                                    {ddi.numeroDDI}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removeTelefone(index)}
                        >
                            Remover
                        </Button>
                    </Box>
                ))}
                <Button
                    variant="contained"
                    onClick={() =>
                        appendTelefone({
                            numero: "",
                            ddd: { numeroDDD: "" as any },
                            ddi: { numeroDDI: "" as any },
                        })
                    }
                    sx={{ mb: 2 }}
                >
                    Adicionar Telefone
                </Button>

                {/* Emails */}
                <Typography variant="h6" mt={2} mb={1}>
                    Emails
                </Typography>
                {emailFields.map((field, index) => (
                    <Box key={field.id} display="flex" gap={2} mb={2}>
                        <TextField
                            label="Email"
                            fullWidth
                            {...register(`emails.${index}.email` as const)}
                            error={!!errors.emails?.[index]?.email}
                            helperText={errors.emails?.[index]?.email?.message}
                        />
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removeEmail(index)}
                        >
                            Remover
                        </Button>
                    </Box>
                ))}
                <Button
                    variant="contained"
                    onClick={() => appendEmail({ email: "" })}
                    sx={{ mb: 2 }}
                >
                    Adicionar Email
                </Button>

                <Box mt={4}>
                    <Button type="submit" variant="contained" fullWidth>
                        Cadastrar Paciente
                    </Button>
                </Box>
            </Box>
        </PageLayout>
    );
};

export default PaginaCriarPaciente;
