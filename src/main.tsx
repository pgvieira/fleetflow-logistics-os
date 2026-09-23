import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import './styles/index.css';
import AppComponent from './App.tsx';

const rootElement: HTMLElement = document.getElementById('root')!;
const root: Root = createRoot(rootElement);
root.render(
	<StrictMode>
		<AppComponent />
	</StrictMode>,
);
