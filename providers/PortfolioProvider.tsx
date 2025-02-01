
import { useFetch } from '@/hooks/useFetch';
import { useTickerFilter } from '@/hooks/useTickerFilter';
import { Portfolio } from '@/types';
import React, { createContext, useContext } from 'react';

interface PortfolioContextType {
    data: Portfolio[] | null;
    loading: boolean;
    error: string | null;
    fetchPortfolio: () => void;
    filterByTicker: (tiker: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data, loading, error, fetch } = useFetch<Portfolio[]>();
    const fetchTiker = useTickerFilter()
    const fetchPortfolio = async () => fetch('https://dummy-api-topaz.vercel.app/portfolio');
    const filterByTicker = (tiker: string) => fetchTiker.fetch(tiker.toUpperCase())
    const filteredData = fetchTiker.getFiltered(data)

    React.useEffect(() => { fetchPortfolio() }, [])

    const isLoading = loading || fetchTiker.loading

    return (
        <PortfolioContext.Provider
            value={{
                data: filteredData,
                loading: isLoading,
                error,
                fetchPortfolio,
                filterByTicker
            }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) throw new Error('usePortfolio must be used within an PortfolioProvider');
    return context;
};
