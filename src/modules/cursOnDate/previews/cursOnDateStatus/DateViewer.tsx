import {memo} from "react";
import Paragraph from "../../../userInterface/typography/Paragraph";
import {getDateFormatted, getTimeFormatted} from "../../../dates/DatesLib";
import {View} from "react-native";

type DateViewerType = {
    date: Date
}
const DateViewer = ({date}: DateViewerType) => {
    return (
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Paragraph compact>Date: {getDateFormatted(date)}</Paragraph>
            <Paragraph compact>Last update: {getTimeFormatted(date)}</Paragraph>
        </View>
    )
}


export default memo(DateViewer)
