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

interface BookDemoModalITProps {
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

const validationRulesIT = {
  name: (value: string) => {
    if (!value.trim()) return "Il nome è obbligatorio"
    if (value.trim().length < 2) return "Il nome deve contenere almeno 2 caratteri"
    return undefined
  },
  surname: (value: string) => {
    if (!value.trim()) return "Il cognome è obbligatorio"
    if (value.trim().length < 2) return "Il cognome deve contenere almeno 2 caratteri"
    return undefined
  },
  email: (value: string) => {
    if (!value.trim()) return "L'email è obbligatoria"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return "Inserisci un indirizzo email valido"
    return undefined
  },
  contactNumber: (value: string) => {
    if (!value.trim()) return "Il numero di contatto è obbligatorio"
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
      return "Inserisci un numero di contatto valido"
    }
    return undefined
  },
  companyName: (value: string) => {
    if (!value.trim()) return "Il nome dell'azienda è obbligatorio"
    if (value.trim().length < 2) return "Il nome dell'azienda deve contenere almeno 2 caratteri"
    return undefined
  },
}

export function BookDemoModalIT({ children, onSubmit }: BookDemoModalITProps) {
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
  } = useForm(initialFormData, validationRulesIT)

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
        console.log("Richiesta prenotazione demo:", data)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      // Close modal and reset form on success
      setIsOpen(false)
      reset()
    } catch (error) {
      console.error("Errore nell'invio della richiesta demo:", error)
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
          <DialogTitle>Prenota la Tua Demo Gratuita</DialogTitle>
          <DialogDescription>
            Compila il modulo qui sotto e ti contatteremo per programmare la tua demo personalizzata.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Inserisci il tuo nome"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="surname">
                Cognome <span className="text-destructive">*</span>
              </Label>
              <Input
                id="surname"
                value={data.surname}
                onChange={(e) => updateField("surname", e.target.value)}
                placeholder="Inserisci il tuo cognome"
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
              placeholder="Inserisci il tuo indirizzo email"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactNumber">
              Numero di Contatto <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactNumber"
              type="tel"
              value={data.contactNumber}
              onChange={(e) => updateField("contactNumber", e.target.value)}
              placeholder="Inserisci il tuo numero di contatto"
              aria-invalid={!!errors.contactNumber}
            />
            {errors.contactNumber && (
              <p className="text-sm text-destructive">{errors.contactNumber}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyName">
              Nome Azienda <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyName"
              value={data.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Inserisci il nome della tua azienda"
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
              Annulla
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Invio in corso..." : "Prenota Demo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}