import { useForm } from "react-hook-form";
import { TextField, MenuItem, Button, Box, Stack, Typography, useTheme } from "@mui/material";
import { EnderecoTipo } from "../../../../tipos/endereco";
import { defaultEndereco } from "../../../../utilidades/constantes/defaults";
import { FONT_WEIGHTS } from "../../../../temas/fontes";
import { TITULO } from "../../../../pages/cadastro-endereco";

const unidadeFederativaOptions = [
    { sigla: "PR", nome: "Paraná" },
    { sigla: "SP", nome: "São Paulo" },
    { sigla: "RJ", nome: "Rio de Janeiro" },
];

const cidadeOptions = [
    { id: 1, nome: "Curitiba", unidadeFederativa: "PR" },
    { id: 2, nome: "São Paulo", unidadeFederativa: "SP" },
    { id: 3, nome: "Rio de Janeiro", unidadeFederativa: "RJ" },
];

const bairroOptions = [
    { id: 1, nome: "Centro" },
    { id: 2, nome: "Batel" },
    { id: 3, nome: "Água Verde" },
];

const logradouroOptions = [
    { id: 1, nome: "Avenida Paulista", tipoLogradouro: "Avenida" },
    { id: 2, nome: "Rua XV de Novembro", tipoLogradouro: "Rua" },
];

const tipoLogradouroOptions = [
    { sigla: "R", nome: "Rua" },
    { sigla: "AV", nome: "Avenida" },
    { sigla: "TV", nome: "Travessa" },
];

const FormularioEndereco = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<EnderecoTipo>({
        defaultValues: defaultEndereco,
    });
    const theme = useTheme();

    const onSubmit = (data: EnderecoTipo) => {
        console.log("Endereço cadastrado:", data);
    }

    return (
        <Box sx={{ width: '100%', ml:50 }}>
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
                        {logradouroOptions.map((log) => (
                            <MenuItem key={log.id} value={log.id}>
                                {log.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Tipo Logradouro"
                        fullWidth
                        select
                        variant="filled"
                        {...register("logradouro.tipoLogradouro.sigla")}
                        error={!!errors.logradouro?.tipoLogradouro?.sigla}
                        helperText={errors.logradouro?.tipoLogradouro?.sigla?.message}
                    >
                        {tipoLogradouroOptions.map((tipo) => (
                            <MenuItem key={tipo.sigla} value={tipo.sigla}>
                                {tipo.nome}
                            </MenuItem>
                        ))}
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
                        {bairroOptions.map((bairro) => (
                            <MenuItem key={bairro.id} value={bairro.id}>
                                {bairro.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Unidade Federativa"
                        fullWidth
                        select
                        variant="filled"
                        {...register("cidade.unidadeFederativa.sigla")}
                        error={!!errors.cidade?.unidadeFederativa?.sigla}
                        helperText={errors.cidade?.unidadeFederativa?.sigla?.message}
                    >
                        {unidadeFederativaOptions.map((uf) => (
                            <MenuItem key={uf.sigla} value={uf.sigla}>
                                {uf.nome}
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
                        {cidadeOptions.map((cidade) => (
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
