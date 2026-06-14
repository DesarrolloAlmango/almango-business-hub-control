import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Filter, X } from 'lucide-react'
import { useState } from 'react'

interface SubastaFiltersProps {
  onApplyFilters: (filtros: any) => void
  onClearFilters: () => void
}

export function SubastaFilters({
  onApplyFilters,
  onClearFilters,
}: SubastaFiltersProps) {
  const [filtros, setFiltros] = useState({
    ubicacion: 'todas',
    rubro: 'todos',
    fecha_desde: '',
    fecha_hasta: '',
  })
  const handleInputChange = (field: string, value: string) => {
    setFiltros((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleClearFilters = () => {
    setFiltros({
      ubicacion: 'todas',
      rubro: '',
      fecha_desde: '',
      fecha_hasta: '',
    })
    onClearFilters()
  }
  return (
    <div className='space-y-2 px-2 w-full max-w-screen overflow-x-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='ubicacion'>Ubicación</Label>
          <Select
            value={filtros.ubicacion}
            onValueChange={(value) => handleInputChange('ubicacion', value)}
          >
            <SelectTrigger id='ubicacion'>
              <SelectValue placeholder='Seleccionar ubicación' />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value='todas'>Todas las ubicaciones</SelectItem>
              <SelectItem value='montevideo'>Montevideo</SelectItem>
              <SelectItem value='canelones'>Canelones</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='rubro'>Rubro</Label>
          <Select
            value={filtros.rubro}
            onValueChange={(value) => handleInputChange('rubro', value)}
          >
            <SelectTrigger id='rubro'>
              <SelectValue placeholder='Rubro principal' />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value='todos'>Todos</SelectItem>
              <SelectItem value='construccion'>Construcción</SelectItem>
              <SelectItem value='servicios'>Servicios</SelectItem>
              <SelectItem value='otros'>Otros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='fecha_desde'>Fecha Desde</Label>
          <Input
            id='fecha_desde'
            type='date'
            value={filtros.fecha_desde}
            onChange={(e) => handleInputChange('fecha_desde', e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='fecha_hasta'>Fecha Hasta</Label>
          <Input
            id='fecha_hasta'
            type='date'
            value={filtros.fecha_hasta}
            onChange={(e) => handleInputChange('fecha_hasta', e.target.value)}
          />
        </div>
      </div>

      <div className='flex justify-between pt-2'>
        <Button
          variant='outline'
          type='button'
          className='flex items-center gap-2'
          onClick={handleClearFilters}
        >
          <X className='h-4 w-4' />
          Limpiar Filtros
        </Button>

        <Button
          type='button'
          className='flex items-center gap-2'
          onClick={() => onApplyFilters(filtros)}
        >
          <Filter className='h-4 w-4' />
          Aplicar Filtros
        </Button>
      </div>
    </div>
  )
}
