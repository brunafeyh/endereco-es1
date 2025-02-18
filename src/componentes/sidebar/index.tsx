import { FC, JSX, useState } from 'react'
import {
	Box,
	Collapse,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useTheme
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp } from '@carbon/icons-react'

type SidebarItem = {
	text: string
	icon?: JSX.Element
	route?: string
	children?: SidebarItem[]
}

type SidebarProps = {
	menuItems: SidebarItem[]
}

const Sidebar: FC<SidebarProps> = ({ menuItems }) => {
	const theme = useTheme()
	const navigate = useNavigate()
	const location = useLocation()
	const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({})

	const toggleSubmenu = (text: string) => {
		setOpenSubmenus((prev) => ({
			...prev,
			[text]: !prev[text],
		}))
	}

	const isParentActive = (children?: SidebarItem[]) =>
		children?.some((child) => location.pathname.startsWith(child.route || ''))

	return (
		<Box
			sx={{
				width: theme.spacing(30),
				height: '100vh',
				position: 'fixed',
				top: 30,
				left: 0,
				backgroundColor: theme.palette.unioeste.neutral.p10,
				boxShadow: 'none',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				
			}}
		>
			<Box sx={{ flexGrow: 1, width: '100%' }}>
				<Box sx={{ mt: theme.spacing(3), width: '100%' }}>
					<ToggleButtonGroup
						orientation="vertical"
						value={location.pathname}
						exclusive
						sx={{ width: theme.spacing(23) }}
					>
						{menuItems.map((item) => {
							const isActive =
								location.pathname === item.route || isParentActive(item.children)
							const shouldExpand = openSubmenus[item.text] || isParentActive(item.children)

							return (
								<Box key={item.text} sx={{ width: '100%' }}>
									<ToggleButton
										value={item.route || item.text}
										onClick={() =>
											item.children ? toggleSubmenu(item.text) : navigate(item.route!)
										}
										sx={{
											justifyContent: 'flex-start',
											width: '100%',
											fontWeight: isActive ? 'bold' : 'normal',
											minWidth: '184px',
											display: 'flex',
											alignItems: 'center',
											gap: theme.spacing(1.5),
										}}
									>
										{item.icon}
										<Box sx={{ flexGrow: 0.95, textAlign: 'left' }}>
											{item.text}
										</Box>
										{item.children && (
											<Box>
												{shouldExpand ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
											</Box>
										)}
									</ToggleButton>

									{item.children && (
										<Collapse in={shouldExpand} unmountOnExit>
											<ToggleButtonGroup
												orientation="vertical"
												value={location.pathname}
												exclusive
												sx={{ width: '100%' }}
											>
												{item.children.map((child) => (
													<ToggleButton
														key={child.text}
														value={child.route || child.text}
														onClick={() => navigate(child.route!)}
														sx={{
															justifyContent: 'flex-start',
															width: '100%',
															minWidth: '184px',
															display: 'flex',
															alignItems: 'center',
															gap: theme.spacing(1.5),
														}}
													>
														<Typography
															fontSize={theme.spacing(1.875)}
															color={theme.palette.unioeste.neutral.p40}
															sx={{ pl: theme.spacing(4.5), flexGrow: 1 }}
														>
															{child.icon} {child.text}
														</Typography>
													</ToggleButton>
												))}
											</ToggleButtonGroup>
										</Collapse>
									)}
								</Box>
							)
						})}
					</ToggleButtonGroup>
				</Box>
			</Box>
		</Box>
	)
}

export default Sidebar
