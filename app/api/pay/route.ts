import { auth } from "@/app/actions";
import db from "@/lib/db";
import { makePayment } from "@/lib/pay";
import { BookedRideData } from "@/types";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import qs from "query-string";

export async function POST(req: NextRequest) {
  const { amount, phoneNo, rideId, passenger }: BookedRideData =
    await req.json();

  if (!amount || !phoneNo || !rideId || !passenger) {
    return new NextResponse("Missing some details", { status: 400 });
  }
  const user = await auth();
  if (!user) return NextResponse.json({ errors: "Unauthorized" });
  const callbackUrl = qs.stringifyUrl(
    {
      url: `https://carpoolkenya.vercel.app/api/callback`,
      query: { rideId, passenger: passenger.toString() },
    },
    { skipNull: true }
  );

  const phone = `254${phoneNo.slice(-9)}`;
  try {
    const res = await makePayment(phone, amount, callbackUrl);

    console.log(res);

    await db.payment.create({
      data: {
        rideId,
        amount,
        userId: user.id,
        phoneNo: phone,
        merchantId: res.MerchantRequestID,
      },
    });
    // transfer to callback

    revalidatePath("/inbox");
    return NextResponse.json({ msg: res.CustomerMessage });
  } catch (error) {
    console.log("checkout: ", error);

    return NextResponse.json({
      error: "something went wrong. try again later",
      status: 500,
    });
  }
}
