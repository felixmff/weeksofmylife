"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {

  return (
    <div
      className={cn(
        "w-full px-2.5 pt-4 mx-auto max-w-7xl",
        className
      )}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper