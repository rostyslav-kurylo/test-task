import { useEffect, useRef, useState } from 'react';
import { BehaviorSubject, catchError, of, retry, Subject, switchMap, takeUntil } from 'rxjs';

type FetchStatus = 'initializing' | 'loading' | 'success' | 'error';

interface IUseFetchOptions<T> {
    fetchFn: () => Promise<T>;
    dependencies?: unknown[];
    retryCount?: number;
    retryDelay?: number;
}

export function useFetchData<T>({
                                    fetchFn,
                                    dependencies = [],
                                    retryCount = 0,
                                    retryDelay = 1000
                                }: IUseFetchOptions<T>) {
    const [ data, setData ] = useState<T | null>(null);
    const [ error, setError ] = useState<Error | null>(null);
    const [ status, setStatus ] = useState<FetchStatus>('initializing');

    const fetchTrigger$ = useRef(new BehaviorSubject<void>(undefined));
    const cancelTrigger$ = useRef(new Subject<void>());

    const fetchData = (): void => {
        fetchTrigger$.current.next();
    }

    const cancelData = (): void => {
        cancelTrigger$.current.next();
        setStatus('initializing');
    }

    useEffect(() => {
        const subscription = fetchTrigger$.current
            .pipe(
                switchMap(() => {
                    setStatus('loading');
                    return of(null).pipe(
                        switchMap(() => fetchFn()),
                        retry({ count: retryCount, delay: retryDelay }),
                        catchError((error) => {
                            setError(error);
                            setStatus('error');
                            return of(null);
                        }),
                        takeUntil(cancelTrigger$.current)
                    );
                })
            )
            .subscribe((response) => {
                if (response !== null) {
                    setData(response);
                    setStatus('success');
                    setError(null);
                }
            });

        return () => {
            subscription.unsubscribe();
        }
    }, dependencies);

    return {
        data,
        status,
        error,
        refetch: () => fetchData(),
        cancel: () => cancelData()
    }
}
