import { createBrowserRouter } from 'react-router-dom'
import { PaginadeCadastrodeEndereco } from './src/pages/cadastro-endereco'
import { PaginadeBuscadeEnderecoporCep } from './src/pages/busca-endereco-cep'
import { PaginadeBuscadeEnderecoporId } from './src/pages/busca-endereco-id'
import { PaginadeRegistroDePaciente } from './src/pages/paciente'
import { PaginadeBuscaDeEnderecoExterno } from './src/pages/endereco-externo'
import { PaginadeBuscadePacientePorId } from './src/pages/busca-paciente'
import { BuscadeCidadePage } from './src/pages/busca-cidade-por-id'

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <PaginadeCadastrodeEndereco />,
			},
			{
				path: 'registro-paciente',
				element: <PaginadeRegistroDePaciente />,
			},
			{
				path: 'endereco-por-cep',
				element: <PaginadeBuscadeEnderecoporCep />,
			},
			{
				path: 'endereco-por-id',
				element: <PaginadeBuscadeEnderecoporId />,
			},
			{
				path: 'endereco-externo',
				element: <PaginadeBuscaDeEnderecoExterno />,
			},
			{
				path: 'busca-paciente',
				element: <PaginadeBuscadePacientePorId />,
			},
			{
				path: 'obter-cidade',
				element: <BuscadeCidadePage />,
			},
		],
	},
])
