
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CssExampleCard } from "@/components/developer/CssExampleCard";
import { ColorPaletteDisplay } from "@/components/developer/ColorPaletteDisplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DeveloperEnhanced() {
  return (
    <DashboardLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-8">Developer Resources</h1>
        
        <ColorPaletteDisplay />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <CssExampleCard
            title="Botones primarios"
            description="Botones con el color principal del sistema"
            cssClass=".btn-primary"
            code={`.btn-primary {
  @apply bg-primary text-primary-foreground 
  hover:bg-primary/90 transition-colors;
}`}
            example={<Button className="btn-primary">Botón Primario</Button>}
          />
          
          <CssExampleCard
            title="Botones secundarios"
            description="Botones con el color secundario del sistema"
            cssClass=".btn-secondary"
            code={`.btn-secondary {
  @apply bg-secondary text-secondary-foreground 
  hover:bg-secondary/90 transition-colors;
}`}
            example={<Button className="btn-secondary">Botón Secundario</Button>}
          />
          
          <CssExampleCard
            title="Botones de acento"
            description="Botones con el color de acento del sistema"
            cssClass=".btn-accent"
            code={`.btn-accent {
  @apply bg-accent text-accent-foreground 
  hover:bg-accent/90 transition-colors;
}`}
            example={<Button className="btn-accent">Botón Acento</Button>}
          />
          
          <CssExampleCard
            title="Badges"
            description="Etiquetas con distintos estilos"
            cssClass=".badge-primary, .badge-secondary, .badge-accent"
            code={`.badge-primary {
  @apply bg-primary/20 text-primary-foreground 
  px-2 py-1 rounded-full text-xs font-medium;
}`}
            example={
              <div className="flex gap-2">
                <Badge className="badge-primary">Primary</Badge>
                <Badge className="badge-secondary">Secondary</Badge>
                <Badge className="badge-accent">Accent</Badge>
              </div>
            }
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
