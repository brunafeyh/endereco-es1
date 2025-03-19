import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { CIDService } from '../../servicos/CID';
import { CID } from '../../tipos/cid';

const service = new CIDService()

export const usarCIDMutations = () => {
    const queryClient = useQueryClient()

    const criarCID = useMutation({
        mutationFn: async (form: CID) => {
            return service.criarCID(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['CID'] });
            toast.success('CID criado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar CID:', error);
            toast.error('Erro ao criar CID.');
        },
    })

    return {
        criarCID
    }
}