import React, {memo} from "react";
import {FlatList, StyleSheet} from "react-native";
import {useCursOnDateInformation} from "../dataProvider/CursOnDateProvider";
import CursCardPreview from "./cursListPreview/CursCardPreview";
import {CursCurrencyInterface} from "../dataProvider/interfaces/CursCurrencyInterface";

type CursListPreviewType = {
    onSelect: (cursCurrency:CursCurrencyInterface) => void
}

const CursListPreview = ({onSelect}:CursListPreviewType) => {
    const data:CursCurrencyInterface[] = useCursOnDateInformation()
    return (
        <FlatList
            data={data}
            renderItem={({item}) => <CursCardPreview information={item} onPress={() => onSelect(item)} />}
            keyExtractor={(item) => 'Currency.'+ item.code}
            style={styles.container}
        />
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 16,
        borderRadius: 16,
        backgroundColor: 'whitesmoke'
    },
    content: {

    }

})
export default memo(CursListPreview)