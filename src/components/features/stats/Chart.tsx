import { memo, useMemo } from 'react';
import { ChartContainer, ChartTooltip } from '@/components/common/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine } from 'recharts';
import { mockChartData } from '@/utils/mockData';

interface TimeLeftData {
  timeleft: number;
  birthdate?: string;
}

interface ChartProps {
  data: TimeLeftData[];
  isLoading: boolean;
  isError: boolean;
  userTimeLeft: number;
}

const Chart = memo(({ data, isLoading, isError, userTimeLeft }: ChartProps) => {
  const dataToUse = useMemo(() => {
    return isError ? mockChartData : data;
  }, [data, isError]);

  const processedData = useMemo(() => {
    if (!dataToUse?.length) return [];

    const decadeGroups = dataToUse.reduce(
      (acc, curr) => {
        if (!curr.birthdate) return acc;

        const year = new Date(curr.birthdate).getFullYear();
        const decade = Math.floor(year / 10) * 10;
        const decadeKey = `${decade}s`;

        if (!acc[decadeKey]) {
          acc[decadeKey] = {
            count: 0,
            semaines: [],
            annees: [],
          };
        }

        acc[decadeKey].count++;
        acc[decadeKey].semaines.push(curr.timeleft);
        acc[decadeKey].annees.push(Math.round(curr.timeleft / 52));

        return acc;
      },
      {} as Record<string, { count: number; semaines: number[]; annees: number[] }>,
    );

    return Object.entries(decadeGroups)
      .map(([decade, info]) => ({
        name: `${decade}`,
        decade,
        nombre: info.count,
        semaines: info.semaines,
        annees: info.annees,
      }))
      .sort((a, b) => parseInt(a.decade) - parseInt(b.decade));
  }, [dataToUse]);

  const skeletonData = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      name: `${1970 + i * 10}s`,
      nombre: Math.random() * 10,
      semaines: [],
      annees: [],
      decade: '',
    }));
  }, []);

  const userGroup = useMemo(() => {
    const userEntry = dataToUse.find(entry => entry.timeleft === userTimeLeft);
    if (!userEntry?.birthdate) return null;
    const birthYear = new Date(userEntry.birthdate).getFullYear();
    const userDecade = `${Math.floor(birthYear / 10) * 10}s`;
    return processedData.find(group => group.name === userDecade);
  }, [dataToUse, userTimeLeft, processedData]);
  

  if (isLoading) {
    return <LoadingChart skeletonData={skeletonData} />;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {isError
          ? 'Distribution des utilisateurs par décennie (données de démonstration)'
          : 'Distribution des utilisateurs par décennie'}
      </h3>
      <ChartContainer
        className="h-[300px] w-full"
        config={{
          distribution: {
            theme: {
              light: '#FFFFFF',
              dark: '#FFFFFF',
            },
            label: "Nombre d'utilisateurs",
          },
        }}
      >
        <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
          <CartesianGrid className="stroke-white/10" strokeDasharray="3 3" />
          <XAxis
            className="text-sm font-medium text-white/80"
            dataKey="name"
            label={{
              value: 'Décennie',
              position: 'bottom',
              offset: 20,
              className: 'fill-white/80',
            }}
          />
          <YAxis
            className="text-sm font-medium text-white/80"
            label={{
              value: "Nombre d'utilisateurs",
              angle: -90,
              position: 'insideLeft',
              className: 'fill-white/80',
            }}
          />
          <ChartTooltip content={renderTooltip(isError)} />
          <Bar className="fill-white/80" dataKey="nombre" />
          {userGroup && (
            <ReferenceLine
              stroke="#FFFFFF"
              strokeWidth={2}
              x={userGroup.name}
              label={{
                value: 'Vous',
                position: 'top',
                className: 'fill-white font-medium',
              }}
            />
          )}
        </BarChart>
      </ChartContainer>
    </div>
  );
});

// Composant pour l'état de chargement
const LoadingChart = ({ skeletonData }: { skeletonData: any[] }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Distribution des utilisateurs par décennie</h3>
    <ChartContainer
      className="h-[300px] w-full"
      config={{
        distribution: {
          theme: {
            light: '#FFFFFF',
            dark: '#FFFFFF',
          },
          label: "Nombre d'utilisateurs",
        },
      }}
    >
      <BarChart data={skeletonData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
        <CartesianGrid className="stroke-white/5" strokeDasharray="3 3" />
        <XAxis
          className="text-sm font-medium text-white/20"
          dataKey="name"
          label={{
            value: 'Décennie',
            position: 'bottom',
            offset: 20,
            className: 'fill-white/20',
          }}
        />
        <YAxis
          className="text-sm font-medium text-white/20"
          label={{
            value: "Nombre d'utilisateurs",
            angle: -90,
            position: 'insideLeft',
            className: 'fill-white/20',
          }}
        />
        <Bar className="animate-pulse fill-white/10" dataKey="nombre" />
      </BarChart>
    </ChartContainer>
  </div>
);

// Fonction de rendu du tooltip
const renderTooltip = (isError: boolean) => {
  return ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (!active || !payload?.[0]) return null;

    const value = Number(payload[0].value);
    const isValidNumber = !Number.isNaN(value);
    const avgYearsLeft =
      payload[0].payload.annees.reduce((a: number, b: number) => a + b, 0) / value;

    return (
      <div className="rounded-md bg-zinc-900 p-2 text-white shadow-xl ring-1 ring-white/20">
        <p className="mb-1 font-medium">Décennie : {payload[0].payload.name}</p>
        {isValidNumber && (
          <p className="text-sm text-white/80">
            {value} utilisateur{value > 1 ? 's' : ''}
          </p>
        )}
        <p className="text-sm text-white/60">
          Moyenne d&apos;années restantes : {Math.round(avgYearsLeft)}
        </p>
        {isError && <p className="mt-1 text-xs text-white/40">Données de démonstration</p>}
      </div>
    );
  };
};

export default Chart;