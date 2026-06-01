'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/incidencias', label: 'Incidencias', icon: AlertCircle },
  ];

  return (
    <>
      {/* Fondo oscuro detrás del menú en móviles */}
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Contenedor de la barra lateral */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background transition-transform duration-300 ease-in-out pt-16',
          'lg:sticky lg:top-16 lg:z-30 lg:h-[calc(100vh-4rem)] lg:pt-0 lg:transform-none',
          open ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full p-4 lg:p-6">
          {/* Botón 'X' para cerrar en móviles */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Enlaces de navegación */}
          <nav className="flex-1 space-y-2 mt-8 lg:mt-0 lg:space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className="w-full justify-start gap-3"
                    onClick={onClose}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border pt-4 text-xs text-muted-foreground">
            <p>v0.1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
