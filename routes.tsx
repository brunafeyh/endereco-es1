import { createBrowserRouter } from 'react-router-dom'
import { PaginadeCadastrodeEndereco } from './src/paginas/cadastro-endereco'
import { PaginadeBuscadeEnderecoporCep } from './src/paginas/busca-endereco-cep'
import { PaginadeBuscadeEnderecoporId } from './src/paginas/busca-endereco-id'
import { PaginadeBuscadeEnderecoExterno } from './src/paginas/endereco-externo'
import { PaginadeBuscadePacienteporId } from './src/paginas/busca-paciente'
import { BuscadeCidadePage } from './src/paginas/busca-cidade-por-id'
import PaginaCriarPaciente from './src/paginas/paciente'
import { CadastroMedicamento } from './src/paginas/cadastro-medicamento'
import { CadastroDiagnosticoCID } from './src/paginas/cadastro-diagnostico-cid'
import { CadastroMedico } from './src/paginas/cadastro-medico'
import { BuscarReceitasMedicas } from './src/paginas/buscar-receita-medica'
import { CadastroReceitaMedica } from './src/paginas/cadastro-receita-medica'
import { DetalhesReceitaMedica } from './src/paginas/detalhes-receita-medica'
import { IA } from './src/paginas/ia'

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
			{
				path: 'cadastro-medicamento',
				element: <CadastroMedicamento />,
			},
			{
				path: 'cadastro-diagnostico-cid',
				element: <CadastroDiagnosticoCID />,
			},
			{
				path: 'cadastro-medico',
				element: <CadastroMedico />,
			},
			{
				path: 'cadastro-receita-medica',
				element: <CadastroReceitaMedica />,
			},
			{
				path: 'buscar-receitas-medicas',
				element: <BuscarReceitasMedicas />,
			},
			{
				path: 'detalhes-receita-medica/:id',
				element: <DetalhesReceitaMedica />,
			},
			{
				path: 'ia',
				element: <IA />,
			},
		],
	},
])
