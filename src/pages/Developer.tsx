
import React, { useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CssExampleCard } from "@/components/developer/CssExampleCard";
import { CodeDisplay } from "@/components/developer/CodeDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Developer = () => {
  const [selectedTab, setSelectedTab] = useState("css-classes");

  const cssExamples = [
    {
      title: "Card Highlight",
      description: "Aplica un highlight al borde izquierdo de una tarjeta",
      cssClass: ".card-highlight",
      code: `.card-highlight {
  @apply border-l-4 border-primary transition-all duration-200 hover:shadow-md hover:shadow-primary/20;
}`,
      example: (
        <div className="card-highlight bg-card p-4 rounded-md w-full">
          <p>Tarjeta con highlight</p>
        </div>
      )
    },
    {
      title: "Button Glow",
      description: "Botón con efecto de brillo al pasar el cursor",
      cssClass: ".btn-glow",
      code: `.btn-glow {
  @apply relative overflow-hidden;
}

.btn-glow::after {
  @apply content-[''] absolute -inset-[100%] bg-primary/30 blur-xl opacity-0 transition-opacity duration-500;
}

.btn-glow:hover::after {
  @apply opacity-100;
}`,
      example: (
        <Button className="btn-glow white-on-black-button">
          Botón con Glow
        </Button>
      )
    },
    {
      title: "Gradient Heading",
      description: "Título con gradiente de texto",
      cssClass: ".gradient-heading",
      code: `.gradient-heading {
  @apply bg-gradient-to-r from-white/70 via-white to-white/70 bg-clip-text text-transparent;
}`,
      example: (
        <h2 className="gradient-heading text-2xl font-bold">
          Texto con Gradiente
        </h2>
      )
    },
    {
      title: "White on Black Card",
      description: "Tarjeta con estilo blanco sobre negro",
      cssClass: ".white-on-black-card",
      code: `.white-on-black-card {
  @apply bg-card border border-white/10 shadow-lg shadow-white/5;
}`,
      example: (
        <div className="white-on-black-card p-4 rounded-md w-full">
          <p>Tarjeta White on Black</p>
        </div>
      )
    },
    {
      title: "Glass Panel",
      description: "Panel con efecto de vidrio",
      cssClass: ".glass-panel",
      code: `.glass-panel {
  @apply backdrop-blur-sm bg-white/5 border border-white/10;
}`,
      example: (
        <div className="glass-panel p-4 rounded-md w-full">
          <p>Panel con efecto de vidrio</p>
        </div>
      )
    },
    {
      title: "Subtle Glow",
      description: "Sombra sutil que brilla",
      cssClass: ".subtle-glow",
      code: `.subtle-glow {
  @apply shadow-[0_0_15px_rgba(255,255,255,0.1)];
}`,
      example: (
        <div className="subtle-glow bg-card p-4 rounded-md w-full">
          <p>Elemento con brillo sutil</p>
        </div>
      )
    },
  ];

  const animationExamples = [
    {
      title: "Pulse Glow",
      description: "Animación de pulso con brillo",
      cssClass: ".animate-pulse-glow",
      code: `@keyframes pulse-glow {
  "0%, 100%": { boxShadow: "0 0 5px hsl(var(--primary))" },
  "50%": { boxShadow: "0 0 20px hsl(var(--primary))" },
}

.animate-pulse-glow {
  animation: pulse-glow 2s infinite;
}`,
      example: (
        <div className="animate-pulse-glow bg-card p-4 rounded-md w-32 h-32 flex items-center justify-center">
          Pulse Glow
        </div>
      )
    },
    {
      title: "Slide In Right",
      description: "Animación de entrada desde la derecha",
      cssClass: ".animate-slide-in-right",
      code: `@keyframes slide-in-right {
  "0%": { transform: "translateX(-100%)", opacity: "0" },
  "100%": { transform: "translateX(0)", opacity: "1" },
}

.animate-slide-in-right {
  animation: slide-in-right 0.4s ease-out;
}`,
      example: (
        <div className="animate-slide-in-right bg-card p-4 rounded-md w-full">
          Slide In Right
        </div>
      )
    },
    {
      title: "Text Shimmer",
      description: "Texto con efecto de brillo que se mueve",
      cssClass: ".animate-text-shimmer",
      code: `@keyframes text-shimmer {
  "0%": { backgroundPosition: "200% 0" },
  "100%": { backgroundPosition: "-200% 0" },
}

.animate-text-shimmer {
  animation: text-shimmer 3s ease-in-out infinite;
  background: linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 100%);
  background-size: 200% auto;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`,
      example: (
        <h3 className="text-xl font-bold bg-gradient-to-r from-white/50 via-white to-white/50 bg-clip-text text-transparent bg-[size:200%] animate-text-shimmer">
          Texto con Shimmer
        </h3>
      )
    },
    {
      title: "Subtle Float",
      description: "Animación de flotación sutil",
      cssClass: ".animate-subtle-float",
      code: `@keyframes subtle-float {
  "0%, 100%": { transform: "translateY(0px)" },
  "50%": { transform: "translateY(-5px)" },
}

.animate-subtle-float {
  animation: subtle-float 3s ease-in-out infinite;
}`,
      example: (
        <div className="animate-subtle-float bg-card p-4 rounded-md w-32 h-32 flex items-center justify-center">
          Flotando
        </div>
      )
    },
    {
      title: "Fade In",
      description: "Animación de aparición gradual",
      cssClass: ".animate-fade-in",
      code: `@keyframes fade-in {
  "0%": { opacity: "0" },
  "100%": { opacity: "1" },
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}`,
      example: (
        <div className="animate-fade-in bg-card p-4 rounded-md w-full">
          Fade In
        </div>
      )
    },
  ];

  const colors = [
    { name: "Background", value: "hsl(0 0% 0%)", cssVar: "--background", description: "Fondo principal" },
    { name: "Foreground", value: "hsl(0 0% 100%)", cssVar: "--foreground", description: "Texto principal" },
    { name: "Card", value: "hsl(0 0% 10%)", cssVar: "--card", description: "Fondo de tarjetas" },
    { name: "Primary", value: "hsl(0 0% 100%)", cssVar: "--primary", description: "Color principal (blanco)" },
    { name: "Secondary", value: "hsl(0 0% 80%)", cssVar: "--secondary", description: "Color secundario (gris claro)" },
    { name: "Muted", value: "hsl(0 0% 15%)", cssVar: "--muted", description: "Color atenuado" },
    { name: "Accent", value: "hsl(0 0% 25%)", cssVar: "--accent", description: "Color de acento" },
    { name: "Destructive", value: "hsl(0 100% 50%)", cssVar: "--destructive", description: "Color para errores" },
  ];

  const cssVariablesCode = `
:root {
  /* Background colors */
  --background: 0 0% 0%; /* Pure black background */
  --foreground: 0 0% 100%; /* Pure white text */
  --card: 0 0% 10%; /* Dark gray cards */
  --card-foreground: 0 0% 100%;
  
  /* Primary colors */
  --primary: 0 0% 100%; /* White primary */
  --primary-foreground: 0 0% 0%; /* Black text on primary */
  
  /* Secondary colors */
  --secondary: 0 0% 80%; /* Light gray */
  --secondary-foreground: 0 0% 0%;
  
  /* Muted colors */
  --muted: 0 0% 15%; /* Dark gray */
  --muted-foreground: 0 0% 70%;
  
  /* Accent colors */
  --accent: 0 0% 25%; /* Medium gray accent */
  --accent-foreground: 0 0% 100%;
  
  /* Destructive colors */
  --destructive: 0 100% 50%; /* Red for error states */
  --destructive-foreground: 0 0% 100%;
  
  /* UI element colors */
  --border: 0 0% 20%; /* Dark border */
  --input: 0 0% 15%;
  --ring: 0 0% 80%;
  
  /* Sidebar specific colors */
  --sidebar-background: 0 0% 5%; /* Near black */
  --sidebar-foreground: 0 0% 100%;
  --sidebar-primary: 0 0% 100%;
  --sidebar-accent: 0 0% 80%;
}`;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Portal de Desarrollador</h1>
          <p className="text-muted-foreground mt-2">
            Explora y utiliza componentes CSS, animaciones y variables disponibles en la aplicación
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent mb-4 overflow-x-auto">
            <TabsTrigger value="css-classes" className="data-[state=active]:bg-muted">
              Clases CSS
            </TabsTrigger>
            <TabsTrigger value="animations" className="data-[state=active]:bg-muted">
              Animaciones
            </TabsTrigger>
            <TabsTrigger value="colors" className="data-[state=active]:bg-muted">
              Colores
            </TabsTrigger>
            <TabsTrigger value="variables" className="data-[state=active]:bg-muted">
              Variables CSS
            </TabsTrigger>
            <TabsTrigger value="tailwind" className="data-[state=active]:bg-muted">
              Configuración Tailwind
            </TabsTrigger>
          </TabsList>

          <TabsContent value="css-classes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cssExamples.map((example, index) => (
                <CssExampleCard
                  key={index}
                  title={example.title}
                  description={example.description}
                  cssClass={example.cssClass}
                  code={example.code}
                  example={example.example}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="animations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {animationExamples.map((animation, index) => (
                <CssExampleCard
                  key={index}
                  title={animation.title}
                  description={animation.description}
                  cssClass={animation.cssClass}
                  code={animation.code}
                  example={animation.example}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {colors.map((color, index) => (
                <Card key={index} className="white-on-black-card overflow-hidden">
                  <div 
                    className="h-16 w-full" 
                    style={{ backgroundColor: color.value }}
                  />
                  <CardHeader className="py-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      {color.name}
                      <Badge variant="outline" className="ml-2 font-mono text-xs">
                        {color.cssVar}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-xs text-muted-foreground">{color.description}</p>
                    <p className="text-xs font-mono mt-1">{color.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="variables" className="space-y-4">
            <Card className="white-on-black-card">
              <CardHeader>
                <CardTitle>Variables CSS</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Definiciones de variables CSS para el tema White on Black
                </p>
              </CardHeader>
              <CardContent>
                <CodeDisplay 
                  code={cssVariablesCode} 
                  language="css" 
                  title="src/styles/variables.css" 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tailwind" className="space-y-4">
            <Card className="white-on-black-card">
              <CardHeader>
                <CardTitle>Configuración de Tailwind</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Configuración de Tailwind CSS con las extensiones personalizadas
                </p>
              </CardHeader>
              <CardContent>
                <CodeDisplay 
                  code={`// Extracto de tailwind.config.ts
extend: {
  colors: {
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    primary: {
      DEFAULT: "hsl(var(--primary))",
      foreground: "hsl(var(--primary-foreground))",
    },
    secondary: {
      DEFAULT: "hsl(var(--secondary))",
      foreground: "hsl(var(--secondary-foreground))",
    },
    // ... más colores
  },
  keyframes: {
    "pulse-glow": {
      "0%, 100%": { boxShadow: "0 0 5px hsl(var(--primary))" },
      "50%": { boxShadow: "0 0 20px hsl(var(--primary))" },
    },
    "slide-in-right": {
      "0%": { transform: "translateX(-100%)", opacity: "0" },
      "100%": { transform: "translateX(0)", opacity: "1" },
    },
    // ... más keyframes
  },
  animation: {
    "pulse-glow": "pulse-glow 2s infinite",
    "slide-in-right": "slide-in-right 0.4s ease-out",
    // ... más animaciones
  },
  backgroundImage: {
    "dashboard-gradient": "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)",
    "white-noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
  },
}`} 
                  language="js" 
                  title="tailwind.config.ts" 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Developer;
