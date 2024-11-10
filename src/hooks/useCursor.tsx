import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";

import useQueryStateParam from "./useQueryStateParam";

interface UseCursorProps {
  url: string;
  filterParams: Record<string, any>;
  fetcher: (key: {
    url: string;
    params: Record<string, string>;
  }) => Promise<any>;
}

const useCursor = ({ url, filterParams, fetcher }: UseCursorProps) => {
  const [pageSize, setPageSize] = useQueryStateParam({
    key: "per_page",
    defaultValue: 25,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [cursors, setCursors] = useState<number[]>([0]);
  const [fetcherLoading, setFetcherLoading] = useState<boolean>(false);

  const pageRef = useRef<number>(0);

  useEffect(() => {
    pageRef.current = currentPage;
  }, [currentPage]);

  const key = {
    url,
    params: {
      ...filterParams,
      per_page: pageSize,
      cursor: cursors[currentPage],
    },
  };

  const lastFetchedFilterParams = useRef<Record<string, any> | null>(null);

  const wrappedFetcher = async (key: any) => {
    let filterParams = { ...key.params };
    delete filterParams.cursor;

    let resetCursor = false;

    for (const [key, value] of Object.entries(
      lastFetchedFilterParams.current ?? {}
    )) {
      if (JSON.stringify(filterParams[key]) !== JSON.stringify(value)) {
        resetCursor = true;
        break;
      }
    }

    if (resetCursor) {
      key.params.cursor = 0;
      setCurrentPage(0);
      setCursors([0]);
    }

    lastFetchedFilterParams.current = filterParams;

    setFetcherLoading(true);
    const response = await fetcher(key);
    setCursors((prev) => {
      const newCursors = [...prev];
      if (response?.meta.next_cursor) {
        newCursors[pageRef.current + 1] = response.meta.next_cursor;
      }
      return newCursors;
    });
    setFetcherLoading(false);
    return response;
  };

  const { data, error, mutate, isLoading } = useSWR(key, wrappedFetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const canFetchNextPage = cursors.length > currentPage + 1 && !error;
  const canFetchPreviousPage = currentPage > 0 && !error;

  const fetchNextPage = useCallback(() => {
    if (cursors[currentPage + 1] !== undefined) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, cursors]);

  const fetchPreviousPage = useCallback(() => {
    if (cursors[currentPage - 1] !== undefined) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, cursors]);

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    data,
    error,
    isLoading: isLoading || fetcherLoading,
    refetch,
    currentPage,
    pageSize,
    setPageSize,
    fetchNextPage: canFetchNextPage ? fetchNextPage : null,
    fetchPreviousPage: canFetchPreviousPage ? fetchPreviousPage : null,
  };
};

export default useCursor;
