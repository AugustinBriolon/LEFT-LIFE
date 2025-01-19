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
  inputRef?: React.RefObject<HTMLInputElement>;
  className?: string;
}

export type ChartType = 'lifeStages' | 'decades' | 'global' | 'quarters';

export interface ChartData {
  month: string;
  desktop: number;
}