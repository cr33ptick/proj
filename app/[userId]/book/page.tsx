import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Form } from "./form";
import { redirect } from "next/navigation";
import { getUserServer } from "@/lib/auth";

interface Props {
  params: { userId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
export default async function Page({ params, searchParams }: Props) {
  const user = await getUserServer(params.userId);
  if (!user) redirect("/login");

  const data = {
    doctorId: searchParams?.doctorId as string,
    userId: user.id,
  };
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-8 justify-center items-center py-8">
        <h2 className="font-bold text-3xl text-primary text-center lg:text-6xl">
          Book Appointment
        </h2>
        <Form data={data} />
      </div>
    </MaxWidthWrapper>
  );
}
