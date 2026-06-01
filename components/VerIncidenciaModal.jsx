"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, User, Tag, Activity, CalendarDays, FileText } from "lucide-react";

export default function VerIncidenciaModal({ incidencia }) {
  const [open, setOpen] = useState(false);

  const badgeClass =
    incidencia.estado === "Resuelto"
      ? "bg-green-100 text-green-700 border border-green-200"
      : incidencia.estado === "En proceso"
        ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
        : "bg-gray-100 text-gray-600 border border-gray-200";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-lg hover:bg-[#eff3e7] transition-colors text-[#3e4a24]/60 hover:text-[#3e4a24]"
      >
        <Eye className="h-4 w-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden rounded-2xl">
          {/* Header con color de marca */}
          <div className="bg-[#3c4a27] px-6 py-5">
            <DialogHeader>
              <p className="text-[#c5d49f] text-xs font-semibold uppercase tracking-widest mb-1">
                Detalle de incidencia
              </p>
              <DialogTitle className="text-white text-lg font-bold leading-snug">
                {incidencia.titulo}
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Cuerpo */}
          <div className="px-6 py-5 space-y-4 bg-white">
            {/* Descripción */}
            <div className="bg-[#f4f7ee] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <FileText className="h-3.5 w-3.5 text-[#3e4a24]/50" />
                <p className="text-[10px] font-bold text-[#3e4a24]/50 uppercase tracking-wider">
                  Descripción
                </p>
              </div>
              <p className="text-sm text-[#3e4a24] leading-relaxed">
                {incidencia.descripcion || "Sin descripción"}
              </p>
            </div>

            {/* Grid 2 columnas */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f4f7ee] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <User className="h-3.5 w-3.5 text-[#3e4a24]/50" />
                  <p className="text-[10px] font-bold text-[#3e4a24]/50 uppercase tracking-wider">
                    Responsable
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#3e4a24]">
                  {incidencia.responsable}
                </p>
              </div>

              <div className="bg-[#f4f7ee] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Tag className="h-3.5 w-3.5 text-[#3e4a24]/50" />
                  <p className="text-[10px] font-bold text-[#3e4a24]/50 uppercase tracking-wider">
                    Categoría
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#3e4a24]">
                  {incidencia.categoria}
                </p>
              </div>

              <div className="bg-[#f4f7ee] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Activity className="h-3.5 w-3.5 text-[#3e4a24]/50" />
                  <p className="text-[10px] font-bold text-[#3e4a24]/50 uppercase tracking-wider">
                    Estado
                  </p>
                </div>
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
                >
                  {incidencia.estado}
                </span>
              </div>

              <div className="bg-[#f4f7ee] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-[#3e4a24]/50" />
                  <p className="text-[10px] font-bold text-[#3e4a24]/50 uppercase tracking-wider">
                    Fecha
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#3e4a24]">
                  {new Date(incidencia.fecha).toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
