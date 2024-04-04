"use client";
import { Button } from "@/components/ui/button";
import { DollarSign, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useServerAction } from "@/hooks/use-server-actions";
import { book } from "@/actions";

type Props = {
  data: {
    doctorId: string;
    userId: string;
  };
};

export const Form: React.FC<Props> = ({ data }) => {
  const [formData, setFormData] = useState({
    issue: "",
    phoneNo: "",
  });
  const router = useRouter();
  const [runAction, loading] = useServerAction(book);

  const { issue, phoneNo } = formData;
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    setFormData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // console.log(issue);
    runAction({ ...data, issue, phoneNo }).then((res) => {
      console.log(res);
      if (!res) return toast.error("Something went wrong try again later");
      toast.success(res.msg);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    });
    // try {
    //   setLoading(true);

    //   const response = await axios.post("/api/pay", {
    // ...data,
    // issue,
    //   });
    //   if (response.data.error) return toast.error(response.data.error);
    //   toast.success(response.data.msg);
    //   setTimeout(() => {
    //     router.push("/");
    //   }, 3000);
    // } catch (error) {
    //   toast.error("Daraja Service Unavailable, try again later");
    // } finally {
    //   setLoading(false);
    // }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-4 w-full px-4 lg:w-[32rem]"
    >
      <p className="text-lg font-bold">Fee: Ksh 2000</p>
      <div className="flex flex-col mb-2">
        <label
          className="text-gray-500 text-lg mb-4 font-medium"
          htmlFor="phoneNo"
        >
          Mpesa number for payment
        </label>
        <div className="flex relative ">
          <input
            type="text"
            required
            id="phoneNo"
            value={phoneNo}
            onChange={handleInputChange}
            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="eg 07..."
          />
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <label
          className="text-gray-500 text-lg mb-4 font-medium"
          htmlFor="issue"
        >
          Describe your issue.
        </label>
        <div className="flex relative ">
          <input
            type="text"
            required
            id="issue"
            value={issue}
            onChange={handleInputChange}
            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="..."
          />
        </div>
      </div>
      <Button disabled={loading}>{loading ? "loading..." : "Book"} </Button>
    </form>
  );
};
