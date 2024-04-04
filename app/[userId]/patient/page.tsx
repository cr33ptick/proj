import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { DocterCard } from "@/components/doctor/card";
import db from "@/lib/db";
import { MybookingCard } from "./card";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: { userId: string };
}

const Page = async ({ params }: Props) => {
  const doctors = await db.user.findMany({
    where: {
      role: "DOCTOR",
    },
  });
  const booking = await db.booking.findFirst({
    where: {
      userId: params.userId,
    },
  });

  const bookings = await db.user.findMany({
    where: {
      id: booking?.doctorId as string,
    },
  });
  return (
    <MaxWidthWrapper>
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-8 py-8">
          <h3 className="font-bold text-3xl">Doctors</h3>
        </div>
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
              {doctors.map((item) => (
                <DocterCard key={item.id} data={item} userId={params.userId} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-8 py-8">
          <h3 className="font-bold text-3xl">My bookings</h3>
        </div>
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {!booking || bookings.length === 0 ? (
              <p className="font-bold text-2xl text-center">No Results</p>
            ) : (
              <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
                {bookings.map((item) => (
                  <MybookingCard
                    key={item.id}
                    data={item}
                    userId={params.userId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default Page;
