// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import NavbarPublic from "./NavbarPublic";
import NavbarCliente from "./NavbarCliente";
import NavbarEntrenador from "./NavbarEntrenador";
import NavbarAdmin from "./NavbarAdmin";
import { useAuth } from "../context/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const { user, setUser } = useAuth(); // asegúrate de tener `setUser`
  const navigate = useNavigate();

  const getNavbarByRole = () => {
    if (!user) return <NavbarPublic />;
    switch (user.rol) {
      case "cliente":
        return <NavbarCliente />;
      case "entrenador":
        return <NavbarEntrenador />;
      case "admin":
        return <NavbarAdmin />;
      default:
        return <NavbarPublic />;
    }
  };

  useEffect(() => {
    if (!user) return;

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      alert("Sesión cerrada por inactividad");
      navigate("/login");
    };

    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, 15 * 60 * 1000); // 15 minutos
    };

    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // iniciar

    return () => {
      clearTimeout(timer);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [user, navigate, setUser]);

  return (
    <>
      {getNavbarByRole()}
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}
