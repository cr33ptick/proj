import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { PatientCard } from "@/components/patient/card";
import db from "@/lib/db";

interface Props {
  params: { userId: string };
}
const Page = async ({ params }: Props) => {
  const patients = await db.booking.findMany({
    where: {
      doctorId: params.userId,
    },
    include: {
      User: true,
    },
  });
  return (
    <MaxWidthWrapper>
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-8 py-8">
          <h3 className="font-bold text-3xl">Patients</h3>
        </div>
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
              {patients.map((item) => (
                <PatientCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default Page;
