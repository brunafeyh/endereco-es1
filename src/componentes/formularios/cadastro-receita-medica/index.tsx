import { FC } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Receita } from "../../../tipos/receita-medica";
import { usarReceitaMedicaMutations } from "../../../hooks/usar-receita-medica-mutations";

export const FormularioReceitaMedica: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm< Receita>()

    const {criarReceitaMedica} = usarReceitaMedicaMutations()

    const onSubmit = async (data: Receita) => {

        console.log(data)
        // try{
        //     await criarReceitaMedica.mutateAsync(data)
        // }
        // catch(err){
        //     console.log(err)
        // }

    }

    if(criarReceitaMedica.isPending) return <Typography>Carregando....</Typography>
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
            <Stack spacing={2}>
                <TextField
                    label="Código"
                    type="date"
                    fullWidth
                    variant="filled"
                    {...register("dataEmissao")}
                    error={!!errors.dataEmissao}
                    helperText={errors.dataEmissao?.message}
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