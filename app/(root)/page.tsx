"use client"
import { useTheme } from "@/context/ThemeProvider";

export default function Home() {
  const {color} = useTheme();
  return (
    <>
      <h1 className={`head-text text-left gradient-${color} inline bg-clip-text text-transparent`}>Home</h1>
    </>
  )
}
