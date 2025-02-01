import { Instrument } from '@/types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface CardProps {
  instrument: Instrument;
}

export const InstrumentCard: React.FC<CardProps> = ({ instrument }) => {
  if (!instrument) return null;

  const returnValue = (instrument.last_price - instrument.close_price).toString().slice(0, 5);

  return (
    <ThemedView style={styles.card}>
      <ThemedText type='subtitle'>{instrument.name}</ThemedText>
      <View style={styles.horizontal}>
        <View>
          <ThemedText type='title' style={styles.ticket}>{instrument.ticker}</ThemedText>
        </View>
        <View style={styles.labels}>
          <ThemedText>Last Price:</ThemedText>
          <ThemedText>Return:</ThemedText>
        </View>
        <View>
          <ThemedText type='subtitle' style={styles.money}>{instrument.last_price}</ThemedText>
          <ThemedText type='subtitle' style={styles.money}>{returnValue}</ThemedText>
        </View>
      </View>
    </ThemedView >
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  money: { fontWeight: 400 },
  ticket: { opacity: 0.6 },
  type: { fontSize: 12 },
  labels: { marginLeft: 'auto', marginRight: 8 },
  card: {
    boxSizing: 'box',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
});
