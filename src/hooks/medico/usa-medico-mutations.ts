import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import MedicoService from '../../servicos/medico'
import { Medico } from '../../tipos/paciente'

const service = new MedicoService()

export const usarMedicoMutations = () => {
    const queryClient = useQueryClient()

    const criarMedico = useMutation({
        mutationFn: async (form: Medico) => {
            return service.adicionarMedico(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medico'] });
            toast.success('Médico criado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar medico:', error);
            toast.error('Erro ao criar medico.');
        },
    })

    return {
        criarMedico
    }
}