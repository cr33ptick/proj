"use server";

import { Role } from "@prisma/client";
import db from "./lib/db";
import { Book, Login, Register, Verify } from "./types";
import { createJWT } from "./lib/auth";
import { makePayment } from "./lib/pay";

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

export const available = async (data: Verify) => {
  await db.user.update({
    where: {
      id: data.id,
    },
    data: {
      available: data.verified,
    },
  });
};

export const book = async (data: Book) => {
  const phone = `254${data.phoneNo.slice(-9)}`;
  try {
    const res = await makePayment(phone, "2000", "https://mydomain.com/path");

    console.log(res);

    const booking = await db.booking.create({
      data: {
        doctorId: data.doctorId,
        issue: data.issue,
        userId: data.userId,
      },
    });

    return { msg: res.CustomerMessage, booking };
  } catch (error) {
    console.log("checkout: ", error);

    return null;
  }
};
