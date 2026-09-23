import type { RouteObject } from 'react-router-dom';

export const dashboardRouter: RouteObject[] = [
	{
		path: 'home',
		lazy: async () => {
			const { DashboardPage } = await import('../pages/DashboardPage');
			return {
				Component: DashboardPage,
			};
		},
	},
];
