
export interface CssExample {
  name: string;
  description: string;
  cssClass: string;
  code: string;
  component: React.ReactNode;
}

export interface AnimationExample {
  name: string;
  description: string;
  cssClass: string;
  code: string;
}

export interface ColorVariable {
  name: string;
  value: string;
  cssVar: string;
  description: string;
}
