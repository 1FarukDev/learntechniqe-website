'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from './ui/textarea'
import { cn } from '@/lib/utils'

interface FormTextareaProps
  extends React.ComponentProps<typeof Textarea> {
  name: string
  label?: string
  className?: string
  wrapperClassName?: string
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  className,
  wrapperClassName,
  ...props
}) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <div className={cn('flex flex-col gap-1 w-full', wrapperClassName)}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <Textarea
        id={name}
        {...register(name)}
        aria-invalid={!!error}
        className={cn(
          error &&
            'border-destructive placeholder:font-satoshi!important ring-destructive/20 bg-transparent font-satoshi text-xs placeholder:text-normal',
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-xs font-satoshi text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
