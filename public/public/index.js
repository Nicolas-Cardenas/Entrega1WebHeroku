import React from "react";
import ReactDOM from "react-dom";
//import Perfil from "./components/perfil.js";
import Registrar from "../src/components/registrarConductor";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Perfil from "../src/components/perfil";
import CrearViaje from "../src/components/crearViaje";
import RegistrarVehiculo from "../src/components/registrarVehiculo";
import Screen from "../src/components/mainScreen/screen";
import ModificarVehiculo from "../src/components/modificarVehiculo";
import BuscarViajes from "../src/components/buscarViajes";
import Footer from "../src/components/footer";
import HeaderScreen from "../src/components/mainScreen/headerScreen";
import VerViajesConductor from "../src/components/verViajesConductor";
import DetalleViaje from "../src/components/detalleViaje";

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
