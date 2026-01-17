import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Constellation from "./pages/Constellation/Constellation";
import Layout from "./components/layout/Layout";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="/constellation/:id" element={<Constellation/>}/>
      </Route>

      {/* Если неправильный URL */}
      <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>
  </BrowserRouter>
  );
}
export default App
