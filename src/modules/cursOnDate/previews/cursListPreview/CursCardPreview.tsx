import {memo} from "react";
import {CursCurrencyInterface} from "../../dataProvider/interfaces/CursCurrencyInterface";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Paragraph from "../../../userInterface/typography/Paragraph";


type CursCardPreviewType = {
    information: CursCurrencyInterface,
    onPress:() => void
}
const CursCardPreview = ({information, onPress}: CursCardPreviewType) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View>
            <Paragraph bold>{information.chCode}</Paragraph>
            <Paragraph compact secondary>{information.name}</Paragraph>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        padding: 16
    }
})

export default memo(CursCardPreview)