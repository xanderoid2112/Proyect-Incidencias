import { AlertCircle, Clock, CheckCircle2, Plus, MessageSquare } from "lucide-react";

const ticketsRecientes = [
  {
    id: "INC-1048",
    titulo: "Pedido demorado en zona centro",
    origen: "Camila Torres - WhatsApp",
    prioridad: "Alta",
    estado: "Abierta",
    tiempo: "Hace 12 min",
  },
  {
    id: "INC-1047",
    titulo: "Producto llego frio",
    origen: "Luis Herrera - Delivery",
    prioridad: "Media",
    estado: "En revision",
    tiempo: "Hace 38 min",
  },
];

export default function IncidenciasPage() {
  return (
    <div className="space-y-6 p-2 max-w-7xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#3e4a24]/85 uppercase">Atencion al cliente</p>
          <h1 className="text-4xl font-serif font-bold text-[#3e4a24] mt-1">Incidencias</h1>
        </div>
        
        {/* Botón con tus colores exactos */}
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3c4a27] hover:bg-[#2d372e] px-4 py-2.5 text-sm font-semibold text-[#f4f7ee] shadow-sm transition-colors">
          <Plus className="h-4 w-4" />
          Crear incidencia
        </button>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Abiertas", val: "2", icon: AlertCircle },
          { label: "En revision", val: "1", icon: Clock },
          { label: "Resueltas", val: "8", icon: CheckCircle2 },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-[#e2e8d5] bg-[#ffffff] p-6 shadow-sm">
            <p className="text-xs font-semibold text-[#3e4a24] uppercase tracking-wider">{item.label}</p>
            <p className="text-3xl font-bold text-[#3e4a24] mt-2">{item.val}</p>
            <div className="mt-4 p-2 bg-[#eff3e7] rounded-xl w-8 h-8 flex items-center justify-center">
              <item.icon className="h-4 w-4 text-[#3e4a24]" />
            </div>
          </div>
        ))}
      </div>

      {/* Tickets Recientes */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#3e4a24]">Tickets recientes</h3>
        <div className="space-y-3">
          {ticketsRecientes.map((ticket) => (
            <div key={ticket.id} className="p-5 bg-[#ffffff] border border-[#e2e8d5] rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <h4 className="text-sm font-bold text-[#3e4a24]">{ticket.titulo}</h4>
                <p className="text-xs text-[#3e4a24]/70">{ticket.origen}</p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Badge con tus colores: #c5d49f fondo y #3e4a24 letra */}
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#c5d49f] text-[#3e4a24]">
                  {ticket.estado}
                </span>
                <button className="p-2 text-[#3e4a24] hover:bg-[#eff3e7] rounded-xl transition-colors">
                  <MessageSquare className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}