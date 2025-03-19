import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import CidadeService from '../../servicos/cidade';
import { CidadeTipo } from '../../tipos/cidade';

const service = new CidadeService()

export const usarCidades = () => {
    const { data, isLoading, error } = useQuery<CidadeTipo[], Error>({
        queryKey: ['cidades'],
        queryFn: async () => {
            try {
                return await service.listarCidades();
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
    };
};
