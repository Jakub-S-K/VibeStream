import { Route, Routes } from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollUpButton from "./components/ScrollUpButton";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Upload from "./pages/Upload"
import Discover from "./pages/Discover"

function App() {
  return (
    <>
      <Header />

      <ScrollUpButton />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
 
      <Footer />
    </>
  )
}

export default App;
