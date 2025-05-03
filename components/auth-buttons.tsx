"use client";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import SignoutButton from "./signout-button";  
import Link from "next/link";

export default function AuthButtons() {
  const { data, isPending } = authClient.useSession();
  // console.log('session-AuthButtons: ', data)
  return !data ?  (
    <div className="flex gap-4 justify-center">
      <Link href="/sign-in" className="btn btn-primary"><Button variant="outline" className="mb-4">Sign In</Button></Link>          
    </div>

  ) : (
    <div className="flex items-center gap-2">
      <SignoutButton />
    </div>
    
  );
}