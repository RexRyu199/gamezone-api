import { NavBar } from "../components/NavBar";

export function CommonLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}