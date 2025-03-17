import { FC } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { CID } from "../../../tipos/cid";
import { usarCIDMutations } from "../../../hooks/usar-CID";

export const FormularioCID: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm< CID>({
        defaultValues: {
            codigo: '',
            descricao: ''
        },
    })

    const {criarCID} = usarCIDMutations()

    const onSubmit = async (data: CID) => {
        try{
            await criarCID.mutateAsync(data)
        }
        catch(err){
            console.log(err)
        }

    }

    if(criarCID.isPending) return <Typography>Carregando....</Typography>
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
            <Stack spacing={2}>
                <TextField
                    label="Código"
                    type="text"
                    fullWidth
                    variant="filled"
                    {...register("codigo")}
                    error={!!errors.codigo}
                    helperText={errors.codigo?.message}
                />
                 <TextField
                    label="Descrição"
                    type="text"
                    fullWidth
                    variant="filled"
                    {...register("descricao")}
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
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