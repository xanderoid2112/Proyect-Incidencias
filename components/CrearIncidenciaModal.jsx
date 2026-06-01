'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
export default function CrearIncidenciaModal({ onIncidenciaCreada }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    responsable: '',
    categoria: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.titulo || !formData.descripcion || !formData.responsable || !formData.categoria) {
        toast.error("Todos los campos son obligatorios");
        return;
    }

    try {
        //Aqui se envian datos a la API inicien el proyecto del backend
      const res = await fetch('http://localhost:3001/incidencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setOpen(false); 
        setFormData({ titulo: '', descripcion: '', responsable: '', categoria: '' });
        if(onIncidenciaCreada) onIncidenciaCreada(); 
        toast.success("¡Incidencia creada con éxito!")
      } else {
        toast.error("Hubo un problema al conectar con el backend.")
      }
    } catch (error) {
      console.error("Error al guardar la incidencia", error);
      toast.error("Error de red. ¿El backend está encendido?");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Nueva Incidencia</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Incidencia</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input name="titulo" placeholder="Título de la incidencia" value={formData.titulo} onChange={handleChange} />
          <Input name="descripcion" placeholder="Descripción breve" value={formData.descripcion} onChange={handleChange} />
          <Input name="responsable" placeholder="Responsable asignado" value={formData.responsable} onChange={handleChange} />
          <Input name="categoria" placeholder="Categoría (Ej: Hardware, Redes)" value={formData.categoria} onChange={handleChange} />
          <Button type="submit" className="w-full">Guardar Incidencia</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}