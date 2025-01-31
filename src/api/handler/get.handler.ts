import { useQuery } from "@tanstack/react-query";

const url = window.location.href === 'https://left-time.august1.dev/' ? 'https://716nf7z5el.execute-api.eu-west-1.amazonaws.com/dev/v1/time-entries' :'/api/time-entries';

const getTimeEntries = async () => {
  const response = await fetch(url)
  return response.json()
}

export const useTimeEntries = () => {
  return useQuery({
    queryKey: ['time-entries'],
    queryFn: getTimeEntries,
  })
}