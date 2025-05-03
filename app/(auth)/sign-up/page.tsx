"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { InputFormField } from "@/components/ui/input-form-field";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50),
  password: z.string().min(8),
});

export default function SignUp() {
  const [pending, setPending] = useState(false);
	const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await authClient.signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.username,
			},
			{
				onRequest: () => {
					setPending(true);
				},
				onSuccess: () => {
					// toast({
					// 	title: "Account created",
					// 	description:
					// 		"Your account has been created. Check your email for a verification link.",
					// });
          router.push("/");
				},
				onError: (ctx) => {
					console.log("error", ctx);
					toast({
						title: "Something went wrong",
						description: ctx.error.message ?? "Something went wrong.",
					});
				},
			}
		);
		setPending(false);
	};

  return (
    <div className="grow flex items-center justify-center p-4 mt-16">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center text-gray-800">
						Sign Up
					</CardTitle>
				</CardHeader>
				<CardContent> 
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputFormField
                name="email"
                label="Email"
                placeholder="Email"
                inputType="email"
                formControl={form.control}
              />
              <InputFormField
                name="username"
                label="Username"
                placeholder="Username"
                description="At least 3 characters."
                formControl={form.control}
              />
              <InputFormField
                name="password"
                label="Password"
                placeholder="Password"
                description="At least 8 characters."
                inputType="password"
                formControl={form.control}
              />
              <Button type="submit">Sign in</Button>
            </form>
          </Form>
        </CardContent>
        <CardContent> 
          <p className="text-sm text-neutral-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </CardContent>
			</Card>
		</div>
  );
  
}