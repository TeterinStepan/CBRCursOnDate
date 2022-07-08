import {memo} from "react";
import Paragraph from "../../../userInterface/typography/Paragraph";
import {getDateFormatted} from "../../../dates/DatesLib";

type DateViewerType = {
    date: Date
}
const DateViewer = ({date}: DateViewerType) => {
    return (
        <Paragraph>Date: {getDateFormatted(date)}</Paragraph>
    )
}


export default memo(DateViewer)