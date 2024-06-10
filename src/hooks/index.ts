import { useQuery } from "@tanstack/react-query";

export const useFetchQuery = async (queryKey: string, fetchFn: any) => {
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: fetchFn,
  });

  return query;
};
