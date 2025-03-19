import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, useTheme, Paper } from "@mui/material";
import { PageLayout } from "../layout/page-layout";
import { FONT_WEIGHTS } from "../temas/fontes";
import PacienteService from "../servicos/paciente";
import IAService from "../servicos/ia";
import ReceitaMedicaService from "../servicos/receita-medica";

// Estilos personalizados para o chat
const chatStyles = {
    chatContainer: {
        width: 1100,
        margin: "auto",
        padding: "20px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        ml: 30,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        height: 800,
        overflowY: "scroll",
    },
    messageBubbleUser: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 15px",
        borderRadius: "20px",
        margin: "5px 0",
        alignSelf: "flex-end",
    },
    messageBubbleBot: {
        backgroundColor: "#f1f1f1",
        color: "black",
        padding: "10px 15px",
        borderRadius: "20px",
        margin: "5px 0",
        alignSelf: "flex-start",
    },
};

const iaService = new IAService()

const pacienteService = new PacienteService()

const receitaMedicaService = new ReceitaMedicaService()
const TITULO = 'Inteligência Artificial';

export const IA = () => {
    const theme = useTheme();
    const { register, handleSubmit, reset } = useForm();
    const [userInput, setUserInput] = useState<string>(""); // String de entrada do usuário
    const [chatMessages, setChatMessages] = useState<any[]>([]); // Mensagens do chat
    const [errorMessage, setErrorMessage] = useState<string>(""); // Mensagem de erro

    const handleChatSubmit = async (data: any) => {
        console.log(userInput)
        if (!userInput) return;

        setChatMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", message: userInput }
        ]);

        
            const response = await iaService.obterRespostadaIA(userInput);
            const intencao = response.intencao;
            const identificador = response.id;


        if (intencao === 'CONSULTAR_PACIENTE_POR_ID') {
            const paciente = await pacienteService.buscarPacienteporID(identificador);

            const pacienteInfo = `
            Nome: ${paciente.nome}
            CPF: ${paciente.cpf.cpf}
            Telefone(s): ${paciente.telefones.map(tel => tel.numero).join(", ")}
            Email(s): ${paciente.emails.map(email => email.email).join(", ")}
            Sexo: ${paciente.sexo.nome}
            Endereco: ${paciente.enderecoEspecifico.endereco.cep}
        `;
        
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", message: `Paciente encontrado:\n${pacienteInfo}` }
            ]);
        } else if (intencao === 'CONSULTAR_RECEITA_MEDICA_POR_NUMERO') {
            const receita = await receitaMedicaService.obterReceitaMedica(identificador);

            const receitaInfo = `
                Número da Receita: ${receita.numero}
                Data de Emissão: ${receita.dataEmissao}
                Médico: ${receita.medico.nome} (CRM: ${receita.medico.crm})
                Diagnóstico (CID): ${receita.diagnosticoCID.codigo} - ${receita.diagnosticoCID.descricao}
                Medicamentos Prescritos: ${receita.medicamentoReceitaMedicas.map(med => `${med.medicamento.nome} (${med.posologia})`).join(", ")}
                Paciente: ${receita.paciente.nome}
            `;

            setChatMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", message: `Receita médica encontrada:\n${receitaInfo}` }
            ]);
        } else if(intencao === 'ERRO') {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", message: "Desculpe, erro." }
            ]);
        }
        else{
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", message: "Desculpe, não entendi sua solicitação." }
            ]);
        }

        // Limpar erro anterior
        setErrorMessage("");
};

    return (
        <PageLayout title="Inteligência Artificial">
            <Box mt={4} sx={chatStyles.chatContainer}>
                <Typography mb={2} fontSize={theme.spacing(2.5)} fontWeight={FONT_WEIGHTS.light}>
                    {TITULO}
                </Typography>
                <Box sx={{ marginBottom: "20px" }}>
                    {chatMessages.map((msg, index) => (
                        <Paper key={index} sx={msg.sender === "user" ? chatStyles.messageBubbleUser : chatStyles.messageBubbleBot}>
                            {msg.message}
                        </Paper>
                    ))}
                </Box>

                {errorMessage && (
                    <Box sx={{ marginBottom: "20px", color: "red", fontWeight: "bold" }}>
                        {errorMessage}
                    </Box>
                )}

                <form onSubmit={handleSubmit(handleChatSubmit)}>
                    <TextField
                        label="Digite uma string"
                        fullWidth
                        variant="filled"
                        {...register("userInput")}
                        onChange={(e) => setUserInput(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" type="submit" disabled={!userInput}>
                        Enviar para IA
                    </Button>
                </form>
            </Box>
        </PageLayout>
    );
};