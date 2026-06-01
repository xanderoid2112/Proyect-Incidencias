'use client';

import CrearIncidenciaModal from "@/components/CrearIncidenciaModal";
import IncidenciasTable from "@/components/IncidenciasTable";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-8">
        Sistema de Gestión de Incidencias
      </h1>

      <CrearIncidenciaModal
        onIncidenciaCreada={() =>
          console.log("Incidencia guardada")
        }
      />

      <IncidenciasTable />
    </main>
  );
}