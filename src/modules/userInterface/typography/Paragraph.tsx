import React, {memo} from 'react';
import {Text} from 'react-native';

type Props = {
    children?: string | number | React.ReactText | React.ReactNode;
    style?: object;
    type?: string;
    secondary?: boolean;
    compact?: boolean;
    bold?: boolean;
    color?: string;
    numberOfLines?: number
};

const Paragraph = ({
                       children,
                       style = {},
                       compact = false,
                       secondary = false,
                       bold = false,
                       color = null,
                       ...params
                   }: Props) => (
    <Text style={[{opacity: secondary ? 0.6 : 1, fontSize: compact ? 12 : 16, fontWeight: bold ? 'bold' : 'normal'}, style]} {...params}>
        {children}
    </Text>
)

export default memo(Paragraph);
