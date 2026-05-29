import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { isDashboardPreview, DEMO_USER } from "@/lib/auth/preview"
import { DashboardThemeProvider } from "@/components/dashboard/theme-provider"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardBottomNav } from "@/components/dashboard/bottom-nav"
import { DashboardMobileTopBar } from "@/components/dashboard/mobile-top-bar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // In preview/demo mode, render with a stand-in identity so the dashboard is
  // editable without a real session. Production still requires a real user.
  if (!user && !isDashboardPreview()) {
    redirect("/auth/login")
  }

  const email = user?.email ?? DEMO_USER.email

  return (
    <DashboardThemeProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <DashboardSidebar email={email} />
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardMobileTopBar />
          <main className="flex-1 pb-20 lg:pb-6">{children}</main>
        </div>
        <DashboardBottomNav />
      </div>
    </DashboardThemeProvider>
  )
}
