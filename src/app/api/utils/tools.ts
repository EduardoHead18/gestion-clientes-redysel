import jwt from "jsonwebtoken";
const tokenKey = process.env.TOKEN_SECRET;
export function decodeToken(authHeader: string) {
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
