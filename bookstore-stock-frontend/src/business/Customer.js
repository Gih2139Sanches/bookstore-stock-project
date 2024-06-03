import axios from "axios"
import ModelBase from "./ModelBase.js"
import { getPurchasesHistorics } from "./PurchasesHistoric.js"

export class Customer extends ModelBase {
    name = ''
    birth_date = ''
    email = ''
    phone = ''
}

/**
 *
 * @returns {Array<Customer>}
 */
export const getCustomers = async () => {
    try {
        return JSON.parse((await axios.get('http://localhost:8000/customer/')).data)
    }
    catch (error){
        console.log(error)
        return;
    }
}

/**
 *
 * @param {Customer} customer
 * @returns {import("axios").AxiosPromise<boolean>}
 */
export const postCustomers = async (customer) => {
    try {
        return await axios.post('http://localhost:8000/customer/', customer)
    }
    catch {
        return ;
    }
}

/**
 *
 * @param {Customer} customer
 * @returns {import("axios").AxiosResponse<boolean>}
 */
export const putCustomer = async (customer) => {
    try {
        return await axios.put('http://localhost:8000/customer/', customer)
    }catch (error) {
        console.error('Erro ao atualizar o cliente:', error);
        throw error;
    }
}

/**
 *
 * @param {number} customerId
 * @returns {Promise<boolean>}
 */
export const checkCustomerPurchase = async (customerId) => {
    try {
        const purchases = await getPurchasesHistorics();
        console.log('Histórico de Compras:', purchases); // Log de depuração
        return purchases.some(purchase => purchase.customer_fk.id === customerId);
    } catch (error) {
        console.error('Erro ao verificar compras do cliente:', error); // Log de erro
        return false;
    }
};

/**
 *
 * @param {number} customerId
 * @returns {import("axios").AxiosResponse<boolean>}
 */
export const deleteCustomer = async (customerId) => {
    try {
        return await axios.delete(`http://localhost:8000/customer/${customerId}`, customerId)
    }
    catch {
        return;
    }
}
