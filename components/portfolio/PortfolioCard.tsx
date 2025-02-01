import { Portfolio } from '@/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface CardProps {
  portfolio: Portfolio;
}

export const PortfolioCard: React.FC<CardProps> = ({ portfolio }) => {
  if (!portfolio) return null;

  const marketValue = Math.floor(portfolio.quantity*portfolio.last_price);
  const revenue = Math.floor((portfolio.last_price - portfolio.avg_cost_price) * portfolio.quantity);
  const performance = Math.floor(((portfolio.last_price - portfolio.avg_cost_price) / portfolio.avg_cost_price) * 100);

  return (
    <ThemedView style={styles.card}>
      <View>
        <ThemedText type='title' style={styles.ticket}>{portfolio.ticker}</ThemedText>
        <ThemedText>Position Quantity:</ThemedText><ThemedText style={styles.quantity}>{portfolio.quantity}</ThemedText>
      </View>
      <View style={styles.labels}>
        <ThemedText>Market value:</ThemedText>
        <ThemedText>Revenue:</ThemedText>
        <ThemedText>Performance:</ThemedText>
      </View>
      <View>
        <ThemedText type='subtitle' style={styles.money}>{marketValue}</ThemedText>
        <ThemedText type='subtitle' style={styles.money}>{revenue}</ThemedText>
        <ThemedText type='subtitle' style={styles.money}>{`${performance}%`}</ThemedText>
      </View>
    </ThemedView >
  );
};

const styles = StyleSheet.create({
  quantity: {
    fontWeight: 600,
    fontSize: 24,
  },
  money: { fontWeight: 400 },
  ticket: { opacity: 0.6 },
  type: { fontSize: 12 },
  labels: { marginLeft: 'auto', marginRight: 8 },
  card: {
    boxSizing: 'box',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
