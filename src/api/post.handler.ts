import { TimeEntries } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const url = "/api/time-entries"

const postTimeEntries = async (body: TimeEntries) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export const usePostTimeEntries = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postTimeEntries,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['time-entries'] })
    }
  })
}