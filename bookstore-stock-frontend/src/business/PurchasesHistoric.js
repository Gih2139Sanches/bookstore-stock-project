import axios from "axios"
import ModelBase from "./ModelBase.js"

export class PurchasesHistoric extends ModelBase {
    purchase_date = '';
    book_id = '';
    customer_id = '';
    price = '';
    quantity = '';
}

/**
 *
 * @returns {Array<PurchasesHistoric>}
 */
export const getPurchasesHistorics = async () => {
    try {
        return JSON.parse((await axios.get('http://127.0.0.1:8000//purchasesHistoric/')).data)
    }
    catch {
        return;
    }
}

/**
 *
 * @param {PurchasesHistoric} purchasesHistoric
 * @returns {import("axios").AxiosPromise<boolean>}
 */
export const postPurchasesHistorics = async (purchasesHistoric) => {
    try {
        return await axios.post('http://127.0.0.1:8000//purchasesHistoric/', purchasesHistoric)
    }
    catch {
        return;
    }
}

/**
 *
 * @param {PurchasesHistoric} purchasesHistoric
 * @returns {import("axios").AxiosResponse<boolean>}
 */
export const putPurchasesHistoric = async (purchasesHistoric) => {
    try {
        return await axios.put('http://127.0.0.1:8000//purchasesHistoric/', purchasesHistoric)
    }
    catch {
        return;
    }
}


/**
 *
 * @param {number} purchasesHistoricId
 * @returns {import("axios").AxiosResponse<boolean>}
 */
export const deletePurchasesHistoric = async (purchasesHistoricId) => {
    try {
        return await axios.delete(`http://127.0.0.1:8000//purchasesHistoric/${purchasesHistoricId}`, purchasesHistoricId)
    }
    catch {
        return;
    }
}
