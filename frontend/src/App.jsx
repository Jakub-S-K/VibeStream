import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
//=============== CONTEXT ===============//
import { AuthProvider } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';
import { AlertProvider } from './context/AlertContext';
//=============== COMPONENTS ===============//
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollUpButton from './components/ScrollUpButton';
import NoMatch from './components/NoMatch';
import AlertPopup from './components/AlertPopup';
//=============== PAGES ===============//
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Upload from './pages/Upload';
import Discover from './pages/Discover';
import UserProfile from './pages/UserProfile';
import Album from './pages/Album';

function App() {
  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <AlertPopup />
          <ScrollToTop />
          <MessageProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route
                  path='/upload'
                  element={
                    <PrivateRoute>
                      <Upload />
                    </PrivateRoute>
                  }
                />
                <Route path='/discover' element={<Discover />} />
                <Route path='/user/:username' element={<UserProfile />} />
                <Route path='/album/:name' element={<Album />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='*' element={<NoMatch />} />
            </Routes>
            <ScrollUpButton />
          </MessageProvider>
        </AuthProvider>
      </AlertProvider>
    </>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const ScrollToTop = (props) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  return <>{props.children}</>;
};

export default App;
