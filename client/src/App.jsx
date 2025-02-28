import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { UnProtectedLayout } from "./components/UnProtectedLayout"
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import ResumenPage from "./pages/ResumenPage";
import HogarResumenPage from "./pages/HogarResumenPage";
import GastoFormPage from "./pages/GastoFormPage";
import ControlGeneralPage from "./pages/ControlGeneralPage";
import FamiliaFormPage from "./pages/FamiliaFormPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<UnProtectedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/famform" element={<FamiliaFormPage />} />
              <Route path="/hogarres" element={<HogarResumenPage />} />
              <Route path="/gastoform" element={<GastoFormPage />} />
              <Route path="/control" element={<ControlGeneralPage />} />
              <Route path="/resumen" element={<ResumenPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App