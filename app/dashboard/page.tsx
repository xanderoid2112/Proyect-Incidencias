"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, CheckCircle2, List } from "lucide-react";
import { ChartIncidencias } from "@/components/ChartIncidencias";
import { ChartEstados } from "@/components/ChartEstados";
import { ChartCategorias } from "@/components/ChartCategorias";

interface Incidencia {
  _id: string;
  titulo: string;
  descripcion: string;
  responsable: string;
  estado: "Pendiente" | "En proceso" | "Resuelto";
  fecha: string;
  categoria: string;
}

export default function DashboardPage() {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/incidencias")
      .then((r) => r.json())
      .then((data) => {
        setIncidencias(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const total = incidencias.length;
  const pendientes = incidencias.filter((i) => i.estado === "Pendiente").length;
  const enProceso = incidencias.filter((i) => i.estado === "En proceso").length;
  const resueltos = incidencias.filter((i) => i.estado === "Resuelto").length;

  if (loading) return <p className="p-6 text-stone-500">Cargando...</p>;

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Cabecera */}
      <div>
        <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
          Panel interno
        </p>
        <h1 className="text-4xl font-bold text-stone-800 mt-1">Dashboard</h1>
        <p className="text-sm text-stone-500 mt-1">
          Resumen de incidencias registradas en el sistema.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-stone-500">
              Total incidencias
            </CardTitle>
            <List className="h-4 w-4 text-stone-400" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-stone-800">{total}</p>
            <p className="text-xs text-stone-400 mt-1">registradas en total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-stone-500">
              Pendientes
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">{pendientes}</p>
            <p className="text-xs text-stone-400 mt-1">sin atender</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-stone-500">
              En proceso
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{enProceso}</p>
            <p className="text-xs text-stone-400 mt-1">en atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-stone-500">
              Resueltos
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">{resueltos}</p>
            <p className="text-xs text-stone-400 mt-1">completadas</p>
          </CardContent>
        </Card>
      </div>
      <ChartIncidencias incidencias={incidencias} />
      <div className="grid gap-4 md:grid-cols-2">
        <ChartEstados incidencias={incidencias} />
        <ChartCategorias incidencias={incidencias} />
      </div>
    </div>
  );
}
