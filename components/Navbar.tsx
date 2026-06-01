'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        
        {/* Agrupamos el Botón y el Logo al lado izquierdo */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle para mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              I
            </div>
            <span className="text-lg font-semibold hidden sm:inline">Gestor de Incidencias</span>
          </div>
        </div>

        {/* Espacio derecho libre */}
        <div className="flex items-center">
          {/* Aquí puedes poner un avatar más adelante */}
        </div>

      </div>
    </nav>
  );
}
