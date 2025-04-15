
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Tooltip
} from "recharts";
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, PieChart as PieChartIcon, BarChart2 } from "lucide-react";

// Sample data for economic charts
const monthlyRevenue = [
  { name: "Ene", value: 18000 },
  { name: "Feb", value: 22000 },
  { name: "Mar", value: 26000 },
  { name: "Abr", value: 32000 },
  { name: "May", value: 28000 },
  { name: "Jun", value: 35000 },
  { name: "Jul", value: 40000 },
  { name: "Ago", value: 45000 },
  { name: "Sep", value: 50000 },
  { name: "Oct", value: 48000 },
  { name: "Nov", value: 52000 },
  { name: "Dic", value: 58000 },
];

const servicesByCategory = [
  { name: "Eléctricos", value: 35 },
  { name: "Plomería", value: 25 },
  { name: "IT", value: 20 },
  { name: "Aire Acond.", value: 15 },
  { name: "Otros", value: 5 },
];

const serviceStatusData = [
  { name: "Completados", value: 65 },
  { name: "En Progreso", value: 25 },
  { name: "Pendientes", value: 8 },
  { name: "Cancelados", value: 2 },
];

const revenueByClient = [
  { name: "Corporativos", value: 45000 },
  { name: "Pymes", value: 30000 },
  { name: "Residencial", value: 15000 },
  { name: "Gobierno", value: 10000 },
];

const monthlyServices = [
  { name: "Ene", completados: 45, pendientes: 10, cancelados: 2 },
  { name: "Feb", completados: 50, pendientes: 12, cancelados: 3 },
  { name: "Mar", completados: 60, pendientes: 15, cancelados: 2 },
  { name: "Abr", completados: 70, pendientes: 20, cancelados: 5 },
  { name: "May", completados: 65, pendientes: 18, cancelados: 4 },
  { name: "Jun", completados: 80, pendientes: 22, cancelados: 3 },
];

// Colors for charts
const COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  muted: "hsl(var(--muted))",
  destructive: "hsl(var(--destructive))",
  yellow: "#EAB308",
  purple: "#8B5CF6"
};

// Pie chart custom colors
const PIECHART_COLORS = [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.purple];

export function EconomicSummary() {
  // Calculate totals for summary cards
  const totalRevenue = monthlyRevenue.reduce((sum, item) => sum + item.value, 0);
  const lastMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1].value;
  const prevMonthRevenue = monthlyRevenue[monthlyRevenue.length - 2].value;
  const growthPercentage = ((lastMonthRevenue - prevMonthRevenue) / prevMonthRevenue * 100).toFixed(1);
  
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Resumen Económico</CardTitle>
        <CardDescription>Análisis financiero de servicios y ganancias</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Summary stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ingresos Totales</p>
                  <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12.5%</span>
                <span className="text-muted-foreground ml-1">vs mes anterior</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Servicios Completados</p>
                  <p className="text-2xl font-bold">287</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+8.7%</span>
                <span className="text-muted-foreground ml-1">este trimestre</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ingresos Mensuales</p>
                  <p className="text-2xl font-bold">${lastMonthRevenue.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <BarChart2 className="h-5 w-5 text-accent" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+{growthPercentage}%</span>
                <span className="text-muted-foreground ml-1">vs mes anterior</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Promedio</p>
                  <p className="text-2xl font-bold">$1,250</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <PieChartIcon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">-2.3%</span>
                <span className="text-muted-foreground ml-1">vs trimestre anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts section */}
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="revenue">Ingresos</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Ingresos Mensuales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        revenue: {
                          label: "Ingresos",
                          theme: {
                            light: COLORS.primary,
                            dark: COLORS.primary,
                          },
                        },
                      }}
                    >
                      <AreaChart data={monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Mes
                                      </span>
                                      <span className="font-bold text-xs">
                                        {payload[0].payload.name}
                                      </span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Ingresos
                                      </span>
                                      <span className="font-bold text-xs">
                                        ${payload[0].value.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          name="revenue"
                          stroke={COLORS.primary} 
                          fill={COLORS.primary} 
                          fillOpacity={0.2} 
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Distribución por Categoría</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={servicesByCategory}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill={COLORS.primary}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {servicesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIECHART_COLORS[index % PIECHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Porcentaje']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            borderColor: 'hsl(var(--border))'
                          }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Servicios Mensuales por Estado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyServices}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            borderColor: 'hsl(var(--border))'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="completados" name="Completados" fill={COLORS.primary} />
                        <Bar dataKey="pendientes" name="Pendientes" fill={COLORS.yellow} />
                        <Bar dataKey="cancelados" name="Cancelados" fill={COLORS.destructive} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Estado de Servicios</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill={COLORS.primary}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill={COLORS.primary} />
                          <Cell fill={COLORS.secondary} />
                          <Cell fill={COLORS.yellow} />
                          <Cell fill={COLORS.destructive} />
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Porcentaje']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            borderColor: 'hsl(var(--border))'
                          }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="clients" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ingresos por Tipo de Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueByClient} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                        <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, 'Ingresos']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            borderColor: 'hsl(var(--border))'
                          }}
                        />
                        <Bar dataKey="value" fill={COLORS.accent} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tendencia de Satisfacción</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={[
                          { month: "Ene", rating: 4.2 },
                          { month: "Feb", rating: 4.3 },
                          { month: "Mar", rating: 4.1 },
                          { month: "Abr", rating: 4.4 },
                          { month: "May", rating: 4.5 },
                          { month: "Jun", rating: 4.7 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis domain={[3.5, 5]} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          formatter={(value) => [`${value}/5`, 'Calificación']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            borderColor: 'hsl(var(--border))'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="rating" 
                          stroke={COLORS.primary} 
                          strokeWidth={2}
                          dot={{ fill: COLORS.primary, r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        Datos actualizados: {new Date().toLocaleDateString()} - Los datos mostrados son representativos.
      </CardFooter>
    </Card>
  );
}
