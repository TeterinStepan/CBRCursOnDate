import {CursCurrencyInterface} from "../interfaces/CursCurrencyInterface";
import DomSelector from 'react-native-dom-parser';

export const extractValueFromNode = (node: Element, key: string): string | number => {
    const nodes = node.getElementsByTagName(key)
    if (Array.isArray(nodes) && nodes.length) {
        const [nodeData] = nodes
        return nodeData?.firstChild?.text
    }
    return null
}

/**
 * Парсинг из XML строки необходимых данных по указанной структуре
 * @param XMLString
 * @param dataKey
 * @param mapStructure
 */
export const extractData = (
    XMLString: string,
    dataKey: string,
    mapStructure: { [fromKey: string]: string }
): CursCurrencyInterface[] | any[] => {
    const XML = DomSelector(XMLString, "application/xml")
    const NodeElements = XML.getElementsByTagName(dataKey)

    const mapStructureKeys = Object.keys(mapStructure)

    return NodeElements.map((node: Element) => {
        const objectData = {}
        mapStructureKeys.forEach((key: string) => {
            const finalDataKey = mapStructure[key]
            objectData[finalDataKey] = extractValueFromNode(node, key)
        })
        return objectData
    })
}


