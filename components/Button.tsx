import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';

interface Props {
    onPress: () => void
    label: string
    type: string
    disabled?: boolean
}

export const Button = ({ onPress, label, type, disabled }: Props) => {
    const borderColor = { primary: '#0f0', danger: '#f00', default: '#fff' }[type]
    const disabledStyle = disabled && { borderColor: '#ccc', backgroundColor: "#d0d1d3" }

    return (
        <TouchableOpacity disabled={disabled} style={[styles.button, { borderColor }, disabledStyle ]} onPress={onPress}>
            <ThemedText darkColor='white' style={{ textAlign: 'center', borderColor: '#f00' }}>{label}</ThemedText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});
