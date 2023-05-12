import * as React from "react"

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props

  return children
}
