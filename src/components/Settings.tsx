"use client"

import { ReactNode, Dispatch, SetStateAction } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"

const Settings = ({
  expectedLifeSpan,
  setExpectedLifeSpan,
  birthday,
  setBirthday,
  children,
}: {
  expectedLifeSpan: number,
  setExpectedLifeSpan: Dispatch<SetStateAction<number>>,
  birthday: Date | null,
  setBirthday: Dispatch<SetStateAction<Date | null>>,
  children: ReactNode
}) => {
  const handleExpectedLifeSpanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) < 0) return
    setExpectedLifeSpan(Number(event.target.value))
  }

  const handleBirthdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setBirthday(new Date(event.target.value))
    } catch {
      return
    }
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-background flex flex-col gap-4 sm:max-w-[425px] border-0">
        <div className="flex flex-row items-center gap-4 mb-4">
          <Settings2 className="text-primary" size={32} />
          <h2 className="text-primary text-2xl font-bold">Settings</h2>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-primary font-semibold">Expected lifespan (in years)</span>
          <input 
            className="border border-muted-foreground rounded-lg p-2" 
            type="number" 
            value={expectedLifeSpan} 
            onChange={handleExpectedLifeSpanChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-primary font-semibold">My birthday</span>
          <input 
            className="border border-muted-foreground rounded-lg p-2" 
            type="date" 
            value={birthday?.toISOString().split("T")[0]} 
            onChange={handleBirthdayChange}
          />
        </div>
        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Settings
