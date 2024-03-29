import * as React from "react"

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <aside
        className="scrollbar bg-background border-border text-foreground flex h-screen flex-col flex-wrap overflow-y-auto rounded border-r px-3 pb-12 pt-4 transition-[width] duration-300"
        aria-label="Sidebar"
        ref={ref}
        {...rest}
      >
        <div>
          <ul className="space-y-2">{children}</ul>
        </div>
      </aside>
    )
  },
)
