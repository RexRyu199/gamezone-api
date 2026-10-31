import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useAuth } from "../../hooks/useAuth";

export function Home() {
  const { auth } = useAuth();

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Tu colección, organizada</p>
          <h1>Lleva el control de todos los juegos que juegas y los que te faltan</h1>
          <p className="lead">
            GameZone es un catálogo de videojuegos con biblioteca personal. Explora títulos,
            agrégalos a tu lista, marca en qué estado van y califícalos.
          </p>
          <div className="actions">
            {auth ? (
              <Button as={Link} to="/dashboard" primary>Ir al Dashboard</Button>
            ) : (
              <>
                <Button as={Link} to="/register" primary>Crear cuenta</Button>
                <Button as={Link} to="/login">Iniciar sesión</Button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="container features">
        <div className="feature">
          <h3>Explora</h3>
          <p>Descubre las mejores ofertas de videojuegos en tiempo real.</p>
        </div>
        <div className="feature">
          <h3>Organiza</h3>
          <p>Marca cada juego como pendiente, jugando o completado.</p>
        </div>
        <div className="feature">
          <h3>Califica</h3>
          <p>Da una puntuación a lo que ya terminaste.</p>
        </div>
      </section>
    </>
  );
}