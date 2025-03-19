import React, { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    MenuItem,
    Card,
    CardContent,
} from "@mui/material";
import { Receita, receitaMedicaSchema } from "../../../tipos/receita-medica";
import { usarMedicamentos } from "../../../hooks/medicamento/usar-medicamentos";
import { usarMedicoPorCPF } from "../../../hooks/medico/usar-medico";
import { usarPacientePorCPF } from "../../../hooks/paciente/usar-paciente-por-cpf";
import { Add, TrashCan } from "@carbon/icons-react";
import { usarReceitaMedicaMutations } from "../../../hooks/receita-medica/usar-receita-medica-mutations";
import { usarCIDS } from "../../../hooks/CID/usar-CIDS";

export const ReceitaMedicaForm: React.FC = () => {
    const [cpfMedico, setCpfMedico] = useState<string>("");
    const [cpfPaciente, setCpfPaciente] = useState<string>("")

    const {criarReceitaMedica} = usarReceitaMedicaMutations()
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<Receita>({
        resolver: zodResolver(receitaMedicaSchema),
        defaultValues: {
            dataEmissao: "",
            medico: { id: 0 },
            paciente: { id: 0 },
            diagnosticoCID: { codigo: "" },
            medicamentoReceitaMedicas: []
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "medicamentoReceitaMedicas"
    })

    const { data: cidsData } = usarCIDS();
    const { data: medicamentosData } = usarMedicamentos();

    const [enableMedico, setEnableMedico] = useState(false);
    const [enablePaciente, setEnablePaciente] = useState(false);

    const { data: medicoData, refetch: refetchMedico } = usarMedicoPorCPF(cpfMedico, enableMedico);
    const { data: pacienteData, refetch: refetchPaciente } = usarPacientePorCPF(cpfPaciente, enablePaciente);

    const handleBuscarMedico = () => {
        if (cpfMedico.trim()) {
            setEnableMedico(true);
            refetchMedico(); 
        }
    };

    const handleBuscarPaciente = () => {
        if (cpfPaciente.trim()) {
            setEnablePaciente(true)
            refetchPaciente()
        }
    }

    React.useEffect(() => {
        if (medicoData) {
            setValue("medico.id", medicoData.id);
        }
    }, [medicoData, setValue]);

    React.useEffect(() => {
        if (pacienteData) {
            setValue("paciente.id", pacienteData.id);
        }
    }, [pacienteData, setValue]);

    const onSubmit: SubmitHandler<Receita> = async(data) => {
        try{
            await criarReceitaMedica.mutateAsync(data)
        }catch(err){
            console.log(err)
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2, width: 900 }}>
            <Stack spacing={2}>
                <Typography variant="h5">Cadastrar Receita Médica</Typography>
                <TextField
                    variant="filled"
                    label="CPF Médico"
                    value={cpfMedico}
                    onChange={(e) => setCpfMedico(e.target.value)}
                    fullWidth
                />
                <Button variant="text" onClick={handleBuscarMedico}>
                    Buscar Médico
                </Button>
                {medicoData && (
                    <Card sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Médico</Typography>
                            <Typography>ID: {medicoData.id}</Typography>
                            <Typography>Nome: {medicoData.nome}</Typography>
                            <Typography>CRM: {medicoData.crm.crm}</Typography>
                        </CardContent>
                    </Card>
                )}
                <TextField
                    label="CPF Paciente"
                    variant="filled"
                    value={cpfPaciente}
                    onChange={(e) => setCpfPaciente(e.target.value)}
                    fullWidth
                />
                <Button variant="text" onClick={handleBuscarPaciente}>
                    Buscar Paciente
                </Button>
                {pacienteData && (
                    <Card sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Paciente</Typography>
                            <Typography>ID: {pacienteData.id}</Typography>
                            <Typography>Nome: {pacienteData.nome}</Typography>
                            <Typography>CPF: {pacienteData.cpf.cpf}</Typography>
                        </CardContent>
                    </Card>
                )}
                <TextField
                    label="Data de Emissão"
                    type="date"
                    variant="filled"
                    InputLabelProps={{ shrink: true }}
                    {...register("dataEmissao")}
                    error={!!errors.dataEmissao}
                    helperText={errors.dataEmissao?.message?.toString()}
                    fullWidth
                />

                <TextField
                    select
                    label="Diagnóstico (CID)"
                    defaultValue=""
                    {...register("diagnosticoCID.codigo")}
                    fullWidth
                    variant="filled"
                    error={!!errors.diagnosticoCID?.codigo}
                    helperText={errors.diagnosticoCID?.codigo?.message?.toString()}
                >
                    {cidsData?.map((cid: any) => (
                        <MenuItem key={cid.codigo} value={cid.codigo}>
                            {cid.codigo} - {cid.descricao}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="h6">Medicamentos</Typography>
                <Box display={'flex'} flexDirection={'row'} gap={2}>
                    {fields.map((field, index) => (
                        <Box key={field.id} sx={{ border: "1px solid #ccc", p: 2, gap: 4}}>
                            <TextField
                                select
                                label="Medicamento"
                                defaultValue=""
                                variant="filled"
                                sx={{mb: 2}}
                                {...register(`medicamentoReceitaMedicas.${index}.medicamento.id` as const, {
                                    valueAsNumber: true
                                })}
                                fullWidth
                                error={!!errors.medicamentoReceitaMedicas?.[index]?.medicamento?.id}
                                helperText={errors.medicamentoReceitaMedicas?.[index]?.medicamento?.id?.message?.toString()}
                            >
                                {medicamentosData?.map((med: any) => (
                                    <MenuItem key={med.id} value={med.id}>
                                        {med.nome}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Data Início"
                                type="date"
                                 variant="filled"
                                sx={{mb: 2}}
                                InputLabelProps={{ shrink: true }}
                                {...register(`medicamentoReceitaMedicas.${index}.dataInicio` as const)}
                                fullWidth
                                error={!!errors.medicamentoReceitaMedicas?.[index]?.dataInicio}
                                helperText={errors.medicamentoReceitaMedicas?.[index]?.dataInicio?.message?.toString()}
                            />
                            <TextField
                                label="Data Fim"
                                type="date"
                                sx={{mb: 2}}
                                 variant="filled"
                                InputLabelProps={{ shrink: true }}
                                {...register(`medicamentoReceitaMedicas.${index}.dataFim` as const)}
                                fullWidth
                                error={!!errors.medicamentoReceitaMedicas?.[index]?.dataFim}
                                helperText={errors.medicamentoReceitaMedicas?.[index]?.dataFim?.message?.toString()}
                            />
                            <TextField
                                label="Posologia"
                                {...register(`medicamentoReceitaMedicas.${index}.posologia` as const)}
                                fullWidth
                                 variant="filled"
                                sx={{mb: 2}}
                                error={!!errors.medicamentoReceitaMedicas?.[index]?.posologia}
                                helperText={errors.medicamentoReceitaMedicas?.[index]?.posologia?.message?.toString()}
                            />
                            <Button variant="text" startIcon = {<TrashCan style={{ width: 16, height: 16}}/>}color="error" onClick={() => remove(index)} sx={{color: 'red'}}>
                                Remover Medicamento
                            </Button>
                        </Box>
                    ))}
                </Box>
                <Button
                    variant="text"
                    startIcon={<Add/>}
                    onClick={() =>
                        append({
                            dataInicio: "",
                            dataFim: "",
                            posologia: "",
                            medicamento: { id: 0 }
                        })
                    }
                >
                    Adicionar Medicamento
                </Button>

                <Button variant="contained" type="submit">
                    Criar Receita Médica
                </Button>
            </Stack>
        </Box>
    );
};
