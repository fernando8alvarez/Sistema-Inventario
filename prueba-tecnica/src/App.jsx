import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import "./App.css";
import Register from "./Components/Register/Register";
import Loading from "./Components/Loading/Loading";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/register" exact element={<Register/>}/>
          <Route path="/loading" exact element={<Loading/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
