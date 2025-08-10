import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { SocketProvider } from "./context/SocketProvider";

function PrivateRoute({ children }) {
  const token = localStorage.getItem(import.meta.env.VITE_JWT_KEY);
  return token ? children : <Navigate to="/login" replace />;
}

export const App = () => (
  <SocketProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute><Home /></PrivateRoute>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </SocketProvider>
);

export default App;