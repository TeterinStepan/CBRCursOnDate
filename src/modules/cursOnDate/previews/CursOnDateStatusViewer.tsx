import {useCursOnDateDate, useCursOnDateStatus} from "../dataProvider/CursOnDateProvider";
import {CursOnDateStatusType} from "../dataProvider/interfaces/CursOnDateStatusType";
import {memo} from "react";
import {StyleSheet, View} from "react-native";
import StatusIndicator from "./cursOnDateStatus/StatusIndicator";
import Paragraph from "../../userInterface/typography/Paragraph";
import Header from "../../userInterface/typography/Header";
import DateViewer from "./cursOnDateStatus/DateViewer";

const CursOnDateStatusViewer = () => {
    const date:Date = useCursOnDateDate()
    const status:CursOnDateStatusType = useCursOnDateStatus()
    return (
        <View style={styles.container}>
            <View>
                <Header>Curs on date</Header>
                <Paragraph secondary><DateViewer date={date}/></Paragraph>
            </View>
            <StatusIndicator status={status} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 14,
        flexDirection: 'row',
        backgroundColor: 'whitesmoke',
        justifyContent: 'space-between'
    }
})

export default memo(CursOnDateStatusViewer)