"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { BookDemoModalIT } from "./book-demo-modal-it"
import type { BookDemoFormData } from "@/types"
import type { VariantProps } from "class-variance-authority"
import type { buttonVariants } from "@/components/ui/button"

interface BookDemoButtonITProps extends VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  className?: string
  onSubmit?: (data: BookDemoFormData) => Promise<void> | void
  asChild?: boolean
}

export function BookDemoButtonIT({
  children = "Prenota Demo Gratuita",
  variant = "default",
  size = "default",
  className,
  onSubmit,
  ...props
}: BookDemoButtonITProps) {
  return (
    <BookDemoModalIT onSubmit={onSubmit}>
      <Button
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        {children}
      </Button>
    </BookDemoModalIT>
  )
}