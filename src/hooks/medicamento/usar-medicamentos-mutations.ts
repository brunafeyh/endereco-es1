import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { MedicamentoService } from '../../servicos/medicamento';
import { Medicamento } from '../../tipos/medicamento';

const service = new MedicamentoService()

export const usarMedicamentoMutations = () => {
    const queryClient = useQueryClient()

    const criarMedicamento = useMutation({
        mutationFn: async (form: Medicamento) => {
            return service.criarMedicamento(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicamento'] });
            toast.success('Medicamento criado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar medicamento:', error);
            toast.error('Erro ao criar medicamento.');
        },
    })

    return {
        criarMedicamento
    }
}