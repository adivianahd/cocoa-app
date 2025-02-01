import { StyleSheet } from 'react-native';

import { BaseLayout } from '@/components/BaseLayout';
import PortfolioList from '@/components/portfolio/PortfolioList';
import { SearchBar } from '@/components/SearchBar';
import { usePortfolio } from '@/providers/PortfolioProvider';
import { ThemedView } from '@/components/ThemedView';
import { useInstruments } from '@/providers/InstrumentsProvider';

export default function PortfolioScreen() {
    const portfolio = usePortfolio()

    return (
        <BaseLayout title='Portfolio' isLoading={portfolio.loading}>
            <ThemedView style={{ marginBottom: 10, backgroundColor: 'transparent'}}>
                <SearchBar onSearch={portfolio.filterByTicker} />
            </ThemedView>
            <PortfolioList data={portfolio?.data || []} />
        </BaseLayout>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
