import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import CursOnDateProvider from "./src/modules/cursOnDate/dataProvider/CursOnDateProvider";
import CursOnDateStatusViewer from "./src/modules/cursOnDate/previews/CursOnDateStatusViewer";
import ScreenContainer from "./src/modules/cursOnDate/previews/ScreenContainer";
import CursListPreview from "./src/modules/cursOnDate/previews/CursListPreview";
import {useEffect, useState} from "react";
import {CursCurrencyInterface} from "./src/modules/cursOnDate/dataProvider/interfaces/CursCurrencyInterface";
import CurrencyBottomSheet from "./src/modules/bottomSheetModal/CurrencyBottomSheet";

export default function App() {
    const [selectedCurrency, setSelectedCurrency] = useState<CursCurrencyInterface>(null)

    return (
        <SafeAreaView style={styles.container}>
            <CursOnDateProvider>
                <ScreenContainer>
                    <CursOnDateStatusViewer/>
                    <CursListPreview onSelect={setSelectedCurrency} />
                </ScreenContainer>
            </CursOnDateProvider>
            <CurrencyBottomSheet
                currencyCurs={selectedCurrency}
                onClosePress={() => setSelectedCurrency(null)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});