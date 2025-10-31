// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import NavbarPublic from "./NavbarPublic";
import NavbarCliente from "./NavbarCliente";
import NavbarEntrenador from "./NavbarEntrenador";
import NavbarAdmin from "./NavbarAdmin";
import { useAuth } from "../context/useAuth";

export default function Layout() {
  const { user } = useAuth();

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

  return (
    <>
      {getNavbarByRole()}
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}
