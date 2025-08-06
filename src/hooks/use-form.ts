import { useState, useCallback } from 'react';
import type { FormState, FormErrors } from '@/types';

export function useForm<T extends Record<string, any>>(
  initialData: T,
  validationRules?: Partial<Record<keyof T, (value: any) => string | undefined>>
) {
  const [formState, setFormState] = useState<FormState<T>>({
    data: initialData,
    errors: {},
    isSubmitting: false,
    isValid: true,
  });

  const validateField = useCallback((name: keyof T, value: any): string | undefined => {
    if (validationRules && validationRules[name]) {
      return validationRules[name]!(value);
    }
    return undefined;
  }, [validationRules]);

  const validateForm = useCallback((data: T): FormErrors => {
    const errors: FormErrors = {};
    
    if (validationRules) {
      Object.keys(validationRules).forEach((key) => {
        const error = validateField(key as keyof T, data[key]);
        if (error) {
          errors[key] = error;
        }
      });
    }
    
    return errors;
  }, [validationRules, validateField]);

  const updateField = useCallback((name: keyof T, value: any) => {
    setFormState((prev) => {
      const newData = { ...prev.data, [name]: value };
      const fieldError = validateField(name, value);
      const newErrors = { ...prev.errors };
      
      if (fieldError) {
        newErrors[name as string] = fieldError;
      } else {
        delete newErrors[name as string];
      }
      
      const isValid = Object.keys(newErrors).length === 0;
      
      return {
        ...prev,
        data: newData,
        errors: newErrors,
        isValid,
      };
    });
  }, [validateField]);

  const setErrors = useCallback((errors: FormErrors) => {
    setFormState((prev) => ({
      ...prev,
      errors,
      isValid: Object.keys(errors).length === 0,
    }));
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState((prev) => ({
      ...prev,
      isSubmitting,
    }));
  }, []);

  const reset = useCallback(() => {
    setFormState({
      data: initialData,
      errors: {},
      isSubmitting: false,
      isValid: true,
    });
  }, [initialData]);

  const validate = useCallback(() => {
    const errors = validateForm(formState.data);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formState.data, validateForm, setErrors]);

  return {
    ...formState,
    updateField,
    setErrors,
    setSubmitting,
    reset,
    validate,
  };
}