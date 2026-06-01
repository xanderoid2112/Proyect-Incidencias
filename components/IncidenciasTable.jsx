"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import VerIncidenciaModal from "@/components/VerIncidenciaModal";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { useIncidencias } from "@/context/IncidenciasContext";

export default function IncidenciasTable() {
  const [rango, setRango] = useState({ from: undefined, to: undefined });
  const { incidencias, refetch } = useIncidencias();
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

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

      refetch();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar el estado");
    }
  };
  const incidenciasFiltradas = incidencias.filter((inc) => {
    // filtro fecha
    if (rango.from) {
      const fecha = new Date(inc.fecha);
      const desde = new Date(rango.from);
      const hasta = rango.to ? new Date(rango.to) : new Date(rango.from);
      hasta.setHours(23, 59, 59);
      if (!(fecha >= desde && fecha <= hasta)) return false;
    }
    // filtro estado
    if (estadoFiltro !== "Todos") return inc.estado === estadoFiltro;
    return true;
  });
  const totalPaginas = Math.ceil(incidenciasFiltradas.length / porPagina);
  const incidenciasVista = incidenciasFiltradas.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina,
  );
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
              onSelect={(val) => {
                setRango(val ?? { from: undefined, to: undefined });
                setPagina(1);
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-2 flex-wrap">
          {["Todos", "Pendiente", "En proceso", "Resuelto"].map((estado) => (
            <button
              key={estado}
              onClick={() => {
                setEstadoFiltro(estado);
                setPagina(1);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border
        ${
          estadoFiltro === estado
            ? estado === "Todos"
              ? "bg-[#3c4a27] text-white border-[#3c4a27]"
              : estado === "Resuelto"
                ? "bg-green-100 text-green-700 border-green-300"
                : estado === "En proceso"
                  ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                  : "bg-gray-200 text-gray-700 border-gray-300"
            : "bg-white text-gray-400 border-[#e2e8d5] hover:border-[#c5d49f] hover:text-[#3e4a24]"
        }`}
            >
              {estado}
            </button>
          ))}
        </div>
        {/* Botón limpiar filtro */}
        {rango.from && (
          <button
            onClick={() => {
              setRango({ from: undefined, to: undefined });
              setPagina(1);
            }}
            className="inline-flex items-center gap-1 ..."
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
            {incidenciasVista.map((incidencia) => (
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
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#e2e8d5]">
          <p className="text-xs text-[#3e4a24]/50">
            Mostrando {(pagina - 1) * porPagina + 1}–
            {Math.min(pagina * porPagina, incidenciasFiltradas.length)} de{" "}
            {incidenciasFiltradas.length} incidencias
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#e2e8d5] hover:bg-[#f4f7ee] disabled:opacity-40 disabled:cursor-not-allowed text-[#3e4a24]"
            >
              ← Anterior
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1)
              .filter(
                (n) =>
                  n === 1 || n === totalPaginas || Math.abs(n - pagina) <= 1,
              )
              .reduce((acc, n, idx, arr) => {
                if (idx > 0 && n - arr[idx - 1] > 1) acc.push("...");
                acc.push(n);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "..." ? (
                  <span
                    key={`dots-${idx}`}
                    className="px-2 text-xs text-[#3e4a24]/30"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={`page-${item}`}
                    onClick={() => setPagina(item)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all
          ${
            pagina === item
              ? "bg-[#3c4a27] text-white"
              : "border border-[#e2e8d5] hover:bg-[#f4f7ee] text-[#3e4a24]"
          }`}
                  >
                    {item}
                  </button>
                ),
              )}
            <button
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#e2e8d5] hover:bg-[#f4f7ee] disabled:opacity-40 disabled:cursor-not-allowed text-[#3e4a24]"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
