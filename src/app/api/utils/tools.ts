import jwt, { JwtPayload } from "jsonwebtoken";
const tokenKey = process.env.TOKEN_SECRET;

type typeToken = {
  id: string;
  email: string;
  role: string;
  zone: string;
};

export function decodeToken(
  authHeader: string
): typeToken | string | JwtPayload {
  if (!authHeader) return "Token requerido";

  try {
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decodedToken = jwt.verify(token, tokenKey || "");

    if (!decodedToken) return "Token inválido";

    return decodedToken;
  } catch (error) {
    return `Error en el servidor + ${error}`;
  }
}
