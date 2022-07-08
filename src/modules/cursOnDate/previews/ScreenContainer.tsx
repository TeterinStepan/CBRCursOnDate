import React, {memo} from "react";
import {View} from "react-native";

type ScreenContainerType = {
    children: React.ReactNode
}
const ScreenContainer = ({children}: ScreenContainerType) => (
    <View style={{flex:1, paddingHorizontal: 16, paddingVertical: 24, flexDirection: 'column'}}>
        {children}
    </View>
)

export default memo(ScreenContainer)