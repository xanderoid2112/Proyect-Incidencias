"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  open,
  onClose,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/incidencias", label: "Incidencias", icon: AlertCircle },
  ];

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 border-r border-[#e2e8d5] bg-[#f4f7ee] transition-all duration-300 ease-in-out pt-16",
          "lg:sticky lg:top-16 lg:z-30 lg:h-[calc(100vh-4rem)] lg:pt-0 lg:transform-none",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          collapsed ? "w-[68px]" : "w-64",
        )}
      >
        <div className="flex flex-col h-full py-4 relative">
          {/* Botón X mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 lg:hidden hover:bg-[#e2e8d5]"
            onClick={onClose}
          >
            <X className="h-4 w-4 text-[#3e4a24]" />
          </Button>

          {/* Botón colapsar desktop */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex absolute -right-3 top-6 z-10 w-6 h-6 rounded-full border border-[#e2e8d5] bg-white shadow-sm items-center justify-center hover:bg-[#eff3e7] transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-3 w-3 text-[#3e4a24]" />
            ) : (
              <ChevronLeft className="h-3 w-3 text-[#3e4a24]" />
            )}
          </button>

          {/* Sección nav */}
          <div className="px-3 mb-2">
            {!collapsed && (
              <p className="text-[10px] font-bold text-[#3e4a24]/40 uppercase tracking-widest px-2 mb-2">
                Menú principal
              </p>
            )}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <button
                      onClick={onClose}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-[#3c4a27] text-white shadow-sm"
                          : "text-[#3e4a24]/70 hover:bg-[#e2e8d5] hover:text-[#3e4a24]",
                        collapsed && "justify-center px-2",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </button>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div
            className={cn(
              "mt-auto border-t border-[#e2e8d5] pt-4 mx-3",
              collapsed ? "text-center" : "",
            )}
          >
            {!collapsed ? (
              <div className="px-2">
                <p className="text-xs font-semibold text-[#3e4a24]">
                  Harvest Coffeehouse
                </p>
                <p className="text-[10px] text-[#3e4a24]/40 mt-0.5">
                  v0.1.0 — Sistema de incidencias
                </p>
              </div>
            ) : (
              <p className="text-[10px] text-[#3e4a24]/40 text-center">v0.1</p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
