"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Settings from "@/components/Settings"
import { Button } from "@/components/ui/button"
import { Moon, SunMoon } from "lucide-react"
import { cn } from "@/lib/utils"

const Page = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [expectedLifeSpan, setExpectedLifeSpan] = useState(80)
  const [birthday, setBirthday] = useState<Date | null>(null)

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(darkMode)
    document.documentElement.classList.toggle("dark", darkMode)

    const savedLifeSpan = localStorage.getItem("expectedLifeSpan")
    const savedBirthday = localStorage.getItem("birthday")

    if (savedLifeSpan) {
      setExpectedLifeSpan(Number(savedLifeSpan))
    }
    if (savedBirthday) {
      setBirthday(new Date(savedBirthday))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString())
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem("expectedLifeSpan", expectedLifeSpan.toString())
  }, [expectedLifeSpan])

  useEffect(() => {
    localStorage.setItem("birthday", birthday?.toISOString() || "")
  }, [birthday])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  const getCompletedWeeksOfLife = () => {
    if (!birthday) return 0
    const diff = new Date().getTime() - birthday.getTime()
    return Math.round(diff / (1000 * 60 * 60 * 24 * 7)) 
  }

  const getPercentageOfLifeCompleted = () => {
    return Math.round((getCompletedWeeksOfLife() / (expectedLifeSpan * 52)) * 100)
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <div>
          <h2 className="text-primary text-2xl md:text-4xl font-bold">Weeks of my life</h2>
          <span className="text-muted-foreground">{getCompletedWeeksOfLife()}/{expectedLifeSpan * 52} weeks ({getPercentageOfLifeCompleted()}%)</span>
        </div>
        <div className="flex flex-row gap-2">
          <Button onClick={toggleDarkMode}>
            {isDarkMode ? <SunMoon /> : <Moon />}
          </Button>
          <Settings expectedLifeSpan={expectedLifeSpan} setExpectedLifeSpan={setExpectedLifeSpan} birthday={birthday} setBirthday={setBirthday}>
            <Button>Settings</Button>
          </Settings>
        </div>
      </div>
      <div className="flex flex-row items-center flex-wrap gap-2">
        {
          [...Array(expectedLifeSpan * 52)].map((_, i) => (
            <div key={i} className={cn(
              "w-2 h-2 rounded-full",
              i < getCompletedWeeksOfLife() ? "bg-primary dark:bg-primary" : "bg-gray-300 dark:bg-gray-700"
            )} />
          ))
        }
      </div>
      <footer className="flex flex-row justify-center gap-2 text-muted-foreground my-4">
        <span>Made with ❤️ by</span>
        <a className="flex flex-row gap-1" href="https://github.com/felixmff">
          <Image className="rounded-full" src="https://avatars.githubusercontent.com/u/73950455" alt="GitHub" width={24} height={24} />
          <span className="font-semibold">felixmff</span>
        </a>
      </footer>
    </MaxWidthWrapper>
  )
}

export default Page
