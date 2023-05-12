"use client"

import * as React from "react"
import { HiChevronDown } from "react-icons/hi"
import { cn } from "ui"

export interface SidebarToggleProps
  extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode
  children?: React.ReactNode
  title?: string
  badge?: string
  href?: string
}

export const SidebarToggle = React.forwardRef<
  HTMLLIElement,
  SidebarToggleProps
>((props, ref) => {
  const { icon, title, children, ...rest } = props

  const [toggle, setToggle] = React.useState<boolean>(false)

  const dropdownClasses = cn(!toggle && "hidden", "space-y-2 py-2")

  return (
    <li ref={ref} {...rest}>
      <button
        type="button"
        onClick={() => setToggle(!toggle)}
        className="text-theme-800 hover:bg-theme-100 dark:hover:bg-theme-700 group flex w-full items-center rounded-lg p-2 text-base font-normal transition duration-75 dark:text-white"
        aria-controls="dropdown"
        data-collapse-toggle="dropdown"
      >
        {icon}
        <span
          className="ml-5 flex-1 whitespace-nowrap text-left"
          sidebar-toggle-item="true"
        >
          {title}
        </span>
        <HiChevronDown sidebar-toggle-item="true" className="h-6 w-6" />
      </button>
      <ul id="dropdown" className={dropdownClasses}>
        {children}
      </ul>
    </li>
  )
})
