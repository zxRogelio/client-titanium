import NavbarEntrenador from "../components/NavbarEntrenador";

export default function EntrenadorDashboard() {
  return (
    <>
      <NavbarEntrenador />
      <main style={{ padding: "2rem" }}>
        <h1>Bienvenido, Entrenador</h1>
        <p>Este es tu dashboard.</p>
      </main>
    </>
  );
}
