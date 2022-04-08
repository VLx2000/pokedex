import { createRoot } from 'react-dom/client';
import Home from '@pages/Home';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Home tab="home" />);