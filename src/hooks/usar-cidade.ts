import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { CidadeTipo } from '../tipos/cidade'
import CidadeService from '../servicos/cidade'

const service = new CidadeService()

export const usarCidade = (id: number) => {
    const { data, isLoading, error } = useQuery<CidadeTipo, Error>({
        queryKey: ['cidade'],
        queryFn: async () => {
            try {
                return await service.obterCidadeporId(id);
            } catch (err: any) {
                const errorMessage = err?.response?.data?.message || 'Erro desconhecido ao carregar cidade';
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
