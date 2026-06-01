"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Incidencia {
  _id: string;
  estado: "Pendiente" | "En proceso" | "Resuelto";
  fecha: string;
}

interface Props {
  incidencias: Incidencia[];
}

const chartConfig = {
  pendientes: {
    label: "Pendientes",
    color: "var(--chart-1)",
  },
  resueltas: {
    label: "Resueltas",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartIncidencias({ incidencias }: Props) {
  const [timeRange, setTimeRange] = React.useState("90d");

  // Agrupa incidencias por fecha (día)
  const grouped: Record<string, { pendientes: number; resueltas: number }> = {};

  incidencias.forEach((inc) => {
    const d = new Date(inc.fecha);
    const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (!grouped[day]) grouped[day] = { pendientes: 0, resueltas: 0 };
    if (inc.estado === "Pendiente" || inc.estado === "En proceso") {
      grouped[day].pendientes++;
    } else if (inc.estado === "Resuelto") {
      grouped[day].resueltas++;
    }
  });

  // Convierte a array ordenado por fecha
  const chartData = Object.entries(grouped)
    .map(([date, values]) => ({ date, ...values }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Filtra por rango de tiempo
  // Reemplaza el filteredData por esto:
  const filteredData =
    timeRange === "all"
      ? chartData
      : chartData.filter((item) => {
          const now = new Date();
          const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
          const startDate = new Date(now);
          startDate.setDate(startDate.getDate() - days);
          const startStr = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
          return item.date >= startStr;
        });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Incidencias por fecha</CardTitle>
          <CardDescription>
            Pendientes vs Resueltas en el tiempo
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex">
            <SelectValue placeholder="Últimos 30 días" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Todo el historial</SelectItem>
            <SelectItem value="90d">Últimos 3 meses</SelectItem>
            <SelectItem value="30d">Últimos 30 días</SelectItem>
            <SelectItem value="7d">Últimos 7 días</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPendientes" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pendientes)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pendientes)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillResueltas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-resueltas)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-resueltas)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("es-PE", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("es-PE", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="pendientes"
              type="natural"
              fill="url(#fillPendientes)"
              stroke="var(--color-pendientes)"
              stackId="a"
            />
            <Area
              dataKey="resueltas"
              type="natural"
              fill="url(#fillResueltas)"
              stroke="var(--color-resueltas)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
