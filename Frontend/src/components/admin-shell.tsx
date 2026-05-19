

import {
  IconLayoutDashboard,
  IconPackage,
  IconShoppingCart,
  IconTruck,
  IconLogout,
  IconHelmet,
} from "@tabler/icons-react";
import type { NavItem } from "@/components/sidebar";
import { Outlet } from "react-router";
import { DashboardLayout } from "./dashboard-layout";

// ─── Nav config ───────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { path: "/admin", label: "Dashboard", icon: IconLayoutDashboard },
  { path: "/admin/products", label: "Products", icon: IconPackage, badge: 12 },
  { path: "/admin/orders", label: "Orders", icon: IconShoppingCart, badge: 3 },
  { path: "/admin/vendors", label: "Vendors", icon: IconHelmet,badge:3 },
];

const BOTTOM_NAV_ITEMS: NavItem[] = [
  { path: "/exit", label: "Exit", icon: IconLogout },
];

// ─── Shell layout (used as a route element) ───────────────────────────────────

export function AdminShell() {
  return (
    <main className="">

      <DashboardLayout
        navItems={NAV_ITEMS}
        bottomNavItems={BOTTOM_NAV_ITEMS}
        logo="Admin Panel"
        logoIcon={IconPackage}
      >
        {/* <Outlet /> renders the matched child route */}
        <Outlet />
      </DashboardLayout>
    </main>
  );
}
