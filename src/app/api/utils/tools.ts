import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./cookies";
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

export function randomCodeUuid(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function decodeCookieToken() {
  const employeeCookie = await getCookie();
  const responseDecodeToken = decodeToken(employeeCookie!);
  // let employeeIdStr = "";
  const objectToken = {
    employeeZone: "",
  };
  //validate the zone from the token
  if (typeof responseDecodeToken === "string") {
    console.error("Error decoding token:", responseDecodeToken);
  } else if ("zone" in responseDecodeToken) {
    objectToken.employeeZone = responseDecodeToken.zone;
  }
  return objectToken;
}
