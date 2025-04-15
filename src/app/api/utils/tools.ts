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
  const token = authHeader.split(" ")[1];
  if (!authHeader) return "Token requerido";
  try {
    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new Error("Formato de token inválido");
    const decodedToken = jwt.verify(token, tokenKey ? tokenKey : "");
    if (decodedToken === undefined) return "Token inválido";
    return decodedToken;
  } catch {
    return "Error en el servidor";
  }
}
