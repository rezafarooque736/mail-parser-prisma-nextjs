"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { SignInFormSchema } from "@/schema";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Title from "../ui/title";

// import icons
import LoadingIcons from "../icons/loading-icons";
import LogoIcons from "../icons/logo-icons";

const SignInForm = () => {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const form = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [sessionStatus, router, callbackUrl]);

  const onSubmit = async (values) => {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error === "CredentialsSignin") {
      form.setError("password", { message: "Invalid credentials" });
      toast.error("Invalid credentials");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  if (sessionStatus === "loading" || sessionStatus === "authenticated") {
    return (
      <div className="grid place-items-center">
        <LoadingIcons />
      </div>
    );
  }

  return (
    sessionStatus === "unauthenticated" && (
      <>
        <div className="flex justify-center mb-5">
          <LogoIcons />
        </div>
        <div className="mb-2">
          <Title>Log in to Mail Parser</Title>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Button
                        asChild
                        variant={"link"}
                        className="pl-1 font-medium text-sky-600"
                      >
                        <Link href={"/auth/reset-password"}>
                          Reset password?
                        </Link>
                      </Button>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-6" type="submit">
              Sign in
            </Button>
          </form>
        </Form>
      </>
    )
  );
};

export default SignInForm;
