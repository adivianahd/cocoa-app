import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';
import { Loader } from './Loader';

interface Props extends React.PropsWithChildren {
    title: string
    isLoading?: boolean
}
export const BaseLayout = ({ children, title, isLoading }: Props) => {
    const inset = useSafeAreaInsets()

    return (
        <ThemedView style={styles.container}>
            <ImageBackground
                source={require('../assets/images/image.png')}
                style={styles.image}
            >
                <ThemedText
                    type='title'
                    style={[styles.title, { marginTop: 90 + inset.top, }]}>
                    {title}
                </ThemedText>
                {children}
            </ImageBackground>
            {isLoading && <Loader />}
        </ThemedView >
    )
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    title: {
        marginVertical: 90,
        textAlign: 'center'
    },
    image: { flex: 1, paddingHorizontal: 16, resizeMode: 'cover' },
});
