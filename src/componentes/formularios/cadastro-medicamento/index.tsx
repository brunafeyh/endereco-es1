import { FC } from "react";
import { Medicamento } from "../../../tipos/medicamento";
import { useForm } from "react-hook-form";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { usarMedicamentoMutations } from "../../../hooks/medicamento/usar-medicamentos-mutations";

export const FormularioMedicamento: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Medicamento>({
        defaultValues: {
            nome: ''
        },
    })

    const {criarMedicamento} = usarMedicamentoMutations()

    const onSubmit = async (data: Medicamento) => {
        try{
            await criarMedicamento.mutateAsync(data)
        }
        catch(err){
            console.log(err)
        }

    }

    if(criarMedicamento.isPending) return <Typography>Carregando....</Typography>
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
            <Stack spacing={2}>
                <TextField
                    label="Nome"
                    type="text"
                    fullWidth
                    variant="filled"
                    {...register("nome")}
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                />
            </Stack>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mt={2}>
                <Button variant="contained" type="submit">
                    Criar
                </Button>
            </Box>
        </Box>
    )
}