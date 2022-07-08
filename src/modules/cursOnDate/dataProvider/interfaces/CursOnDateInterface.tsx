import {CursCurrencyInterface} from "./CursCurrencyInterface";
import {CursOnDateStatusType} from "./CursOnDateStatusType";

export default interface CursOnDateInterface {
    date: Date,
    information: CursCurrencyInterface[],
    status: CursOnDateStatusType
}

