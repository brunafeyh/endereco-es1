import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import EnderecoService from '../../servicos/endereco'
import { EnderecoTipo } from '../../tipos/endereco'

const service = new EnderecoService()

export const usarEndereco = () => {
    const queryClient = useQueryClient()

    const criarEndereco = useMutation({
        mutationFn: async (form: EnderecoTipo) => {
            return service.adicionarEndereco(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['endereco'] });
            toast.success('Endereco criado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar endereco:', error);
            toast.error('Erro ao criar endereco.');
        },
    })

    return {
        criarEndereco
    }
}