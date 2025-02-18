import { FC, PropsWithChildren } from 'react'
import { Stack } from './styles'
import { useSetTitle } from '../../hooks/use-set-title'
import ViewContainer from '../view-container'

interface Props {
	title: string
	children: React.ReactNode
}

export const PageLayout: FC<PropsWithChildren<Props>> = ({ title, children }) => {
	useSetTitle(title)
	return (
		<Stack minHeight="100vh" justifyContent="space-between" >
			<ViewContainer>{children}</ViewContainer>
		</Stack>
	)
}
