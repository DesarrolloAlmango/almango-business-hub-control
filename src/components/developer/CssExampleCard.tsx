
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CodeDisplay } from "./CodeDisplay";

interface CssExampleCardProps {
  title: string;
  description: string;
  cssClass: string;
  code: string;
  example: React.ReactNode;
}

export const CssExampleCard: React.FC<CssExampleCardProps> = ({
  title,
  description,
  cssClass,
  code,
  example
}) => {
  return (
    <Card className="white-on-black-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="text-xs bg-muted p-1 rounded mt-2 inline-block">{cssClass}</div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 flex items-center justify-center rounded-lg border border-dashed border-white/20 min-h-24">
          {example}
        </div>
        <CodeDisplay code={code} language="css" title="CSS" />
      </CardContent>
    </Card>
  );
};
