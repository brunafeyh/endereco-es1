import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import PacienteService from '../../servicos/paciente';
import { Paciente } from '../../tipos/paciente';

const service = new PacienteService();

export const usarPacientePorCPF = (cpf: string, enable: boolean) => {
  const { data, isLoading, error, refetch } = useQuery<Paciente, Error>({
    queryKey: ['paciente', cpf],
    queryFn: async () => {
      try {
        return await service.buscarPacienteporCPF(cpf);
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || 'Erro desconhecido ao carregar Paciente';
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