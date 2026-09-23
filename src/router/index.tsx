import { createBrowserRouter } from 'react-router';
import { loginRouter } from '../domains/login/routes';
import { dashboardRouter } from '../domains/dashboard/routes';

export const router = createBrowserRouter([
	{
		path: '/',
		children: [...loginRouter, ...dashboardRouter],
	},
]);
