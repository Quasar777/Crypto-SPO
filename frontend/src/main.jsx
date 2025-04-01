import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from 'react';
import SimpleStore from '../store/store.jsx';

const store = new SimpleStore();

export const Context = createContext({
  store,
})

const root = document.getElementById('root')

createRoot(root).render(
    <Context.Provider value={{store}}>
        <App />
    </Context.Provider>
)
