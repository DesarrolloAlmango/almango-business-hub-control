
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check, Eye, EyeOff } from "lucide-react";
import { toast } from '@/hooks/use-toast';

interface CodeDisplayProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ 
  code, 
  language = "css", 
  title 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      toast({
        title: "Copiado al portapapeles",
        description: "El código ha sido copiado correctamente",
      });
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="white-on-black-card rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-muted">
        {title && <h3 className="text-sm font-medium">{title}</h3>}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVisibility}
            className="h-8 w-8"
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="h-8 w-8"
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </div>
      </div>
      {isVisible && (
        <pre className="p-4 overflow-x-auto text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      )}
    </div>
  );
};
