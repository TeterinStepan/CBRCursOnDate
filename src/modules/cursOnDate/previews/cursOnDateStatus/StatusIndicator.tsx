import {StyleSheet, View} from "react-native";
import {memo} from "react";
import {CursOnDateStatusType} from "../../dataProvider/interfaces/CursOnDateStatusType";

type StatusIndicatorType = {
    status: CursOnDateStatusType
}
const StatusIndicator = ({status}:StatusIndicatorType) => (
    <View style={[styles.base, styles[status] || {}]}/>
)

const styles = StyleSheet.create({
    base: {
        width: 16,
        height: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'gray'
    },
    pending: {
        backgroundColor: 'green'
    },
    idle: {
        backgroundColor: 'red'
    }
})

export default memo(StatusIndicator)