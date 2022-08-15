import ReactDOM from 'react-dom/client';
import MarvelAppBar from './components/MarvelAppBar/MarvelAppBar';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './router/Router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <div>
    <MarvelAppBar />
    <Router />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
