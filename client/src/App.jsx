import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
//import ResumenPage from "./pages/ResumenPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/resumen" element={<ResumenPage />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App