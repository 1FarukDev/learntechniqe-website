'use client'

import React from 'react'
import { useFormContext, RegisterOptions } from 'react-hook-form'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

interface FormInputProps extends React.ComponentProps<typeof Input> {
  name: string
  label?: string
  className?: string
  wrapperClassName?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  rules?: RegisterOptions
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  className,
  wrapperClassName,
  iconLeft,
  iconRight,
  rules,
  ...props
}) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  const hasIconLeft = !!iconLeft
  const hasIconRight = !!iconRight

  return (
    <div className={cn('flex flex-col gap-1 w-full', wrapperClassName)}>
      {label && (
        <label htmlFor={name} className='text-base font-bold text-black'>
          {label}
        </label>
      )}
      <div className="relative">
        {hasIconLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {iconLeft}
          </div>
        )}
        <Input
          id={name}
          {...register(name, rules)}
          className={cn(
            hasIconLeft && 'pl-10',
            hasIconRight && 'pr-10',
            error &&
              'border-destructive ring-destructive/20 placeholder:font-satoshi h-15 font-satoshi text-xs placeholder:text-normal',
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {hasIconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {iconRight}
          </div>
        )}
      </div>
      {error && <p className='text-xs font-satoshi text-destructive'>{error}</p>}
    </div>
  )
}
