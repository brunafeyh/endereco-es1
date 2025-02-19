import { createBrowserRouter } from 'react-router-dom'
import { PaginadeCadastrodeEndereco } from './src/paginas/cadastro-endereco'
import { PaginadeBuscadeEnderecoporCep } from './src/paginas/busca-endereco-cep'
import { PaginadeBuscadeEnderecoporId } from './src/paginas/busca-endereco-id'
import { PaginadeBuscadeEnderecoExterno } from './src/paginas/endereco-externo'
import { PaginadeBuscadePacienteporId } from './src/paginas/busca-paciente'
import { BuscadeCidadePage } from './src/paginas/busca-cidade-por-id'
import PaginaCriarPaciente from './src/paginas/paciente'

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
				element: <PaginaCriarPaciente />,
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
				element: <PaginadeBuscadeEnderecoExterno />,
			},
			{
				path: 'busca-paciente',
				element: <PaginadeBuscadePacienteporId />,
			},
			{
				path: 'obter-cidade',
				element: <BuscadeCidadePage />,
			},
		],
	},
])
