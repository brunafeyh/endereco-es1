import { useMemo } from 'react'
import { usarParametrosdePaginacao } from './params/pagination'
import { paginarVetor } from '../utilidades/constantes/tabela'

export const usePaginateArray = <T extends object>(valor: T[]) => {
	const { pageSize, page } = usarParametrosdePaginacao()

	return useMemo(() => paginarVetor(valor, pageSize, page), [valor, pageSize, page])
}
