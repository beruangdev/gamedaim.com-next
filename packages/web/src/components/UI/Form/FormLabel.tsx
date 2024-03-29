import * as React from "react"

import { useFormControl } from "./FormControl"
import { VariantProps, cn, cva } from "@/utils/classname"

export interface FormLabelProps
  extends React.HTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof formLabelVariants> {
  disabled?: boolean
  children?: React.ReactNode
  htmlFor?: string
}

const formLabelVariants = cva(
  "text-left align-middle block mb-1.5 disabled:opacity-60 font-medium",
  {
    variants: {
      size: {
        "4xl": "text-4xl",
        "3xl": "text-3xl",
        "2xl": "text-2xl",
        xl: "text-xl",
        lg: "text-lg",
        md: "text-base",
        sm: "text-sm",
        xs: "text-xs",
      },
      bold: { true: "font-bold" },
      semibold: { true: "font-semibold" },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, ref) => {
    const { children, className, size, bold, semibold, htmlFor, id, ...rest } =
      props
    const formControl = useFormControl(rest)
    return (
      <label
        ref={ref}
        className={cn(formLabelVariants({ size, bold, semibold, className }))}
        htmlFor={htmlFor || formControl.id}
        id={id || formControl.labelId}
        {...rest}
      >
        {children}
        {formControl.required && <RequiredIndicator />}
      </label>
    )
  },
)

export const RequiredIndicator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
  const { className, ...rest } = props
  const classes = cn("ml-1 text-sm text-danger", className)

  return (
    <span ref={ref} className={classes} aria-hidden="true" {...rest}>
      *
    </span>
  )
})
