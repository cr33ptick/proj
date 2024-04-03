import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Form } from "./form";

const Register = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-8 justify-center items-center py-8">
        <h2 className="font-bold text-3xl text-center lg:text-6xl">Login</h2>
        <Form />
      </div>
    </MaxWidthWrapper>
  );
};
export default Register;
