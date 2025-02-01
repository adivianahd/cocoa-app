import { BaseLayout } from '@/components/BaseLayout';
import InstrumentsList from '@/components/Instrument/InstrumentsList';
import OrderModal from '@/components/OrderModal';
import { SearchBar } from '@/components/SearchBar';
import { ThemedView } from '@/components/ThemedView';
import { useInstruments } from '@/providers/InstrumentsProvider';
import { Instrument } from '@/types';
import { useState } from 'react';

export default function InstrumentScreen() {
  const instruments = useInstruments();
  const [instrument, setInstrument] = useState<Instrument | null>(null);
  const hideModal = () => setInstrument(null)

  return (
    <BaseLayout title='Instruments' isLoading={instruments.loading}>
      <ThemedView style={{ marginBottom: 10, backgroundColor: 'transparent' }}>
        <SearchBar onSearch={instruments.filterByTicker} />
      </ThemedView>
      <InstrumentsList
        data={instruments?.data || []}
        onOperate={setInstrument}
      />
      <OrderModal
        visible={Boolean(instrument)}
        instrument={instrument}
        onSubmit={instruments.createOrder}
        onClose={hideModal}
      />
    </BaseLayout>
  );
}
