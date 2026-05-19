import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { type Icon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  path: string;
  label: string;
  icon: Icon;
  badge?: string | number;
}

export interface SidebarProps {
  /** Primary nav items rendered in the main scroll area */
  navItems: NavItem[];
  /** Bottom nav items rendered above the separator (e.g. Settings, Exit) */
  bottomNavItems?: NavItem[];
  /** Display name shown next to the logo icon */
  logo?: string;
  /** Tabler icon component rendered as the logo mark */
  logoIcon?: Icon;
  /** Whether the sidebar is open — managed by DashboardLayout on mobile */
  isOpen: boolean;
  /** Called when the sidebar should close (mobile only) */
  onClose: () => void;
}

// ─── Nav Item ─────────────────────────────────────────────────────────────────

function SidebarNavItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const navigate = useNavigate();
  const Icon = item.icon;

  return (
    <motion.button
      onClick={() => navigate(item.path)}
      whileHover={{ x: isActive ? 0 : 1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.12 }}
      className={cn(
        "relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left",
        "text-[13px] font-medium transition-colors duration-150 group",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-accent",
      )}
    >
      {/* Active indicator dot */}
      {isActive && (
        <motion.span
          layoutId="sidebar-active-dot"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-primary-foreground/50 rounded-r-full"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <Icon
        size={16}
        className={cn(
          "shrink-0 transition-transform duration-150",
          !isActive && "group-hover:scale-110",
        )}
        stroke={1.6}
      />

      <span className="flex-1 truncate">{item.label}</span>

      {item.badge != null && (
        <span
          className={cn(
            "text-[10px] font-semibold px-1.5 py-0.5 rounded-md leading-none tabular-nums",
            isActive
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-primary/10 text-primary",
          )}
        >
          {item.badge}
        </span>
      )}
    </motion.button>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar({
  navItems,
  bottomNavItems = [],
  logo = "Admin Panel",
  logoIcon: LogoIcon,
  isOpen,
  onClose,
}: SidebarProps) {
  const { pathname } = useLocation();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-3.5 border-b border-border shrink-0">
        {LogoIcon && (
          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <LogoIcon size={13} className="text-primary" stroke={1.8} />
          </div>
        )}
        <span className="text-[13px] font-semibold text-foreground flex-1 truncate">
          {logo}
        </span>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5 scrollbar-hide">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.path}
            item={item}
            isActive={pathname === item.path}
          />
        ))}
      </nav>

      {/* Bottom nav */}
      {bottomNavItems.length > 0 && (
        <div className="px-2.5 py-3 border-t border-border space-y-0.5 shrink-0">
          {bottomNavItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              item={item}
              isActive={pathname === item.path}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ── Desktop: always-visible floating panel ─────────────────────────── */}
      <aside className="hidden lg:flex fixed left-3 top-3 bottom-3 w-[200px] z-50 flex-col bg-card border border-border rounded-2xl shadow-[0_4px_24px_-4px_hsl(var(--foreground)/0.07)] overflow-hidden">
        {sidebarContent}
      </aside>

      {/* ── Mobile: animated slide-in drawer ──────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "calc(-100% - 12px)" }}
              animate={{ x: 0 }}
              exit={{ x: "calc(-100% - 12px)" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed left-3 top-3 bottom-3 w-[200px] z-50 bg-card border border-border rounded-2xl shadow-[0_4px_24px_-4px_hsl(var(--foreground)/0.12)] overflow-hidden lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}