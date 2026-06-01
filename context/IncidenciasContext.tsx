"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface Incidencia {
  _id: string;
  titulo: string;
  descripcion: string;
  responsable: string;
  categoria: string;
  estado: "Pendiente" | "En proceso" | "Resuelto";
  fecha: string;
}

interface CtxType {
  incidencias: Incidencia[];
  refetch: () => void;
}

const Ctx = createContext<CtxType>({ incidencias: [], refetch: () => {} });

export function IncidenciasProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);

  const refetch = async () => {
    try {
      const res = await fetch("http://localhost:3001/incidencias");
      const data = await res.json();
      setIncidencias(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/incidencias");
        const data = await res.json();
        setIncidencias(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <Ctx.Provider value={{ incidencias, refetch }}>{children}</Ctx.Provider>
  );
}

export const useIncidencias = () => useContext(Ctx);
