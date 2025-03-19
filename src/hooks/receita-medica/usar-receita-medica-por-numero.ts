import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ReceitaMedicaService from '../../servicos/receita-medica';
import { ReceitaMedicaListOne } from '../../tipos/receita-medica';

const service = new ReceitaMedicaService();

export const usarReceitaMedicaPorNumero = (numero: number) => {
  const { data, isLoading, error, refetch } = useQuery<ReceitaMedicaListOne, Error>({
    queryKey: ['receita-medica', numero],
    queryFn: async () => {
      try {
        return await service.obterReceitaMedica(numero);
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || 'Erro desconhecido ao carregar Receita Medica';
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};