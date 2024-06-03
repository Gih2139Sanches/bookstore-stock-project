import axios from "axios"
import ModelBase from "./ModelBase.js"
import { getPurchasesHistorics } from "./PurchasesHistoric.js"

export class Book extends ModelBase {
    title = ''
    sub_title = ''
    author = ''
    publisher = ''
    editon = ''
    quantity = ''
    price = ''
}

/**
 *
 * @returns {Array<Book>}
 */
export const getBooks = async () => {
    try {
        return JSON.parse((await axios.get('http://localhost:8000/book/')).data)
    }
    catch {
        return;
    }
}

/**
 *
 * @param {Book} book
 * @returns {import("axios").AxiosPromise<boolean>}
 */
export const postBooks = async (book) => {
    try {
        return await axios.post('http://localhost:8000/book/', book)
    }
    catch {
        return;
    }
}

/**
 *
 * @param {Book} book
 * @returns {import("axios").AxiosResponse<boolean>}
 */
export const putBook = async (book) => {
    try {
        return await axios.put(`http://localhost:8000/book/${book.id}/`, book);
    }
    catch (error) {
        console.error("Error updating book:", error);
        return;
    }
};

// /**
//  *
//  * @param {Book} book
//  * @returns {import("axios").AxiosResponse<boolean>}
//  */
// export const putBook = async (book) => {
//     try {
//         return await axios.put('http://localhost:8000/book/', book)
//     }
//     catch {
//         return;
//     }
// }

/**
 *
 * @param {number} bookId
 * @returns {Promise<boolean>}
 */
export const checkBooksPurchase = async (bookId) => {
    try {
        const purchases = await getPurchasesHistorics();
        console.log('Histórico de Compras:', purchases); // Log de depuração
        return purchases.some(purchase => purchase.book_fk.id === bookId);
    } catch (error) {
        console.error('Erro ao verificar compras do cliente:', error); // Log de erro
        return false;
    }
};

/**
 *
 * @param {number} bookId
 * @returns {import("axios").AxiosResponse<boolean>}
 */
export const deleteBook = async (bookId) => {
    try {
        return await axios.delete(`http://localhost:8000/book/${bookId}`, bookId)
    }
    catch {
        return;
    }
}
