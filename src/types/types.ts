export interface DateInputs {
  day: string;
  month: string;
  year: string;
}

export interface InputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onKeyUp: () => void;
  maxLength: number;
  className?: string;
}

export interface ChartData {
  month: string;
  desktop: number;
}