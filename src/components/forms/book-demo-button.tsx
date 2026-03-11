"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { BookDemoModal } from "./book-demo-modal"
import type { BookDemoFormData } from "@/types"
import type { VariantProps } from "class-variance-authority"
import type { buttonVariants } from "@/components/ui/button"

interface BookDemoButtonProps extends VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  className?: string
  onSubmit?: (data: BookDemoFormData) => Promise<void> | void
  asChild?: boolean
}

export function BookDemoButton({
  children = "Book Free Demo",
  variant = "default",
  size = "default",
  className,
  onSubmit,
  ...props
}: BookDemoButtonProps) {
  return (
    <BookDemoModal onSubmit={onSubmit}>
      <Button
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        {children}
      </Button>
    </BookDemoModal>
  )
}