'use client';

import CrearIncidenciaModal from "@/components/CrearIncidenciaModal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-8">Prueba de Componente - Persona 4</h1>
      <CrearIncidenciaModal onIncidenciaCreada={() => console.log("Incidencia guardada. Falta actualizar tabla.")} />
      
    </main>
  );
}