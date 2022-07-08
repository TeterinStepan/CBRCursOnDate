import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
    children?: string|number|React.ReactText|React.ReactNode;
    color?: string,
    type?: string,
    style?: any
};

const Header = ({ children, type = 'h5', style, color, ...params }: Props) => (
    <Text style={[styles.base, styles[type], style]} {...params}>
        {children}
    </Text>
)

const styles = StyleSheet.create({
    base: {
        fontWeight: 'bold',
    },
    h1: {
        fontSize: 44,
    },
    h2: {
        fontSize: 40,
    },
    h3: {
        fontSize: 36,
    },
    h4: {
        fontSize: 32,
    },
    h5: {
        fontSize: 28,
    },
});

export default memo(Header);
