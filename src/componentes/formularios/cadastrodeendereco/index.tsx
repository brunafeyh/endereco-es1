import { useForm } from "react-hook-form";
import { TextField, MenuItem, Button, Box, Stack, Typography, useTheme } from "@mui/material";
import { usarLogradouro } from "../../../hooks/usar-logradouro";
import { usarEndereco } from "../../../hooks/usar-endereco";
import { EnderecoTipo } from "../../../tipos/endereco";
import { defaultEndereco } from "../../../utilidades/constantes/defaults";
import { FONT_WEIGHTS } from "../../../temas/fontes";
import { TITULO } from "../../../paginas/cadastro-endereco";
import { usarBairros } from "../../../hooks/usar-bairro";
import { usarCidades } from "../../../hooks/usar-cidades";

const FormularioEndereco = () => {
    const { data: Logradouros } = usarLogradouro()
    const { data: bairros } = usarBairros()
    const { criarEndereco } = usarEndereco()
    const { data: cidades } = usarCidades()

    const { register, handleSubmit, formState: { errors } } = useForm<EnderecoTipo>({
        defaultValues: defaultEndereco,
    })
    const theme = useTheme();

    const onSubmit = (data: EnderecoTipo) => {
        criarEndereco.mutate(data)
        console.log("Endereço cadastrado:", data);
    }

    return (
        <Box sx={{ width: '100%', ml: 40 }}>
            <Typography mb={2} fontSize={theme.spacing(2)} fontWeight={FONT_WEIGHTS.light}>
                {TITULO}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    <TextField
                        label="CEP"
                        type="text"
                        fullWidth
                        variant="filled"
                        {...register("cep")}
                        error={!!errors.cep}
                        helperText={errors.cep?.message}
                    />
                    <TextField
                        label="Logradouro"
                        fullWidth
                        select
                        variant="filled"
                        {...register("logradouro.id")}
                        error={!!errors.logradouro?.id}
                        helperText={errors.logradouro?.id?.message}
                    >
                        {Logradouros?.map((log) => {
                            const siglaPadded = log.tipoLogradouro?.sigla
                                ? log.tipoLogradouro.sigla.padEnd(10, " ")
                                : ""

                            return (
                                <MenuItem key={log.id} value={log.id}>
                                    {log.nome} — {siglaPadded}
                                </MenuItem>
                            );
                        })}
                    </TextField>

                    <TextField
                        label="Bairro"
                        fullWidth
                        select
                        variant="filled"
                        {...register("bairro.id")}
                        error={!!errors.bairro?.id}
                        helperText={errors.bairro?.id?.message}
                    >
                        {bairros?.map((bairro) => (
                            <MenuItem key={bairro.id} value={bairro.id}>
                                {bairro.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Cidade"
                        fullWidth
                        select
                        variant="filled"
                        {...register("cidade.id")}
                        error={!!errors.cidade?.id}
                        helperText={errors.cidade?.id?.message}
                    >
                        {cidades?.map((cidade) => (
                            <MenuItem key={cidade.id} value={cidade.id}>
                                {cidade.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Stack direction="row" spacing={2}>
                        <Button fullWidth variant="outlined">
                            Cancelar
                        </Button>
                        <Button type="submit" fullWidth variant="contained">
                            Cadastrar
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default FormularioEndereco
