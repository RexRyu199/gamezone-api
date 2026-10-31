import React, { useEffect, useState } from "react";
import { Card, Image, Loader, Message } from "semantic-ui-react";
import { useAuth } from "../../hooks/useAuth";
import { getDealsApi } from "../../api/deals";

export function Dashboard() {
  const { auth } = useAuth();
  const user = auth.me;

  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDealsApi(6)
      .then(setDeals)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <p className="eyebrow">Dashboard</p>
        <h1>Bienvenido, {user.username}</h1>
        <p className="muted">
          {user.email}
          {user.gamertag && ` · Gamertag: ${user.gamertag}`}
        </p>
      </header>

      <section className="dashboard__widget">
        <h2>Ofertas de videojuegos en Steam</h2>
        <p className="dashboard__source">
          Datos externos en tiempo real desde la API de CheapShark (precios en dólares).
        </p>

        {loading && <Loader active inline="centered" />}
        {error && <Message negative>{error}</Message>}

        <Card.Group itemsPerRow={3} stackable>
          {deals.map((d) => {
            const image = d.steamAppID
              ? `https://cdn.akamai.steamstatic.com/steam/apps/${d.steamAppID}/header.jpg`
              : d.thumb;
            return (
              <Card
                key={d.dealID}
                href={`https://www.cheapshark.com/redirect?dealID=${d.dealID}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={image}
                  alt={d.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = d.thumb;
                  }}
                />
                <Card.Content>
                  <Card.Header>{d.title}</Card.Header>
                  <Card.Meta>
                    <s>${d.normalPrice}</s> &rarr; <b>${d.salePrice}</b>
                  </Card.Meta>
                  <Card.Description>
                    Descuento: -{Math.round(Number(d.savings))}%
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </section>
    </div>
  );
}