import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { ChartConfig, ChartContainer } from './ui/chart';

interface ChartProps {
  desktop: number;
  mobile: number;
  texte: string;
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function Chart({ desktop, mobile, texte }: ChartProps) {
  const chartData = {
    desktop,
    mobile,
  };

  return (
    <ChartContainer className='aspect-square w-[250px]' config={chartConfig}>
      <RadialBarChart
        data={[chartData]}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <PolarRadiusAxis axisLine={false} tick={false} tickLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text textAnchor='middle' x={viewBox.cx} y={viewBox.cy}>
                    <tspan
                      className='fill-foreground text-2xl font-bold'
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                    >
                      {chartData.desktop}
                    </tspan>
                    <tspan
                      className='fill-muted-foreground'
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                    >
                      Semaine {texte}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          className='stroke-transparent stroke-2'
          cornerRadius={5}
          dataKey='desktop'
          fill='var(--color-desktop)'
          stackId='a'
        />
        <RadialBar
          className='stroke-transparent stroke-2'
          cornerRadius={5}
          dataKey='mobile'
          fill='var(--color-mobile)'
          stackId='a'
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
