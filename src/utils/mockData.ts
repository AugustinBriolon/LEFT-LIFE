// mockData.ts

const generateTimeLeftData = (year: number, count: number, timeleft: number) => {
  return Array.from({ length: count }, (_, index) => ({
    timeleft,
    date: new Date().toISOString(),
    id: `mock-${year}-${index}`,
    birthdate: `${year}-08-30`,
  }));
};

export const mockChartData = [
  // Années 70
  ...generateTimeLeftData(1970, 5, 2000),
  ...generateTimeLeftData(1972, 3, 1926),
  ...generateTimeLeftData(1975, 4, 2101),
  
  // Années 80
  ...generateTimeLeftData(1980, 7, 2415),
  ...generateTimeLeftData(1984, 6, 2571),
  ...generateTimeLeftData(1985, 5, 2623),
  ...generateTimeLeftData(1989, 5, 2780),
  
  // Années 90
  ...generateTimeLeftData(1990, 8, 2832),
  ...generateTimeLeftData(1995, 10, 3093),
  ...generateTimeLeftData(1999, 7, 3340),
  
  // Années 2000
  ...generateTimeLeftData(2000, 12, 3406),
  ...generateTimeLeftData(2001, 15, 3458),
  ...generateTimeLeftData(2004, 6, 3613),
  ...generateTimeLeftData(2008, 4, 3823),
  
  // Années 2010
  ...generateTimeLeftData(2010, 3, 3928),
  ...generateTimeLeftData(2015, 2, 4193),
  ...generateTimeLeftData(2018, 3, 4345),
];