import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Bags from "./pages/bags/Bags";
import pokeball from "./assets/pokeball.png"
import Detail from "./pages/detail/Detail";
import { useEffect } from "react";
import Navbar from "./components/navbar/NavbarCustom";
function App() {
  useEffect(()=>{
    let pokemon = localStorage.getItem("pokemon")
    if(pokemon == null){
      localStorage.setItem("pokemon",JSON.stringify([]))
    }
    
  },[])
  return (
    <>
      <Navbar/>
      <img src={pokeball} className={"background"} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bags" element={<Bags />} />
        <Route path="/pokemon/:id" element={<Detail/>}/>
      </Routes>
    </>
  );
}

export default App;
