import NavbarCliente from "../components/NavbarCliente";

export default function ClienteDashboard() {
  return (
    <>
      <NavbarCliente />
      <main style={{ padding: "2rem" }}>
        <h1>Bienvenido, Cliente</h1>
        <p>Este es tu dashboard.</p>
      </main>
    </>
  );
}
