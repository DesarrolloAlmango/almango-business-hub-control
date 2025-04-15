
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ColorSampleProps {
  name: string;
  variable: string;
  hexColor: string;
}

const ColorSample: React.FC<ColorSampleProps> = ({ name, variable, hexColor }) => {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div 
        className="w-10 h-10 rounded-full border border-border" 
        style={{ backgroundColor: hexColor }}
      />
      <div>
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">var(--{variable})</p>
      </div>
      <div className="ml-auto">
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{hexColor}</code>
      </div>
    </div>
  );
};

export const ColorPaletteDisplay: React.FC = () => {
  return (
    <Card className="white-on-black-card">
      <CardHeader>
        <CardTitle>Color Palette</CardTitle>
        <p className="text-sm text-muted-foreground">
          Paleta de colores utilizada en la aplicación
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Colores principales</h3>
          <ColorSample name="Naranja (Primary)" variable="primary" hexColor="#e47911" />
          <ColorSample name="Azul verdoso (Secondary)" variable="secondary" hexColor="#48a3c6" />
          <ColorSample name="Azul (Accent)" variable="accent" hexColor="#007eb9" />
          <ColorSample name="Negro" variable="black" hexColor="#111111" />
          <ColorSample name="Azul oscuro (Navy)" variable="navy" hexColor="#232f3e" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">UI Elements</h3>
          <ColorSample name="Background" variable="background" hexColor={
            document.documentElement.classList.contains('light-mode') 
              ? "#ffffff" 
              : "#000000"
          } />
          <ColorSample name="Foreground" variable="foreground" hexColor={
            document.documentElement.classList.contains('light-mode') 
              ? "#111111" 
              : "#ffffff"
          } />
          <ColorSample name="Card" variable="card" hexColor={
            document.documentElement.classList.contains('light-mode') 
              ? "#f8f8f8" 
              : "#1a1a1a"
          } />
          <ColorSample name="Border" variable="border" hexColor={
            document.documentElement.classList.contains('light-mode') 
              ? "#cccccc" 
              : "#232f3e"
          } />
          <ColorSample name="Muted" variable="muted" hexColor={
            document.documentElement.classList.contains('light-mode') 
              ? "#f5f5f5" 
              : "#262626"
          } />
        </div>
      </CardContent>
    </Card>
  );
};
