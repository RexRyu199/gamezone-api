import { NavBar } from "../components/NavBar";

export function ClientLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}