import { useQuery } from '@tanstack/react-query';
import { api } from '../client';

export const useTimeEntries = () => {
  return useQuery({
    queryKey: ['time-entries'],
    queryFn: api.getTimeEntries,
  });
};
