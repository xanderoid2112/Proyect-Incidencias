"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
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
  categoria: string;
}

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function ChartCategorias({
  incidencias,
}: {
  incidencias: Incidencia[];
}) {
  // Agrupa por categoría
  const grouped: Record<string, number> = {};
  incidencias.forEach((i) => {
    grouped[i.categoria] = (grouped[i.categoria] || 0) + 1;
  });

  const chartData = Object.entries(grouped)
    .map(([categoria, cantidad], idx) => ({
      categoria,
      cantidad,
      fill: COLORS[idx % COLORS.length],
    }))
    .sort((a, b) => b.cantidad - a.cantidad);

  // chartConfig dinámico
  const chartConfig: ChartConfig = {
    cantidad: { label: "Incidencias" },
    ...Object.fromEntries(
      chartData.map((d, idx) => [
        d.categoria,
        { label: d.categoria, color: COLORS[idx % COLORS.length] },
      ]),
    ),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incidencias por categoría</CardTitle>
        <CardDescription>
          Categorías con más incidencias registradas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 8 }}
          >
            <YAxis
              dataKey="categoria"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={90}
              tickFormatter={(v) => (v.length > 12 ? v.slice(0, 12) + "…" : v)}
            />
            <XAxis dataKey="cantidad" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="cantidad" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
