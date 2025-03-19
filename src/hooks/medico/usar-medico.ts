import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import MedicoService from '../../servicos/medico';
import { Medico } from '../../tipos/medico';

const service = new MedicoService();

export const usarMedicoPorCPF = (cpf: string, enable: boolean) => {
  const { data, isLoading, error, refetch } = useQuery<Medico, Error>({
    queryKey: ['medico', cpf],
    queryFn: async () => {
      try {
        return await service.retornarMedicoPorCPF(cpf);
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || 'Erro desconhecido ao carregar Medico';
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    enabled: enable, 
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};