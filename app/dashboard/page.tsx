import { ArrowUpRight, Coffee, AlertTriangle, Utensils, CheckSquare } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-2 max-w-7xl mx-auto">
      {/* Cabecera */}
      <div>
        <p className="text-xs font-semibold tracking-wider text-emerald-800/85 uppercase">Panel interno</p>
        <h1 className="text-4xl font-serif font-bold text-stone-800 mt-1">Dashboard</h1>
        <p className="text-sm text-stone-500 mt-1">Resumen operativo de ventas, pedidos y productos para el turno.</p>
      </div>

      {/* Bloque de Tarjetas Principales */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Tarjeta 1 */}
        <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-medium text-stone-500">Ventas de hoy</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-3xl font-bold text-stone-800">S/ 1,248</p>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              +12% <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-stone-400">
            <div className="p-2 bg-stone-50 rounded-xl">
              <Utensils className="h-4 w-4 text-stone-600" />
            </div>
            <p className="text-xs text-stone-500">vs. ayer</p>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-medium text-stone-500">Pedidos activos</p>
          <p className="text-3xl font-bold text-stone-800 mt-2">18</p>
          <div className="mt-4 flex items-center gap-2 text-stone-400">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Coffee className="h-4 w-4 text-amber-700" />
            </div>
            <p className="text-xs text-stone-500">6 en preparacion</p>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-medium text-stone-500">Stock critico</p>
          <p className="text-3xl font-bold text-stone-800 mt-2">3</p>
          <div className="mt-4 flex items-center gap-2 text-stone-400">
            <div className="p-2 bg-rose-50 rounded-xl">
              <AlertTriangle className="h-4 w-4 text-rose-700" />
            </div>
            <p className="text-xs text-stone-500">Revisar inventario</p>
          </div>
        </div>

        {/* Tarjeta 4 */}
        <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-medium text-stone-500">Incidencias</p>
          <p className="text-3xl font-bold text-stone-800 mt-2">4</p>
          <div className="mt-4 flex items-center gap-2 text-stone-400">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <CheckSquare className="h-4 w-4 text-emerald-700" />
            </div>
            <p className="text-xs text-stone-500">2 requieren respuesta</p>
          </div>
        </div>
      </div>

      {/* Dos Columnas Inferiores */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Columna Izquierda Grande: Pedidos Recientes */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-stone-800">Pedidos recientes</h3>
            <p className="text-xs text-stone-500">Flujo de pedidos visibles para cocina y delivery.</p>
          </div>

          <div className="space-y-3">
            {/* Pedido 1 */}
            <div className="p-4 bg-white border border-stone-200/60 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold text-stone-800">Marcia Gomez</h4>
                <p className="text-xs text-stone-500">Latte Macchiato + Cinnamon Roll</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-50 text-stone-600 border border-stone-200">
                  Preparacion
                </span>
                <span className="text-sm font-semibold text-stone-800">S/ 7.50</span>
              </div>
            </div>

            {/* Pedido 2 */}
            <div className="p-4 bg-white border border-stone-200/60 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold text-stone-800">Luis Herrera</h4>
                <p className="text-xs text-stone-500">Cold Brew Vainilla</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-50 text-stone-600 border border-stone-200">
                  Delivery
                </span>
                <span className="text-sm font-semibold text-stone-800">S/ 4.20</span>
              </div>
            </div>

            {/* Pedido 3 */}
            <div className="p-4 bg-white border border-stone-200/60 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold text-stone-800">Camila Torres</h4>
                <p className="text-xs text-stone-500">Capuccino Supremo</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-50 text-stone-600 border border-stone-200">
                  Pendiente
                </span>
                <span className="text-sm font-semibold text-stone-800">S/ 5.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha Chica: Inventario Sensible */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-stone-800">Inventario sensible</h3>
            <p className="text-xs text-stone-500">Productos que conviene reponer durante el día.</p>
          </div>

          <div className="bg-white border border-stone-200/60 rounded-2xl p-4 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-stone-800">Mocha Blanco</h4>
                <p className="text-xs text-stone-400">Especialidades</p>
              </div>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-800 h-6 w-6 rounded-full flex items-center justify-center">8</span>
            </div>

            <div className="flex items-center justify-between border-t pt-3 border-stone-100">
              <div>
                <h4 className="text-sm font-semibold text-stone-800">Cold Brew Vainilla</h4>
                <p className="text-xs text-stone-400">Fríos</p>
              </div>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-800 h-6 w-6 rounded-full flex items-center justify-center">10</span>
            </div>

            <div className="flex items-center justify-between border-t pt-3 border-stone-100">
              <div>
                <h4 className="text-sm font-semibold text-stone-800">Cinnamon Roll</h4>
                <p className="text-xs text-stone-400">Repostería</p>
              </div>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-800 h-6 w-6 rounded-full flex items-center justify-center">10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}