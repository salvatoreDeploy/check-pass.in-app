import { ComponentProps, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
  transparent?: boolean
  disabled?: boolean
}

export function IconButton({ children, transparent, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge('bg-black/20 border border-white/10 rounded-md p-1.5', transparent ? 'bg-black/20 hover:bg-white/10' : 'bg-white/10 hover:bg-black/20', disabled ? 'opacity-50 pointer-events-none' : null)}{...props}>
      {children}
    </button>
  )
}