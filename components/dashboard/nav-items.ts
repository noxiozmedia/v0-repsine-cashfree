import { CalendarDays, LayoutGrid, MessageSquare, Type, Megaphone } from "lucide-react"

export const navItems = [
  {
    href: "/dashboard/templates",
    label: "Templates",
    short: "Templates",
    icon: LayoutGrid,
  },
  {
    href: "/dashboard/calendar",
    label: "Content Calendar",
    short: "Calendar",
    icon: CalendarDays,
  },
  {
    href: "/dashboard/captions",
    label: "Captions",
    short: "Captions",
    icon: Type,
  },
  {
    href: "/dashboard/scripts",
    label: "WhatsApp & DM Scripts",
    short: "Scripts",
    icon: MessageSquare,
  },
  {
    href: "/dashboard/ads",
    label: "Ads Creatives",
    short: "Ads",
    icon: Megaphone,
  },
] as const

export type NavItem = (typeof navItems)[number]
