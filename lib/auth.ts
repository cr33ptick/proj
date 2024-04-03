import { Role } from "@prisma/client";
import db from "./db";
import jwt from "jsonwebtoken";

export async function getUserServer(id: string) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return null;
  }
  return user;
}
export const createJWT = function (
  userId: string,
  username: string,
  role: Role
): string {
  const secretKey = process.env.JWT_SECRET!;
  const expiry = process.env.JWT_LIFETIME!;
  return jwt.sign({ userId, username, role }, secretKey, { expiresIn: expiry });
};
