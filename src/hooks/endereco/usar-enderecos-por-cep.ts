import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import EnderecoService from '../../servicos/endereco'
import { EnderecoTipo } from '../../tipos/endereco'

const service = new EnderecoService()

export const usarEnderecoporCep = (cep: string) => {
    const { data, isLoading, error } = useQuery<EnderecoTipo[], Error>({
        queryKey: ['enderecos'],
        queryFn: async () => {
            try {
                return await service.listarEnderecosCEP(cep);
            } catch (err: any) {
                const errorMessage = err?.response?.data?.message || 'Erro desconhecido ao carregar cidades';
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        }
    })

    return {
        data,
        isLoading,
        error,
    }
}