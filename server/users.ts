"use server";

import { auth } from "@/lib/auth"; // path to your auth file
import { authClient } from "@/lib/auth-client";

interface UserProps {
  email: string;
  password: string;
  username?: string;
}

export const signIn = async (userSignIn: UserProps) => {
  await auth.api.signInEmail({
    body: {
      email: userSignIn.email,
      password: userSignIn.password,
    }
  })
}

export const signUp = async (userProps: UserProps) => {
  await auth.api.signUpEmail({
    body: {
      email: userProps.email,
      password: userProps.password,
      name: userProps.username || userProps.email,
    }
  })  
}
