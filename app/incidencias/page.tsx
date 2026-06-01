"use client";

import { useState } from "react";
import { AlertCircle, Clock, CheckCircle2, Plus } from "lucide-react";
import CrearIncidenciaModal from "@/components/CrearIncidenciaModal";
import IncidenciasTable from "@/components/IncidenciasTable";

export default function IncidenciasPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreada = () => setRefreshKey((k) => k + 1);

  return (
    <div className="space-y-6 p-2 max-w-7xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#3e4a24]/85 uppercase">
            Gestión interna
          </p>
          <h1 className="text-4xl font-serif font-bold text-[#3e4a24] mt-1">
            Incidencias
          </h1>
        </div>
        <CrearIncidenciaModal onIncidenciaCreada={handleCreada} />
      </div>

      {/* Tabla real */}
      <IncidenciasTable key={refreshKey} />
    </div>
  );
}
