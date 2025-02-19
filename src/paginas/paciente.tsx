import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { PacienteTipo } from "../tipos/paciente";
import { usarSexos } from "../hooks/usar-sexos";
import { usarDDDs } from "../hooks/usar-ddds";
import { usarDDIs } from "../hooks/usar-ddis";
import { PageLayout } from "../layout/page-layout";
import { FONT_WEIGHTS } from "../temas/fontes";
import EnderecoService from "../servicos/endereco";
import { usarPacienteMutations } from "../hooks/usar-paciente-mutations";
import { TrashCan } from "@carbon/icons-react";
import { UNIOESTE_COLORS } from "../temas/cores";

const PaginaCriarPaciente: React.FC = () => {
  const { criarPaciente } = usarPacienteMutations()
  const theme = useTheme();
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
    const selectedSexo = sexos?.find((s) => s.sigla === selectedValue);
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
      setValue("enderecoEspecifico.endereco", endereco);
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  }

  const onSubmit = (data: PacienteTipo) => {
    console.log("Paciente cadastrado:", data);
    criarPaciente.mutate(data);
  }

  const { onChange: sexoOnChange, ...sexoRegister } = register("sexo.sigla");

  return (
    <PageLayout title="Cadastro de Paciente">
      <Box component="form" ml={20} onSubmit={handleSubmit(onSubmit)}>
        <Typography fontSize={theme.spacing(2.5)} mb={3} fontWeight={FONT_WEIGHTS.light}>
          Cadastro de Paciente
        </Typography>

        <TextField
          label="Nome"
          fullWidth
          variant="filled"
          sx={{ mb: 2 }}
          {...register("nome")}
          error={!!errors.nome}
          helperText={errors.nome?.message}
        />

        <TextField
          label="CPF"
          fullWidth
          variant="filled"
          sx={{ mb: 2 }}
          {...register("cpf.cpf")}
          error={!!errors.cpf?.cpf}
          helperText={errors.cpf?.cpf?.message}
        />

        <Typography fontSize={15} fontWeight={FONT_WEIGHTS.light} mt={2} mb={1}>
          Endereço Específico
        </Typography>
        <TextField
          label="Número"
          fullWidth
          variant="filled"
          sx={{ mb: 2 }}
          {...register("enderecoEspecifico.numero")}
          error={!!errors.enderecoEspecifico?.numero}
          helperText={errors.enderecoEspecifico?.numero?.message}
        />
        <TextField
          label="Complemento"
          fullWidth
          variant="filled"
          sx={{ mb: 2 }}
          {...register("enderecoEspecifico.complemento")}
          error={!!errors.enderecoEspecifico?.complemento}
          helperText={errors.enderecoEspecifico?.complemento?.message}
        />
        <TextField
          label="ID do Endereço"
          fullWidth
          variant="filled"
          sx={{ mb: 2 }}
          onBlur={handleEnderecoIdChange}
          helperText="Digite o ID do endereço e saia do campo para buscar"
        />

        <Typography fontSize={15} fontWeight={FONT_WEIGHTS.light} mt={2} mb={1}>
          Sexo
        </Typography>
        <TextField
          select
          label="Sexo"
          fullWidth
          sx={{ mb: 2 }}
          variant="filled"
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
          {sexos?.map((s) => (
            <MenuItem key={s.sigla} value={s.sigla}>
              {s.nome}
            </MenuItem>
          ))}
        </TextField>

        <Typography fontSize={15} fontWeight={FONT_WEIGHTS.light} mt={2} mb={1}>
          Telefones
        </Typography>
        {telefoneFields.map((field, index) => (
          <Box key={field.id} display="flex" gap={2} mb={2}>
            <TextField
              variant="filled"
              label="Número"
              fullWidth
              {...register(`telefones.${index}.numero` as const)}
              error={!!errors.telefones?.[index]?.numero}
              helperText={errors.telefones?.[index]?.numero?.message}
            />
            <Controller
              name={`telefones.${index}.ddd`}
              control={control}
              defaultValue={{} as any}
              render={({ field }) => (
                <TextField
                  select
                  variant="filled"
                  label="DDD"
                  fullWidth
                  value={field.value?.numeroDDD || ""}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const selectedDDD = ddds?.find(
                      (ddd) => ddd.numeroDDD === Number(selectedValue)
                    );
                    field.onChange(selectedDDD);
                  }}
                  error={!!errors.telefones?.[index]?.ddd?.numeroDDD}
                  helperText={errors.telefones?.[index]?.ddd?.numeroDDD?.message}
                >
                  <MenuItem value="">Selecione DDD</MenuItem>
                  {ddds?.map((ddd) => (
                    <MenuItem key={ddd.numeroDDD} value={ddd.numeroDDD}>
                      {ddd.numeroDDD}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name={`telefones.${index}.ddi`}
              control={control}
              defaultValue={{} as any}
              render={({ field }) => (
                <TextField
                  select
                  variant="filled"
                  label="DDI"
                  fullWidth
                  value={field.value?.numeroDDI || ""}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const selectedDDI = ddis?.find(
                      (ddi) => ddi.numeroDDI === Number(selectedValue)
                    );
                    field.onChange(selectedDDI);
                  }}
                  error={!!errors.telefones?.[index]?.ddi?.numeroDDI}
                  helperText={errors.telefones?.[index]?.ddi?.numeroDDI?.message}
                >
                  <MenuItem value="">Selecione DDI</MenuItem>
                  {ddis?.map((ddi) => (
                    <MenuItem key={ddi.numeroDDI} value={ddi.numeroDDI}>
                      {ddi.numeroDDI}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Button variant="text" color="error" onClick={() => removeTelefone(index)}>
              <TrashCan color={UNIOESTE_COLORS.primary.p60} />
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

        <Typography fontSize={15} fontWeight={FONT_WEIGHTS.light} mt={2} mb={1}>
          Emails
        </Typography>
        {emailFields.map((field, index) => (
          <Box key={field.id} display="flex" gap={2} mb={2}>
            <TextField
              label="Email"
              fullWidth
              variant="filled"
              {...register(`emails.${index}.email` as const)}
              error={!!errors.emails?.[index]?.email}
              helperText={errors.emails?.[index]?.email?.message}
            />
            <Button variant="text" color="error" onClick={() => removeEmail(index)}>
              <TrashCan color={UNIOESTE_COLORS.primary.p60} />
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

export default PaginaCriarPaciente