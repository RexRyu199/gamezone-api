const DEALS_URL = import.meta.env.VITE_CHEAPSHARK_API_URL;

export async function getDealsApi(limit = 6) {
  const url = `${DEALS_URL}/deals?storeID=1&onSale=1&pageSize=20`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("No se pudieron cargar las ofertas");
  }

  const deals = await response.json();
  return deals
    .sort((a, b) => Number(b.savings) - Number(a.savings))
    .slice(0, limit);
}