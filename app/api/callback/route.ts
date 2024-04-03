import { auth } from "@/app/actions";
import db from "@/lib/db";
import { MpesaCallbackResponse } from "@/types";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await auth();
  const searchParams = req.nextUrl.searchParams;

  const rideId = searchParams.get("rideId") as string;
  const passenger = searchParams.get("passenger") as string;
  if (!user) return NextResponse.json({ rideId, passenger });

  const mpesaCallback: MpesaCallbackResponse = await req.json();
  const { Body } = mpesaCallback;

  console.log(Body.stkCallback);

  const code = Body.stkCallback.ResultCode;

  if (code === 0) {
    const merchantId = Body.stkCallback.MerchantRequestID;
    const resultCode = Body.stkCallback.ResultCode;

    await db.payment.update({
      where: {
        merchantId,
      },
      data: {
        resultCode,
        paid: true,
      },
    });
    const ride = (await db.ride.findUnique({
      where: {
        id: rideId,
      },
      include: {
        User: true,
      },
    })) as
      | {
          User: {
            id: string;
            email: string;
            name: string;
            imageUrl: string;
            phoneNo: string;
          };
        } & {
          id: string;
          from: string;
          to: string;
          date: string;
          time: string;
          price: string;
          passenger: number;
          userId: string;
          vehicleId: string;
        };

    const count = Math.max(0, ride.passenger - +passenger);
    console.log(count);
    await db.ride.update({
      where: {
        id: rideId,
      },
      include: {
        User: true,
      },
      data: {
        passenger: count,
      },
    });

    if (!ride) return NextResponse.json({ success: true });

    await db.bookedRide.create({
      data: {
        rideId: rideId,
        userId: user.id,
      },
    });
    const chatExits = await db.inbox.findFirst({
      where: {
        phoneNo: ride.User.phoneNo,
        userId: user.id,
      },
    });
    if (!chatExits) {
      await db.inbox.create({
        data: {
          name: ride.User.name,
          imageUrl: ride.User.imageUrl,
          phoneNo: ride.User.phoneNo,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return NextResponse.json({ success: true });
    }
  }

  return NextResponse.json({ success: true });
}
