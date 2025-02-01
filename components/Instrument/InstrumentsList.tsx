import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { ThemedView } from '../ThemedView';
import { InstrumentCard } from './InstrumentCard';
import { Instrument } from '@/types';
import { IconSymbol } from '../ui/IconSymbol';


interface InstrumentsListProps {
  data: Instrument[];
  onOperate: (instrument: Instrument) => void
}


const InstrumentsList: React.FC<InstrumentsListProps> = ({ data, onOperate }) => {
  if (!data || data.length === 0) return null;

  const renderSwipeableCard = (item: Instrument) => {
    const renderRightActions = () =>
      <TouchableOpacity style={styles.swipeAction} onPress={() => { onOperate({ ...item, side: 'BUY' }) }}>
          <IconSymbol size={23} name='arrow.up' color='green' />
          <IconSymbol size={55} name='banknote.fill' color='green' />
      </TouchableOpacity>
    const renderLeftActions = () =>
      <TouchableOpacity style={styles.swipeAction} onPress={() => { onOperate({ ...item, side: 'SELL' }) }}>
        <IconSymbol size={23} name='arrow.down' color='green' />
        <IconSymbol size={55} name='banknote.fill' color='green' />
      </TouchableOpacity>


    return (
      <Swipeable
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
      >
        <ThemedView style={{ backgroundColor: 'transparent' }}>
          <InstrumentCard instrument={item} />
        </ThemedView>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderSwipeableCard(item)}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 8 },
  swipeAction: {
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: .8
  },
  flatList: { paddingBottom: 100 },
});

export default InstrumentsList;