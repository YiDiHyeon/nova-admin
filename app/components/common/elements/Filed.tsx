import React from 'react'

type FieldProps = {
  label?: string
  required?: boolean
  description?: string
  error?: string
  htmlFor?: string
  children: React.ReactNode
}

export function Field({
  label,
  required,
  description,
  error,
  htmlFor,
  children,
}: Readonly<FieldProps>) {
  return (
    <div>
      {label && (
        <label htmlFor={htmlFor}>
          {label}
          {required ? '*' : null}
        </label>
      )}
      {children}
      {error ? <p>{error}</p> : description ? <p>{description}</p> : null}
    </div>
  )
}
