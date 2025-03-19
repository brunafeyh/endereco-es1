import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, useTheme, Paper } from "@mui/material";
import { PageLayout } from "../layout/page-layout";
import { FONT_WEIGHTS } from "../temas/fontes";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usarReceitaMedicaPorNumero } from "../hooks/receita-medica/usar-receita-medica-por-numero";
import { usarIA } from "../hooks/ia";
import { PacienteTipo } from "../tipos/paciente";
import PacienteService from "../servicos/paciente";
import { ReceitaMedicaListOne } from "../tipos/receita-medica";
import IAService from "../servicos/ia";
import ReceitaMedicaService from "../servicos/receita-medica";

// Estilos personalizados para o chat
const chatStyles = {
    chatContainer: {
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        height: "400px",
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


    const handleChatSubmit = async (data: any) => {
        console.log(userInput)
        if (!userInput) return;

        setChatMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", message: userInput }
        ]);


        const response = await iaService.obterRespostadaIA(userInput)

        const intencao = response.intencao
        const identificador = response.id

        if (intencao === 'CONSULTAR_PACIENTE_POR_ID') {
            const response = await pacienteService.buscarPacienteporID(identificador)
            console.log(response)
        }

        else if (intencao === 'CONSULTAR_RECEITA_MEDICA_POR_NUMERO') {
            await receitaMedicaService.obterReceitaMedica(identificador)
            console.log(response)
        }
        
};

return (
    <PageLayout title="Inteligência Artificial">
        <Box marginLeft={30} mt={4} sx={chatStyles.chatContainer}>
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
