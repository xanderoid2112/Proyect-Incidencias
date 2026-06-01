"use client";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useIncidencias } from "@/context/IncidenciasContext";
import VerIncidenciaModal from "@/components/VerIncidenciaModal";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { incidencias } = useIncidencias();
  const searchRef = useRef<HTMLDivElement>(null);
  const resultados =
    query.trim().length < 2
      ? []
      : incidencias.filter((i) =>
          [i.titulo, i.responsable, i.categoria, i.estado].some((v) =>
            v?.toLowerCase().includes(query.toLowerCase()),
          ),
        );
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const badgeClass = (estado: string) =>
    estado === "Resuelto"
      ? "bg-green-100 text-green-700"
      : estado === "En proceso"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-600";

  return (
    <nav className="sticky top-0 z-40 border-b border-[#e2e8d5] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex h-16 items-center justify-between px-6 gap-4">
        {/* Izquierda */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-[#eff3e7]"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5 text-[#3e4a24]" />
          </Button>
          <div className="flex items-center gap-2.5">
            <Image
              src="https://res.cloudinary.com/dzxmyjnpf/image/upload/f_auto,q_auto/logo_ydpdox"
              alt="Harvest Coffeehouse"
              width={34}
              height={34}
              className="rounded-lg"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-[#3e4a24] leading-tight">
                Harvest Coffeehouse
              </p>
              <p className="text-[10px] text-[#3e4a24]/50 leading-tight">
                Gestión de Incidencias
              </p>
            </div>
          </div>
        </div>

        {/* Buscador central */}
        <div className="flex-1 max-w-md relative" ref={searchRef}>
          <div className="flex items-center gap-2 border border-[#e2e8d5] rounded-xl px-3 py-2 bg-[#f4f7ee] hover:border-[#c5d49f] transition-colors">
            <Search className="h-4 w-4 text-[#3e4a24]/40 shrink-0" />
            <input
              type="text"
              placeholder="Buscar incidencias..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setOpen(true)}
              className="bg-transparent text-sm text-[#3e4a24] placeholder:text-[#3e4a24]/40 outline-none w-full"
            />
            {query && (
              <button
                onMouseDown={(e) => e.preventDefault()} // evita que onBlur cierre antes del click
                onClick={() => setQuery("")}
                className="text-[#3e4a24]/30 hover:text-[#3e4a24]/60 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dropdown manual — sin Popover */}
          {open && (
            <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-2xl shadow-lg border border-[#e2e8d5] z-50 overflow-hidden">
              {query.trim().length < 2 ? (
                <div className="px-4 py-6 text-center text-sm text-[#3e4a24]/40">
                  Escribe al menos 2 caracteres...
                </div>
              ) : resultados.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-[#3e4a24]/40">
                  Sin resultados para <strong>&ldquo;{query}&rdquo;</strong>
                </div>
              ) : (
                <div>
                  <p className="text-[10px] font-bold text-[#3e4a24]/40 uppercase tracking-widest px-4 pt-3 pb-1">
                    {resultados.length} resultado
                    {resultados.length !== 1 && "s"}
                  </p>
                  <div className="max-h-72 overflow-y-auto divide-y divide-[#f0f4e8]">
                    {resultados.map((inc) => (
                      <div
                        key={inc._id}
                        className="flex items-center justify-between px-4 py-3 hover:bg-[#f4f7ee] transition-colors"
                      >
                        <div className="flex-1 min-w-0 mr-3">
                          <p className="text-sm font-semibold text-[#3e4a24] truncate">
                            {inc.titulo}
                          </p>
                          <p className="text-xs text-[#3e4a24]/50">
                            {inc.responsable} · {inc.categoria}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass(inc.estado)}`}
                          >
                            {inc.estado}
                          </span>
                          <div onMouseDown={(e) => e.preventDefault()}>
                            <VerIncidenciaModal incidencia={inc} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Derecha */}
        <div className="shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#3e4a24]/70 bg-[#eff3e7] px-3 py-1.5 rounded-full border border-[#c5d49f]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Sistema activo
          </span>
        </div>
      </div>
    </nav>
  );
}
