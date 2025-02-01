
import { useFetch } from '@/hooks/useFetch';
import { useTickerFilter } from '@/hooks/useTickerFilter';
import { Instrument, OrderBody, OrderResponse } from '@/types';
import React, { createContext, useContext } from 'react';
import { Toast } from "toastify-react-native";

interface InstrumentsContextType {
    data: Instrument[] | null;
    loading: boolean;
    error: string | null;
    fetchInstruments: () => void;
    filterByTicker: (ticker: string) => void;
    createOrder: (order: OrderBody) => void;
}

const InstrumentsContext = createContext<InstrumentsContextType | undefined>(undefined);

export const InstrumentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data, loading, error, fetch } = useFetch<Instrument[]>();
    const postOrder = useFetch<OrderResponse>();
    const fetchTiker = useTickerFilter()
    const filterByTicker = (tiker: string) => fetchTiker.fetch(tiker.toUpperCase())
    const fetchInstruments = async () => fetch('https://dummy-api-topaz.vercel.app/instruments');
    const createOrder = async (order: OrderBody) => {
        postOrder.fetch('https://dummy-api-topaz.vercel.app/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });
    }
    const filteredData = fetchTiker.getFiltered(data)

    React.useEffect(() => { fetchInstruments() }, [])
    React.useEffect(() => {
        if (!postOrder.data) return
        if (!postOrder.data.status) return
        const dictionaryToast = {
            FILLED: () => Toast.success(`Transaction is Filled! ID:${postOrder.data?.id}`),
            PENDING: () => Toast.warn(`Transaction is Pending! ID:${postOrder.data?.id}`),
            REJECTED: () => Toast.error(`Transaction is Rejected! ID:${postOrder.data?.id}`),
        }
        dictionaryToast[postOrder.data.status]?.()
    }, [postOrder.data])

    const isLoading = loading || fetchTiker.loading || postOrder.loading

    return (
        <InstrumentsContext.Provider
            value={{
                data: filteredData,
                loading: isLoading,
                error,
                fetchInstruments,
                filterByTicker,
                createOrder
            }}>
            {children}
        </InstrumentsContext.Provider>
    );
};

export const useInstruments = () => {
    const context = useContext(InstrumentsContext);
    if (!context) throw new Error('useInstruments must be used within an InstrumentsProvider');
    return context;
};