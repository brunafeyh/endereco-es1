import React from 'react'
import Grid, { GridProps } from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

interface Props extends GridProps {
	children: React.ReactNode
}

const ViewContainer: React.FC<Props> = ({ children, ...attrs }) => {
	const theme = useTheme()

	return (
		<Grid
			columnSpacing={4}
			rowGap={2}
			paddingTop={theme.spacing(4)}
			paddingBottom={4}
			marginLeft={theme.spacing(30)}
			marginRight={theme.spacing(3)}
			component="main"
			{...attrs}
		>
			{children}
		</Grid>
	)
}

export default ViewContainer
