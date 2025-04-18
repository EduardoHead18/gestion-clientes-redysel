"use server";
import { cookies } from "next/headers";

export async function setCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 7500, // <-- 2 hours of token life 7200
  });
}

export async function getCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}
