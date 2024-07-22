import {
  useQuery,
  useQueryClient,
  UseQueryResult,
  useMutation,
} from "@tanstack/react-query";

interface IUseFetch<TData> {
  queryFn: () => Promise<TData>;
  queryKey: string[];
  enabled?: boolean; // Optional flag to enable/disable query fetching
}

export const useFetch = <TData>({
  queryFn,
  queryKey,
  enabled = true,
}: IUseFetch<TData>): UseQueryResult<TData, Error> => {
  const query = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    enabled: enabled,
    refetchOnWindowFocus: "always",
    refetchInterval: 1000 * 60, // 1 minutes
    staleTime: 1000 * 60, // 1 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  return query;
};

interface IUseMutateData<TData, TResponse> {
  mutationFn: (data: TData) => Promise<TResponse>;
  config: {
    queryKey?: string[];
    reset?: (values: { [key: string]: any }) => void;
    resetValues?: { [key: string]: any };
  };
}

export const useMutateData = <TData, TResponse = Record<string, unknown>>({
  mutationFn,
  config,
}: IUseMutateData<TData, TResponse | null>) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: mutationFn,
    mutationKey: config.queryKey,
    onSuccess: (data: TResponse | null) => {
      console.log({ data, in: "useMutateData success" });

      if (config.reset) {
        config.reset({});
      }

      // Invalidate relevant queries after mutation success
      if (config.queryKey) {
        queryClient.invalidateQueries({
          queryKey: config.queryKey,
        });
      }

      queryClient.refetchQueries({ type: "all" });

      return data;
    },
    onError: (err) => {
      console.log({ err, in: "useMutateData error" });
    },
  });

  return mutation;
};
