import { FC } from "react"
import { PageLayout } from "../layout/page-layout"
import FormularioEndereco from "../componentes/sidebar/formularios/cadastrodeendereco/inex"

export const TITULO = 'Cadastro de Endereço'

export const PaginadeCadastrodeEndereco: FC = () => {
    return (
        <PageLayout title={TITULO}>
            <FormularioEndereco />
        </PageLayout>
    )
}