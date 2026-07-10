import { USER } from "@/lib/user"
import { DashboardThemeProvider } from "@/components/dashboard/theme-provider"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardBottomNav } from "@/components/dashboard/bottom-nav"
import { DashboardMobileTopBar } from "@/components/dashboard/mobile-top-bar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardThemeProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <DashboardSidebar email={USER.email} />
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardMobileTopBar />
          <main className="flex-1 pb-20 lg:pb-6">{children}</main>
        </div>
        <DashboardBottomNav />
      </div>
    </DashboardThemeProvider>
  )
}
