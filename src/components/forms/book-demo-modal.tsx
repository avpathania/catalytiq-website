"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@/hooks/use-form"
import type { BookDemoFormData } from "@/types"

interface BookDemoModalProps {
  children: React.ReactNode
  onSubmit?: (data: BookDemoFormData) => Promise<void> | void
}

const initialFormData: BookDemoFormData = {
  name: "",
  surname: "",
  email: "",
  contactNumber: "",
  companyName: "",
}

const validationRules = {
  name: (value: string) => {
    if (!value.trim()) return "Name is required"
    if (value.trim().length < 2) return "Name must be at least 2 characters"
    return undefined
  },
  surname: (value: string) => {
    if (!value.trim()) return "Surname is required"
    if (value.trim().length < 2) return "Surname must be at least 2 characters"
    return undefined
  },
  email: (value: string) => {
    if (!value.trim()) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return "Please enter a valid email address"
    return undefined
  },
  contactNumber: (value: string) => {
    if (!value.trim()) return "Contact number is required"
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
      return "Please enter a valid contact number"
    }
    return undefined
  },
  companyName: (value: string) => {
    if (!value.trim()) return "Company name is required"
    if (value.trim().length < 2) return "Company name must be at least 2 characters"
    return undefined
  },
}

export function BookDemoModal({ children, onSubmit }: BookDemoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    data,
    errors,
    isSubmitting,
    isValid,
    updateField,
    setSubmitting,
    reset,
    validate,
  } = useForm(initialFormData, validationRules)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    setSubmitting(true)
    
    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        // Default behavior - log the data (replace with actual API call)
        console.log("Demo booking request:", data)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      // Close modal and reset form on success
      setIsOpen(false)
      reset()
    } catch (error) {
      console.error("Error submitting demo request:", error)
      // Handle error (could show toast notification)
    } finally {
      setSubmitting(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // Reset form when modal is closed
      reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Your Free Demo</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get in touch to schedule your personalized demo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter your name"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="surname">
                Surname <span className="text-destructive">*</span>
              </Label>
              <Input
                id="surname"
                value={data.surname}
                onChange={(e) => updateField("surname", e.target.value)}
                placeholder="Enter your surname"
                aria-invalid={!!errors.surname}
              />
              {errors.surname && (
                <p className="text-sm text-destructive">{errors.surname}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="Enter your email address"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactNumber">
              Contact Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactNumber"
              type="tel"
              value={data.contactNumber}
              onChange={(e) => updateField("contactNumber", e.target.value)}
              placeholder="Enter your contact number"
              aria-invalid={!!errors.contactNumber}
            />
            {errors.contactNumber && (
              <p className="text-sm text-destructive">{errors.contactNumber}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyName">
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyName"
              value={data.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Enter your company name"
              aria-invalid={!!errors.companyName}
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName}</p>
            )}
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Book Demo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}