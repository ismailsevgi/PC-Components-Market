import '../css/styles.css';
import Navbar from './Pages/Navbar';
import Products from './Pages/Products';
import About from './Pages/About';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Basket from './Pages/Basket';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/basket' element={<Basket />} />

          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
