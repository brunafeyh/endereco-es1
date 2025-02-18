import { createBrowserRouter } from 'react-router-dom'
import { RegisterAndressPage } from './src/pages/register-adress'
import { PacientRegisterPage } from './src/pages/pacient'

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <RegisterAndressPage />,
			},
			{
				path: 'pacient-register',
				element: <PacientRegisterPage />,
			},
		],
	},
])
