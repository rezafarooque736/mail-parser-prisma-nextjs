"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";

const initialFormData = {
  email: "",
  name: "",
  password: "",
};
export default function RegisterForm() {
  const [formData, setFormData] = useState(initialFormData);

  function isFormValid() {
    return !!(
      formData?.email.trim() !== "" &&
      formData?.name.trim() !== "" &&
      formData?.password.trim() !== ""
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data?.success) {
        toast({
          title: data.message,
          description: `${data.name} Account has been created successfully`,
        });
        setFormData(initialFormData);
      } else {
        toast({
          title: data.message,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Card className="w-[33.75rem] shadow-xl px-8 py-6 bg-white text-slate-700">
      <CardHeader>
        <CardTitle className="text-2xl font-medium leading-8 ">
          Create an account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form method="post" onSubmit={handleSubmit}>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                className="border-r-borderPrimary border-b-borderPrimary hover:border-r-primary hover:border-b-primary"
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                required={true}
                value={formData.email}
                placeholder="Your email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                className="border-r-borderPrimary border-b-borderPrimary hover:border-r-primary hover:border-b-primary"
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.name}
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                className="border-r-borderPrimary border-b-borderPrimary hover:border-r-primary hover:border-b-primary"
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                required={true}
                value={formData.password}
                placeholder="Your password"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-4 hover:bg-primary-hover"
              size="lg"
              disabled={!isFormValid()}
              onClick={handleSubmit}
            >
              Create account
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
