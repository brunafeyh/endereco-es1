import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import PacienteService from '../../servicos/paciente'
import { PacienteTipo } from '../../tipos/paciente'

const service = new PacienteService()

export const usarPacienteMutations = () => {
    const queryClient = useQueryClient()

    const criarPaciente = useMutation({
        mutationFn: async (form: PacienteTipo) => {
            return service.adicionarPaciente(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['endereco'] });
            toast.success('Paciente criado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar paciente:', error);
            toast.error('Erro ao criar paciente.');
        },
    })

    return {
        criarPaciente
    }
}