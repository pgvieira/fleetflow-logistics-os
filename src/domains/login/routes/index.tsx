import { type RouteObject } from 'react-router-dom';

export const loginRouter: RouteObject[] = [
	{
		path: 'login',
		lazy: async () => {
			const { LoginPage } = await import('../pages/LoginPage');
			return {
				Component: LoginPage,
			};
		},
	},
];
