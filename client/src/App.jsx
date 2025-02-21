import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/loguin" element={<h1>login</h1>} />
      <Route path="/register" element={<h1>Register</h1>} />
      <Route path="/resume" element={<h1>resume</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App