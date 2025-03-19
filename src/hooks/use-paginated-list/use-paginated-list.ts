import { useState } from 'react';
import { useFetchData } from '../use-fetch/use-fetch-data.ts';

type SortingOrder = 'asc' | 'desc';

interface IPagination {
    page: number;
    pageSize: number;
}

interface IUsePaginatedListOptions<T> {
    fetchFn: (params: { pagination: IPagination, sorting: SortingOrder, filter: string }) => Promise<T>;
    initialPagination: IPagination;
    initialSorting?: SortingOrder;
    initialFilter?: string;
}

export function usePaginatedList<T>({
                                        fetchFn,
                                        initialPagination,
                                        initialSorting = 'asc',
                                        initialFilter = ''
                                    }: IUsePaginatedListOptions<T>) {
    const [ pagination, setPagination ] = useState<IPagination>(initialPagination);
    const [ sorting, setSorting ] = useState<SortingOrder>(initialSorting);
    const [ filter, setFilter ] = useState<string>(initialFilter);

    const { data, status, error } = useFetchData<T>({
        fetchFn: () => fetchFn({ pagination, sorting, filter }),
        dependencies: [ pagination, sorting, filter ],
    });

    const updatePagination = (updatedPagination: IPagination) => setPagination(updatedPagination);

    const updateSorting = (updatedSorting: SortingOrder) => setSorting(updatedSorting);

    const updateFilter = (updatedFilter: string) => setFilter(updatedFilter);

    const hasNextPage = (totalItems: number): boolean => {
        return pagination.page * pagination.pageSize < totalItems;
    }

    return { data, pagination, status, error, sorting, hasNextPage, updatePagination, updateFilter, updateSorting };
}