import { TimeEntries } from "./api.types";

export interface ChartData {
  name: string;
  decade: string;
  nombre: number;
  semaines: number[];
  annees: number[];
}

export interface DecadeGroup {
  count: number;
  semaines: number[];
  annees: number[];
}

export interface ChartProps {
  data: TimeEntries[];
  isLoading: boolean;
  isError: boolean;
  userTimeLeft: number;
}

export interface SkeletonData {
  name: string;
  nombre: number;
  semaines: number[];
  annees: number[];
  decade: string;
}

export interface LoadingChartProps {
  skeletonData: SkeletonData[];
}

export interface TooltipContentProps {
  active?: boolean;
  payload?: Array<{
    payload?: ChartData;
    value?: number;
  }>;
}