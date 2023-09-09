import useSWR from 'swr';
import type { SWRResponse } from 'swr';

interface Response<T> extends SWRResponse {
  data: T | undefined;
}

export default function useFetchItem<T>({
  route,
  id,
}: {
  route: string;
  id?: string;
}): Response<T> {
  const { data, error, isValidating, mutate } = useSWR<T>(
    id ? `${route}/${id}` : null,
  );
  return {
    data: undefined,
    isLoading: false,
    error: null,
    isValidating: false,
    mutate: async () => undefined,
  };
}
