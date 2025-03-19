import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ReceitaMedicaService from '../../servicos/receita-medica';
import { Receita } from '../../tipos/receita-medica';

const service = new ReceitaMedicaService()

export const usarReceitaMedicaMutations = () => {
    const queryClient = useQueryClient()

    const criarReceitaMedica = useMutation({
        mutationFn: async (form: Receita) => {
            return service.adicionarReceita(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receita-medica'] });
            toast.success('Receita Médica criada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar receita medica:', error);
            toast.error('Erro ao criar receita medica.');
        },
    })

    return {
        criarReceitaMedica
    }
}