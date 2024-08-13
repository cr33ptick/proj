import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Form } from "./form";
import Link from "next/link";

const Register = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-8 justify-center items-center py-8">
        <h2 className="font-bold text-3xl text-center lg:text-6xl">Login</h2>
        <Form />
        <div className="flex items-center justify-center mt-6 cursor-pointer">
          <Link
            href="/register"
            className="inline-flex items-center text-xs font-medium text-center text-primary hover:text-primary/75"
          >
            Don&#x27;t have an account?
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default Register;
