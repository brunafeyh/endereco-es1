import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import IAService from '../servicos/ia';
import { IAResponse } from '../tipos/ia';

const service = new IAService();

export const usarIA = (prompt: string) => {
    const { data, isLoading, error, refetch } = useQuery<IAResponse, Error>({
        queryKey: ['ia', prompt],
        queryFn: async () => {
            try {
                return await service.obterRespostadaIA(prompt);
            } catch (err: any) {
                const errorMessage = err?.response?.data?.message || 'Erro desconhecido ao enviar a IA';
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        },
        enabled: false,  // Desabilitar a execução automática do useQuery
    });

    return {
        data,
        isLoading,
        error,
        refetch,
    };
}
