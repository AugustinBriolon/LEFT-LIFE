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
    <ChartContainer config={chartConfig} className='aspect-square w-[250px]'>
      <RadialBarChart
        data={[chartData]}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle'>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className='fill-foreground text-2xl font-bold'
                    >
                      {chartData.desktop}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className='fill-muted-foreground'
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
          dataKey='desktop'
          stackId='a'
          cornerRadius={5}
          fill='var(--color-desktop)'
          className='stroke-transparent stroke-2'
        />
        <RadialBar
          dataKey='mobile'
          fill='var(--color-mobile)'
          stackId='a'
          cornerRadius={5}
          className='stroke-transparent stroke-2'
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
