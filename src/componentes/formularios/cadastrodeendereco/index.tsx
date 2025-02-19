import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { usarLogradouro } from "../../../hooks/usar-logradouro";
import { usarEndereco } from "../../../hooks/usar-endereco";
import { EnderecoTipo } from "../../../tipos/endereco";
import { FONT_WEIGHTS } from "../../../temas/fontes";
import { TITULO } from "../../../paginas/cadastro-endereco";
import { usarBairros } from "../../../hooks/usar-bairro";
import { usarCidades } from "../../../hooks/usar-cidades";

const FormularioEndereco = () => {
  const { data: Logradouros } = usarLogradouro();
  const { data: bairros } = usarBairros();
  const { data: cidades } = usarCidades();
  const { criarEndereco } = usarEndereco();

  const theme = useTheme();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EnderecoTipo>({
    defaultValues: {
      cep: "",
      logradouro: {}, 
      bairro: {},
      cidade: {}, 
    },
  });

  const onSubmit = (data: EnderecoTipo) => {
    criarEndereco.mutate(data);
    console.log("Endereço cadastrado:", data);
  };

  return (
    <Box sx={{ width: "100%", ml: 40 }}>
      <Typography
        mb={2}
        fontSize={theme.spacing(2.5)}
        fontWeight={FONT_WEIGHTS.light}
      >
        {TITULO}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
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

          <Controller
            name="logradouro"
            control={control}
            defaultValue={{} as any}
            render={({ field }) => (
              <TextField
                label="Logradouro"
                fullWidth
                select
                variant="filled"
                value={field.value?.id || ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedLogradouro = Logradouros?.find(
                    (log) => log.id === Number(selectedId)
                  );
                  field.onChange(selectedLogradouro);
                }}
                error={!!errors.logradouro?.id}
                helperText={errors.logradouro?.id?.message}
              >
                <MenuItem value="">Selecione Logradouro</MenuItem>
                {Logradouros?.map((log) => (
                  <MenuItem key={log.id} value={log.id}>
                    {log.nome}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="bairro"
            control={control}
            defaultValue={{} as any}
            render={({ field }) => (
              <TextField
                label="Bairro"
                fullWidth
                select
                variant="filled"
                value={field.value?.id || ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedBairro = bairros?.find(
                    (b) => b.id === Number(selectedId)
                  );
                  field.onChange(selectedBairro);
                }}
                error={!!errors.bairro?.id}
                helperText={errors.bairro?.id?.message}
              >
                <MenuItem value="">Selecione Bairro</MenuItem>
                {bairros?.map((bairro) => (
                  <MenuItem key={bairro.id} value={bairro.id}>
                    {bairro.nome}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="cidade"
            control={control}
            defaultValue={{} as any}
            render={({ field }) => (
              <TextField
                label="Cidade"
                fullWidth
                select
                variant="filled"
                value={field.value?.id || ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedCidade = cidades?.find(
                    (c) => c.id === Number(selectedId)
                  );
                  field.onChange(selectedCidade);
                }}
                error={!!errors.cidade?.id}
                helperText={errors.cidade?.id?.message}
              >
                <MenuItem value="">Selecione Cidade</MenuItem>
                {cidades?.map((cidade) => (
                  <MenuItem key={cidade.id} value={cidade.id}>
                    {cidade.nome}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

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
  );
};

export default FormularioEndereco;
