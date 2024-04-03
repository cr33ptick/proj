"use server";

import { Role } from "@prisma/client";
import db from "./lib/db";
import { Book, Login, Register, Verify } from "./types";
import { createJWT } from "./lib/auth";

export const register = async (data: Register) => {
  const role: Role = data.regNo ? "DOCTOR" : "PATIENT";
  try {
    const user = await db.user.create({
      data: {
        ...data,
        role,
        phoneNo: `254${data.phoneNo.slice(-9)}`,
      },
    });
    const token = createJWT(user.id, user.username, user.role);
    return { token, user };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (data: Login) => {
  const user = await db.user.findUnique({
    where: {
      email: data.email,
      password: data.password,
    },
  });
  if (!user) return null;
  const token = createJWT(user.id, user.username, user.role);
  return { token, user };
};

export const verify = async (data: Verify) => {
  await db.user.update({
    where: {
      id: data.id,
    },
    data: {
      verified: data.verified,
    },
  });
};

export const book = async (data: Book) => {
  const booking = await db.booking.create({
    data: {
      ...data,
    },
  });

  return booking;
};
