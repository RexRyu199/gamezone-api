import { Login } from "../pages/common";
import { NavBar } from "../components/NavBar";
import { useAuth } from "../hooks/useAuth";

export function AdminLayout({ children }) {
  const { auth } = useAuth();

  if (!auth) {
    return (
      <>
        <NavBar />
        <Login />
      </>
    );
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}