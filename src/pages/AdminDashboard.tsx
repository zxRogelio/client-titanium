import NavbarAdmin from "../components/NavbarAdmin";

export default function AdminDashboard() {
  return (
    <>
      <NavbarAdmin />
      <main style={{ padding: "2rem" }}>
        <h1>Bienvenido, Administrador</h1>
        <p>Este es tu dashboard.</p>
      </main>
    </>
  );
}
