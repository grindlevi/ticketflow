import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Test } from "./components/Test.tsx";
import Home from './pages/Home.tsx';
import Dashboard from './pages/Dashboard.tsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/test' element={ <Test /> }/>
        <Route path='/dashboard' element={ <Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
