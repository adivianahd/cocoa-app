import React from 'react';

import { ThemedView } from '@/components/ThemedView';
import { ActivityIndicator } from 'react-native';

export function Loader() {
    return <ThemedView style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        top: 0,
        position: 'absolute',
        opacity: .9,
        alignItems: 'center',
        justifyContent: 'center'
    }} >
        <ActivityIndicator />
    </ThemedView>
}