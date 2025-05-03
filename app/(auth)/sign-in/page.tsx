"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { InputFormField } from "@/components/ui/input-form-field";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ErrorContext } from "@better-fetch/fetch";
import LoadingButton from "@/components/loading-button";

const formSchema = z.object({
  email: z.string().email(),
  // username: z.string().min(0),
  password: z.string().min(8),
});

export default function Signin() {
  const router = useRouter();
	const { toast } = useToast();
  const [pendingCredentials, setPendingCredentials] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "c1@gmail.com",
      password: "pass1234",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    await authClient.signIn.email(
			{
				email: values.email,
				password: values.password,
			},
			{
				onRequest: () => {
					setPendingCredentials(true);
				},
				onSuccess: async () => {
					router.push("/");
					router.refresh();
				},
				onError: (ctx: ErrorContext) => {
					console.log(ctx);
					toast({
						title: "Something went wrong",
						description: ctx.error.message ?? "Something went wrong.",
						variant: "destructive",
					});
				},
			}
		);
		setPendingCredentials(false);

  };

  return (
    <div className="grow flex items-center justify-center p-4 mt-16">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center text-gray-800">
						Sign In
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
                name="password"
                label="Password"
                placeholder="Password"
                description="At least 8 characters."
                inputType="password"
                formControl={form.control}
              />
              {/* <Button type="submit">Sign in</Button> */}
              <LoadingButton pending={pendingCredentials}>
								Sign in
							</LoadingButton>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
						<Link
							href="/forgot-password"
							className="text-primary hover:underline"
						>
							Forgot password?
						</Link>
					</div>
        </CardContent>
        <CardContent> 
          <p className="text-sm text-neutral-500">
            No account yet?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </CardContent>
			</Card>
		</div>
  );
  
}




