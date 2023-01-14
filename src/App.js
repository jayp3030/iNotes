import { BrowserRouter , Route,Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about' element={<About/>}/>
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
