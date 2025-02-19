import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import BairroService from '../servicos/bairro';
import { BairroType } from '../tipos/bairro';

const service = new BairroService();

export const usarBairros = () => {
    const { data, isLoading, error } = useQuery<BairroType[], Error>({
        queryKey: ['bairros'],
        queryFn: async () => {
            try {
                return await service.listarBairros();
            } catch (err: any) {
                const errorMessage = err?.response?.data?.message || 'Erro desconhecido ao carregar bairros';
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
