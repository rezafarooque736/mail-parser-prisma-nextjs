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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { ResetPasswordSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import LoadingIcons from "../icons/loading-icons";

// import icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import LogoIcons from "../icons/logo-icons";
import Title from "../ui/title";

const ResetPasswordForm = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    console.log(values?.email);
  };

  if (sessionStatus === "loading") {
    return (
      <div className="grid place-items-center">
        <LoadingIcons />
      </div>
    );
  }

  return (
    sessionStatus === "unauthenticated" && (
      <div>
        <div className="flex justify-center my-3">
          <LogoIcons />
        </div>
        <Title>Reset password</Title>
        <p className="mb-4">
          Provide your account&apos;s email address and receive instructions via
          email to reset your password.
        </p>
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
            </div>
            <Button className="w-full mt-6" type="submit">
              Send reset instructions
            </Button>
          </form>
          <p className="text-right text-sm text-slate-600 mt-4">
            Have an account?
            <Button
              asChild
              className="text-sky-600 font-medium pl-1 pr-0"
              variant={"link"}
            >
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          </p>
        </Form>
      </div>
    )
  );
};

export default ResetPasswordForm;
