import { ModeToggle } from "./ui/mode-toggle";

export default function Header() {
  return (
    <header className="flex justify-end p4">
      <ModeToggle></ModeToggle>
    </header>
  )
}