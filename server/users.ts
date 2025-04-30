"use server";

import { auth } from "@/lib/auth"; // path to your auth file
import { authClient } from "@/lib/auth-client";

export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: "c1@gmail.com",
      password: "pass1234",
    }
  })
}

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      email: "c1@gmail.com",
      password: "pass1234",
      name: "Customer 1",
    }
  })  
}
