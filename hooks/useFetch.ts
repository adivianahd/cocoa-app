import { useState } from 'react';

export const useFetch = <T>() => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const _fetch = async (url: string, options?: RequestInit) => {
        if (!url) return;
        setLoading(true);
        setError(null);
        const startTime = Date.now();
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(response.statusText);
            const result = await response.json();
            const elapsedTime = Date.now() - startTime;
            const minLoaderTime = 600;
            if (elapsedTime < minLoaderTime) {
                await new Promise(resolve => setTimeout(resolve, minLoaderTime - elapsedTime));
            }
            setData(result);
        } catch (err: any) {
            setError(err?.message || err || 'Uknown Error');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetch: _fetch };
};