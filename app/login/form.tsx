"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useServerAction } from "@/hooks/use-server-actions";
import { login } from "@/actions";
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Form = () => {
  const [runAction, loading] = useServerAction(login);
  const [token, setToken] = useLocalStorage<string>("token", "");
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    setFormData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // console.log(formData);
    runAction(formData).then((res) => {
      console.log(res);
      if (!res) return toast.error("Invalid credentials");
      setToken(res.token);
      switch (res.user.role) {
        case "ADMIN":
          router.push(`${res.user.id}/admin`);
          break;

        case "DOCTOR":
          router.push(`${res.user.id}/doctor`);

          break;

        default:
          router.push(`${res.user.id}/patient`);

          break;
      }
    });
  }
  const { email, password } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={handleInputChange}
              type="email"
              placeholder="email"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={password}
              onChange={handleInputChange}
              type="password"
              placeholder="password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={loading}>Login</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
