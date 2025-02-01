import { Instrument, OrderBody, OrderType } from '@/types';
import React, { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { Button } from './Button';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { ThemeInput } from './ThemeInput';

interface OrderModalProps {
  instrument: Instrument | null
  visible: boolean;
  onClose: () => void;
  onSubmit: (body: OrderBody) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ visible, onClose, onSubmit, instrument }) => {
  const [type, setType] = useState<OrderType>('MARKET')
  const toggleType = () => setType(type === 'MARKET' ? 'LIMIT' : 'MARKET')
  const defaultValue = { price: '', quantity: '' }
  const [form, setForm] = useState(defaultValue)
  const onChange = (key: string) => (value: string) => setForm({ ...form, [key]: value })
  const disabledButton = !form.quantity || !instrument || !instrument?.side || type === 'LIMIT' && !form.price || +form.quantity > Math.floor(instrument.last_price);

  const handleSubmit = () => {
    if (!instrument || !instrument?.side) return;
    const body: OrderBody = {
      type,
      instrument_id: Number(instrument?.id),
      side: instrument?.side,
      quantity: Number(form.quantity),
      price: Number(form.price),
    };
    onSubmit(body);
    setForm(defaultValue);
    onClose();
  };
  const handleClose = () => {
    setForm(defaultValue);
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ThemedView style={styles.modalContainer}>
        {Boolean(instrument) &&
          <ThemedView style={styles.modalContent}>
            <ThemedText type='title'>{instrument?.side}</ThemedText>
            <ThemedText>Ticker: {instrument?.ticker}</ThemedText>
            <ThemedText>Name: {instrument?.name}</ThemedText>
            <ThemedText>Type: {instrument?.type}</ThemedText>
            <ThemedText>Last price: {instrument?.last_price}</ThemedText>
            <ThemedText>Close price: {instrument?.close_price}</ThemedText>
            <Button onPress={toggleType} label={type} type='default' />

            {type === 'LIMIT' &&
              <ThemeInput
                // keyboardType='numeric'
                placeholder="Price"
                onChangeText={onChange('price')}
                value={form?.price}
              />
            }
            <ThemeInput
              placeholder="Quantity"
              onChangeText={onChange('quantity')}
              value={form.quantity} />
            <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Button onPress={handleClose} label={'close'} type='danger' />
              <Button disabled={disabledButton} onPress={handleSubmit} label={'submit'} type='primary' />
            </ThemedView>
          </ThemedView>}
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    borderRadius: 6,
    borderColor: '#fff',
    width: '80%',
    borderWidth: 1,
    rowGap: 10,
  },
});

export default OrderModal;
