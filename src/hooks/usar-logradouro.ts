import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { LogradouroTipo } from '../tipos/logradouro';
import { LogradouroService } from '../servicos/logradouro';

const service = new LogradouroService();

export const usarLogradouro = () => {
    const { data, isLoading, error } = useQuery<LogradouroTipo[], Error>({
        queryKey: ['logradouros'],
        queryFn: async () => {
            try {
                const response = await service.listarLogradouros();
                return response;
            } catch (err: any) {
                const errorMessage = err?.response?.data?.message || 'Erro desconhecido ao carregar logradouros';
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
