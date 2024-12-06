import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollUpButton from './components/ScrollUpButton';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Discover from './pages/Discover';

function App() {
  const location = useLocation();
  const hideHeaderFooterPaths = ['/login', '/register'];
  const shouldHideHeaderFooter = hideHeaderFooterPaths.includes(
    location.pathname
  );

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/discover' element={<Discover />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

      {!shouldHideHeaderFooter && <Footer />}

      <ScrollUpButton />
    </>
  );
}

export default App;
