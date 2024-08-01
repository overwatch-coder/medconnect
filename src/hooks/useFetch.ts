import { usePostNotification } from "@/lib/post-notification";
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
  notificationData?: {
    title: string;
    description: string;
    type: string;
  };
}

export const useFetch = <TData>({
  queryFn,
  queryKey,
  enabled = true,
  notificationData,
}: IUseFetch<TData>): UseQueryResult<TData, Error> => {
  const { postNotification } = usePostNotification();

  const query = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    enabled: enabled,
    refetchOnWindowFocus: "always",
    refetchInterval: 1000 * 60, // 1 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  if (notificationData) {
    if (query.isSuccess) {
      postNotification(notificationData).then((res) => {
        console.log({ res, in: "useFetch notificationData success" });
      });
    } else {
      postNotification({
        type: `Error: ${notificationData.type}`,
        title: notificationData.title,
        description: (query?.error as any)?.response?.data?.message,
      }).then((res) => {
        console.log({ res, in: "useFetch notificationData error" });
      });
    }
  }

  return query;
};

interface IUseMutateData<TData, TResponse> {
  mutationFn: (data: TData) => Promise<TResponse>;
  config: {
    queryKey?: string[];
    reset?: (values: { [key: string]: any }) => void;
    resetValues?: { [key: string]: any };
  };
  notificationData?: {
    title: string;
    description: string;
    type: string;
  };
}

export const useMutateData = <TData, TResponse = Record<string, unknown>>({
  mutationFn,
  config,
  notificationData,
}: IUseMutateData<TData, TResponse | null>) => {
  const queryClient = useQueryClient();
  const { postNotification } = usePostNotification();

  const mutation = useMutation({
    mutationFn: mutationFn,
    mutationKey: config.queryKey,
    onSuccess: (data: TResponse | null) => {
      // console.log({ data, in: "useMutateData success" });

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

      if (notificationData) {
        postNotification(notificationData).then((res) => {
          console.log({ res, in: "useMutateData notificationData success" });
        });
      }

      return data;
    },
    onError: (err) => {
      if (notificationData) {
        postNotification({
          type: `Error: ${notificationData.type}`,
          description: (err as any)?.response?.data?.message,
          title: notificationData.title,
        }).then((res) => {
          console.log({ res, in: "useMutateData notificationData error" });
        });
      }

      console.log({ err, in: "useMutateData error" });
    },
  });

  return mutation;
};
