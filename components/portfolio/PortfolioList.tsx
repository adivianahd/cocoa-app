import React from 'react';
import { Portfolio } from '@/types';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortfolioCard } from './PortfolioCard';
import Animated from 'react-native-reanimated';

interface PortfolioListProps {
  data: Portfolio[];
}

const PortfolioList: React.FC<PortfolioListProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        keyExtractor={(item, index) => index + item.ticker.toString()}
        renderItem={({ item }) => <PortfolioCard portfolio={item} />
        }
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 8 },
  flatList: { paddingBottom: 100 },
});

export default PortfolioList;