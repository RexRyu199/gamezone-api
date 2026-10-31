const API_URL = import.meta.env.VITE_BASE_API_URL;

export async function loginApi(formData) {
  const response = await fetch(`${API_URL}/api/v1/auth/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (response.status !== 200) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  return await response.json();
}

export async function registerApi(formData) {
  const response = await fetch(`${API_URL}/api/v1/auth/register/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.status !== 201) {
    const data = await response.json().catch(() => ({}));
    const message = Object.values(data).flat().join(" ");
    throw new Error(message || "No se pudo crear el usuario");
  }

  return await response.json();
}

export async function getMeApi(token) {
  const response = await fetch(`${API_URL}/api/v1/auth/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Sesión no válida");
  }

  return await response.json();
}