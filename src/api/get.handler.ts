import { useQuery } from "@tanstack/react-query";

const url = "/api/time-entries"

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