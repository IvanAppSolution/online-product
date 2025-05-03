"use client";
import Image from "next/image";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { User } from "@/lib/auth";
import Link from "next/link";
import SignoutButton from "./signout-button";
import { useTheme } from "next-themes";


export default function Header() {
  const { data, isPending } = authClient.useSession();
  const user = data?.user as User || null;
  const router = useRouter();
  const { theme } = useTheme()
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <header className="flex max-w-6xl mx-auto mb-2"> 
      <div className="flex justify-between w-full">
        <Image src={isDark ? "/images/logo-dark.png" : "/images/logo.png"} alt="Logo" onClick={() => router.push("/")} width={100} height={100} className="h-16 w-16 cursor-pointer" />
          <div className="flex gap-2 items-center w-48 justify-end">
            {!isPending && !user ? (
              <Link href="/sign-in" className="btn btn-primary"><Button variant="outline">Sign In</Button></Link>          
            ) : (
              <>
                {user ? <p className="inline-flex">Hi, {user?.name}</p> : null}
                {user?.role === "admin" ? <Button onClick={() => router.push("/admin")} type="button" variant={"outline"} className="px-4 py-2"             >
                  Admin
                </Button> : null}
                <div className="flex items-center gap-2"> 
                  <SignoutButton />
                </div>
              </>
            )}
            <div className="flex items-center gap-2"> 
              <ModeToggle></ModeToggle>   
            </div>
          </div>
        </div>
    </header>
  )
}