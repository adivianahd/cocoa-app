
import { useFetch } from '@/hooks/useFetch';
import { Instrument } from '@/types';


export function useTickerFilter() {
    const { data, loading, error, fetch } = useFetch<Instrument[]>();
    const fetchTiker = async (tiker: string) => fetch(`https://dummy-api-topaz.vercel.app/search?query=${tiker}`);
    const getFiltered = (actives: Pick<Instrument, 'ticker'>[] | null) => {
        if (data == null) return actives
        return actives?.filter(active =>
            data?.some((tiker: Instrument) => tiker.ticker === active.ticker)) as any
    }

    return { data, loading, error, getFiltered, fetch: fetchTiker }
}