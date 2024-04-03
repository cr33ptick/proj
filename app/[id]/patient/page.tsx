import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { DocterCard } from "@/components/doctor/card";

const Page = () => {
  const doctors: any = [];
  return (
    <MaxWidthWrapper>
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-8 py-8">
          <h3 className="font-bold text-3xl">Doctors</h3>
        </div>
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {/* <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
              {doctors.map((item: any) => (
                <DocterCard key={item.id} data={item} />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default Page;
