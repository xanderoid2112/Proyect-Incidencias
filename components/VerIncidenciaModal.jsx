"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

export default function VerIncidenciaModal({ incidencia }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
      >
        <Eye className="h-4 w-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{incidencia.titulo}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2 text-sm">
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold">
                Descripción
              </p>
              <p className="text-gray-700 mt-0.5">{incidencia.descripcion}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold">
                Responsable
              </p>
              <p className="text-gray-700 mt-0.5">{incidencia.responsable}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold">
                Categoría
              </p>
              <p className="text-gray-700 mt-0.5">{incidencia.categoria}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold">
                Estado
              </p>
              <span
                className={`inline-block mt-0.5 px-3 py-1 rounded-full text-xs font-medium
                ${
                  incidencia.estado === "Resuelto"
                    ? "bg-green-100 text-green-700"
                    : incidencia.estado === "En proceso"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {incidencia.estado}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold">
                Fecha
              </p>
              <p className="text-gray-700 mt-0.5">
                {new Date(incidencia.fecha).toLocaleDateString("es-PE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
