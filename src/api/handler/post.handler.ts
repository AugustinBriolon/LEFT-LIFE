import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../client';

export const usePostTimeEntries = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.postTimeEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['time-entries'] });
    },
  });
};