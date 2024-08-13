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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useServerAction } from "@/hooks/use-server-actions";
import { register } from "@/actions";
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function Form() {
  const [runAction, loading] = useServerAction(register);
  const [token, setToken] = useLocalStorage<string>("token", "");
  const router = useRouter();

  const [formData, setFormData] = useState({
    phoneNo: "",
    username: "",
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
      if (!res) return toast.error("Email already exists");

      setToken(res.token);
      router.push(`${res.user.id}/patient`);
    });
  }

  const [formData2, setFormData2] = useState({
    phoneNo2: "",
    username2: "",
    email2: "",
    password2: "",
    regNo: "",
    specilize: "",
  });

  function handleInputChange2(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    setFormData2((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  }
  const { email2, password2, phoneNo2, regNo, specilize, username2 } =
    formData2;

  async function handleSubmit2(e: FormEvent) {
    e.preventDefault();
    const data = {
      phoneNo: phoneNo2,
      username: username2,
      email: email2,
      password: password2,
      regNo,
      specilize,
    };
    console.log(data);
    runAction(data).then((res) => {
      console.log(res);
      if (!res) return toast.error("Email already exists");

      setToken(res.token);
      router.push(`${res.user.id}/doctor`);
    });
  }
  const { email, password, phoneNo, username } = formData;
  return (
    <Tabs defaultValue="patient" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="patient">Patient</TabsTrigger>
        <TabsTrigger value="doctor">Doctor</TabsTrigger>
      </TabsList>
      <TabsContent value="patient">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Patient</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="username"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="email"
                  required
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
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phoneNo">Phone Number</Label>
                <Input
                  id="phoneNo"
                  type="number"
                  required
                  value={phoneNo}
                  onChange={handleInputChange}
                  placeholder="phone Number"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Register</Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
      <TabsContent value="doctor">
        <form onSubmit={handleSubmit2}>
          <Card>
            <CardHeader>
              <CardTitle>Docter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username2">Username</Label>
                <Input
                  id="username2"
                  value={username2}
                  onChange={handleInputChange2}
                  placeholder="username"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email2">Email</Label>
                <Input
                  id="email2"
                  value={email2}
                  onChange={handleInputChange2}
                  type="email"
                  required
                  placeholder="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password2">Password</Label>
                <Input
                  id="password2"
                  value={password2}
                  onChange={handleInputChange2}
                  type="password"
                  required
                  placeholder="password"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phoneNo2">Phone Number</Label>
                <Input
                  id="phoneNo2"
                  value={phoneNo2}
                  onChange={handleInputChange2}
                  required
                  type="number"
                  placeholder="phone Number"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="regNo">License Number</Label>
                <Input
                  id="regNo"
                  value={regNo}
                  onChange={handleInputChange2}
                  placeholder="Registration Number"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="specilize">Speciality</Label>
                <Input
                  id="specilize"
                  value={specilize}
                  onChange={handleInputChange2}
                  placeholder="speciality"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loading}>Register</Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
    </Tabs>
  );
}
