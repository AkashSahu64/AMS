import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  DoughnutController,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import App from './App';
import './index.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  DoughnutController,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Configure Chart.js defaults
ChartJS.defaults.color = document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151';
ChartJS.defaults.borderColor = document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);