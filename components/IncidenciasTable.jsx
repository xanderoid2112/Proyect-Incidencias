'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function IncidenciasTable() {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerIncidencias = async () => {
    try {
      const response = await fetch('http://localhost:3001/incidencias');

      if (!response.ok) {
        throw new Error('Error al obtener incidencias');
      }

      const data = await response.json();
      setIncidencias(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const response = await fetch(
        `http://localhost:3001/incidencias/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            estado: nuevoEstado,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al actualizar estado');
      }

      obtenerIncidencias();
    } catch (error) {
      console.error(error);
      alert('No se pudo actualizar el estado');
    }
  };

  useEffect(() => {
    obtenerIncidencias();
  }, []);

  if (loading) {
    return <p className="mt-4">Cargando incidencias...</p>;
  }

  return (
  <div className="mt-8">
    <h2 className="text-2xl font-bold mb-6">
      Gestión de Incidencias
    </h2>

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
          {incidencias.map((incidencia) => (
            <tr
              key={incidencia._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium">
                {incidencia.titulo}
              </td>

              <td className="px-6 py-4">
                {incidencia.responsable}
              </td>

              <td className="px-6 py-4">
                {incidencia.categoria}
              </td>

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
                {new Date(
                  incidencia.fecha
                ).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    cambiarEstado(
                      incidencia._id,
                      "En proceso"
                    )
                  }
                >
                  En proceso
                </Button>

                <Button
                  size="sm"
                  onClick={() =>
                    cambiarEstado(
                      incidencia._id,
                      "Resuelto"
                    )
                  }
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