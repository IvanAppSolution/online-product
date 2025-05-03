import Image from "next/image";
import AuthButtons from "./auth-buttons";
import { ModeToggle } from "./ui/mode-toggle";


export default async function Header() {

  return (
    <header className="flex max-w-6xl mx-auto mb-2"> 
      <div className="flex items-center justify-between w-full">
        <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="h-16 w-16" />
        <div className="flex w-40 justify-end gap-2">
          <div className="w-20">
            <AuthButtons />
          </div>
          <ModeToggle></ModeToggle>   
        </div>
      </div>
    </header>
  )
}