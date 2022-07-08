import {memo, useEffect, useMemo, useRef} from "react";
import {CursCurrencyInterface} from "../cursOnDate/dataProvider/interfaces/CursCurrencyInterface";
import {Animated, Dimensions, View, StyleSheet, Button} from "react-native";
import Header from "../userInterface/typography/Header";
import Paragraph from "../userInterface/typography/Paragraph";

let {width, height: screenHeight} = Dimensions.get('window')

type CurrencyBottomSheetType = {
    currencyCurs: CursCurrencyInterface,
    onClosePress: () => void
}
const CurrencyBottomSheet = ({currencyCurs, onClosePress}: CurrencyBottomSheetType) => {
    const bottom = useRef(new Animated.Value(-screenHeight)).current;
    const visible:boolean = useMemo(() => currencyCurs !== null, [currencyCurs])

    // логика при изменении visible модального окна
    useEffect(() => {
        const toValue = visible ? 0 : -screenHeight
        Animated.timing(bottom, {
            toValue: toValue,
            duration: 400,
            useNativeDriver: false
        }).start();
    }, [visible])

    return (
        <Animated.View style={{...styles.modal, bottom: bottom}}>
            <View style={{flex: 1, padding: 24}}>
                <View style={{flex:1}}>
                {
                    visible ? (
                       <>
                            <Header style={styles.header}>Information</Header>
                            <Paragraph style={styles.row}>Denomination: {currencyCurs.nom} unit</Paragraph>
                            <Paragraph style={styles.row}>Curs: {currencyCurs.curs} ₽</Paragraph>
                            <Paragraph style={styles.row}>Name: {currencyCurs.name}</Paragraph>
                            <Paragraph style={styles.row}>Chcode: {currencyCurs.chCode}</Paragraph>
                        </>
                    ) : null
                }
                </View>
                <Button
                    title='Close information'
                    style={styles.btn}
                    color={'blue'}
                    backgroundColor={'red'}
                    onPress={() => onClosePress()}
                />
            </View>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    modal: {
        width: width,
        height: '100%',
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.24,
        shadowRadius: 16.00,

        elevation: 24,
    },
    header: {
        paddingVertical: 16
    },
    row: {
        flexDirection: 'row',
        marginVertical: 8
    },
    btn: {
        paddingHorizontal: 24,
        paddingVertical: 16
    }
})

export default memo(CurrencyBottomSheet)