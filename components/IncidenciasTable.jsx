"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import VerIncidenciaModal from "@/components/VerIncidenciaModal";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
export default function IncidenciasTable() {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rango, setRango] = useState({ from: undefined, to: undefined });

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const response = await fetch(`http://localhost:3001/incidencias/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: nuevoEstado,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar estado");
      }

      obtenerIncidencias();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar el estado");
    }
  };
  const incidenciasFiltradas = incidencias.filter((inc) => {
    if (!rango.from) return true;
    const fecha = new Date(inc.fecha);
    const desde = new Date(rango.from);
    const hasta = rango.to ? new Date(rango.to) : new Date(rango.from);
    hasta.setHours(23, 59, 59); // incluye todo el día final
    return fecha >= desde && fecha <= hasta;
  });
  const obtenerIncidencias = async () => {
    try {
      const response = await fetch("http://localhost:3001/incidencias");
      if (!response.ok) throw new Error("Error al obtener incidencias");
      const data = await response.json();
      setIncidencias(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerIncidencias();
  }, []);
  if (loading) {
    return (
      <div className="mt-8 space-y-3">
        <Skeleton className="h-10 w-48" />
        <div className="rounded-2xl border overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-4 px-6 py-4 border-b">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Gestión de Incidencias</h2>
      <div className="flex items-center gap-3 mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="inline-flex items-center gap-2 border rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
              <CalendarIcon className="h-4 w-4" />
              {rango.from
                ? rango.to
                  ? `${rango.from.toLocaleDateString("es-PE")} → ${rango.to.toLocaleDateString("es-PE")}`
                  : rango.from.toLocaleDateString("es-PE")
                : "Filtrar por fecha"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={rango}
              onSelect={(val) =>
                setRango(val ?? { from: undefined, to: undefined })
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Botón limpiar filtro */}
        {rango.from && (
          <button
            onClick={() => setRango({ from: undefined, to: undefined })}
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
          >
            <X className="h-3 w-3" /> Limpiar
          </button>
        )}
      </div>
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left">Título</th>
              <th className="px-6 py-4 text-left">Responsable</th>
              <th className="px-6 py-4 text-left">Categoría</th>
              <th className="px-6 py-4 text-left">Estado</th>
              <th className="px-6 py-4 text-left">Fecha</th>
              <th className="px-6 py-4 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {incidenciasFiltradas.map((incidencia) => (
              <tr
                key={incidencia._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">{incidencia.titulo}</td>

                <td className="px-6 py-4">{incidencia.responsable}</td>

                <td className="px-6 py-4">{incidencia.categoria}</td>

                <td className="px-6 py-4">
                  <span
                    className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${
                      incidencia.estado === "Resuelto"
                        ? "bg-green-100 text-green-700"
                        : incidencia.estado === "En proceso"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }
                  `}
                  >
                    {incidencia.estado}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {new Date(incidencia.fecha).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 flex gap-2 items-center">
                  <VerIncidenciaModal incidencia={incidencia} />{" "}
                  {/* ← agrega esto */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      actualizarEstado(incidencia._id, "En proceso")
                    }
                  >
                    En proceso
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => actualizarEstado(incidencia._id, "Resuelto")}
                  >
                    Resuelto
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
