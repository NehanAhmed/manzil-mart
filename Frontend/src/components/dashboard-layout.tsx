import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";
import { IconMenu2 } from "@tabler/icons-react";
import { Sidebar, type NavItem } from "./sidebar";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DashboardLayoutProps {
  /** Primary nav items */
  navItems: NavItem[];
  /** Bottom nav items (settings, exit, etc.) */
  bottomNavItems?: NavItem[];
  /** Sidebar logo text */
  logo?: string;
  /** Tabler icon component for the logo mark */
  logoIcon?: NavItem["icon"];
  /** Page content */
  children: React.ReactNode;
  /**
   * Optional extra className on the main content wrapper.
   * Useful for per-page max-width constraints.
   */
  contentClassName?: string;
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export function DashboardLayout({
  navItems,
  bottomNavItems = [],
  logo = "Admin Panel",
  logoIcon,
  children,
  contentClassName,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen scrollbar-hide  bg-background">
      <Sidebar
        navItems={navItems}
        bottomNavItems={bottomNavItems}
        logo={logo}
        logoIcon={logoIcon}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Content shell ─────────────────────────────────────────────────── */}
      {/*
        Sidebar: fixed, left-3, w-[200px] → right edge at 212px.
        Add 12px breathing gap → content offset = 224px.
      */}
      <div className="lg:ml-[224px]">
        {/* Mobile topbar */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-card/80 backdrop-blur-md border-b border-border">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconMenu2 size={17} stroke={1.6} />
          </button>
          <span className="text-[13px] font-semibold text-foreground">{logo}</span>
        </header>

        {/* Page area — animates on route change */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "p-6 lg:p-10 min-h-[calc(100vh-48px)] lg:min-h-screen",
              contentClassName,
            )}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}