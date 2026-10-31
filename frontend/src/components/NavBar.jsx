import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function NavBar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="nav">
      <span className="brand">GAMEZONE</span>
      <nav>
        <NavLink to="/" end>Inicio</NavLink>
        {auth ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Iniciar sesión</NavLink>
            <NavLink to="/register" className="cta">Registrarse</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}