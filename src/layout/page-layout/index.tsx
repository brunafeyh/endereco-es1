import { FC, PropsWithChildren } from 'react'
import { Stack } from './styles'
import { useSetTitle } from '../../hooks/use-set-title'
import ViewContainer from '../view-container'
import Sidebar from '../../componentes/sidebar'

interface Props {
	title: string
	children: React.ReactNode
}

const menuItems = [
	{ text: 'Cadastrar Endereço', route: '/' },
	{ text: 'Obter Cidade', route: '/obter-cidade' },
	{
		text: 'Obter Endereço',
		children: [
			{ text: 'por CEP', route: '/endereco-por-cep' },
			{ text: 'por ID', route: '/endereco-por-id' },
			{ text: 'Externo', route: '/endereco-externo' },
		],
	},
	{
		text: 'Paciente',
		children: [
			{ text: 'Cadastrar', route: '/registro-paciente' },
			{ text: 'Buscar', route: '/busca-paciente' },
		],
	},
	{ text: 'Cadastrar medicamento', route: '/cadastro-medicamento' },
	{ text: 'Cadastro diagnóstico CID', route: '/cadastro-diagnostico-cid' },
	{ text: 'Cadastro Médico', route: '/cadastro-medico' },
	{
		text: 'Receita Médica',
		children: [
			{ text: 'Cadastrar', route: '/cadastro-receita-medica' },
			{ text: 'Buscar', route: '/buscar-receitas-medicas' },
		],
	},
]

export const PageLayout: FC<PropsWithChildren<Props>> = ({ title, children }) => {
	useSetTitle(title)
	return (
		<Stack minHeight="100vh" justifyContent="space-between" mt={5}>
			<Sidebar menuItems={menuItems} />
			<ViewContainer>{children}</ViewContainer>
		</Stack>
	)
}
