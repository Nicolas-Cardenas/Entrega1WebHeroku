import React from "react";
import ReactDOM from "react-dom";
//import Perfil from "./components/perfil.js";
import Registrar from "./registrarConductor";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Perfil from "./perfil";
import CrearViaje from "./crearViaje";
import RegistrarVehiculo from "./registrarVehiculo";
import Screen from "./mainScreen/screen";
import ModificarVehiculo from "./modificarVehiculo";
import BuscarViajes from "./buscarViajes";
import Footer from "./footer";
import HeaderScreen from "./mainScreen/headerScreen";
import VerViajesConductor from "./verViajesConductor";
import DetalleViaje from "./detalleViaje";

ReactDOM.render(
  <div>
    <BrowserRouter>
      <HeaderScreen />
      <Routes>
        <Route path="/" element={<Screen />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/crearViaje" element={<CrearViaje />} />
        <Route path="/registrarVehiculo" element={<RegistrarVehiculo />} />
        <Route path="/modificarVehiculo" element={<ModificarVehiculo />} />
        <Route path="/buscarViajes" element={<BuscarViajes />} />
        <Route path="/verViajes" element={<VerViajesConductor />} />
        <Route path="/detalleViaje" element={<DetalleViaje />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </div>,
  document.getElementById("root"),
);
