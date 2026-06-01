"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface Incidencia {
  estado: "Pendiente" | "En proceso" | "Resuelto";
}

const chartConfig = {
  cantidad: { label: "Incidencias" },
  pendiente: { label: "Pendiente", color: "var(--chart-1)" },
  enProceso: { label: "En proceso", color: "var(--chart-2)" },
  resuelto: { label: "Resuelto", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function ChartEstados({ incidencias }: { incidencias: Incidencia[] }) {
  const chartData = [
    {
      estado: "pendiente",
      cantidad: incidencias.filter((i) => i.estado === "Pendiente").length,
      fill: "var(--color-pendiente)",
    },
    {
      estado: "enProceso",
      cantidad: incidencias.filter((i) => i.estado === "En proceso").length,
      fill: "var(--color-enProceso)",
    },
    {
      estado: "resuelto",
      cantidad: incidencias.filter((i) => i.estado === "Resuelto").length,
      fill: "var(--color-resuelto)",
    },
  ].filter((d) => d.cantidad > 0); // oculta los que son 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución por estado</CardTitle>
        <CardDescription>
          Estado actual de todas las incidencias
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="cantidad" label nameKey="estado" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
