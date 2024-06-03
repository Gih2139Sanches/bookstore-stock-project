/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/display-name */

import * as Dialog from "@radix-ui/react-dialog";
import * as Select from '@radix-ui/react-select';
import { CloseButton, Overley, Content, SelectTrigger, SelectIcon, SelectContent, SelectScrollUpButton, SelectViewport, SelectScrollDownButton, StyledItem } from "./styles";
import { X } from "phosphor-react";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { putPurchasesHistoric } from "../../../../business/PurchasesHistoric";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';
import CustomSelect from './components/CustomSelect';

export function PurchaseEditModal({ purchaseData, customers, books, onClose }) {
    const [purchaseDetails, setPurchaseDetails] = useState({
        purchase_date: '',
        book_id: '',
        customer_id: '',
        price: '',
        quantity: '',
        method_payment: '',
    });

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (purchaseData) {
            setPurchaseDetails({
                id: purchaseData.id,
                purchase_date: purchaseData.purchase_date,
                book_id: purchaseData.book_fk.id,
                customer_id: purchaseData.customer_fk.id,
                price: purchaseData.price,
                quantity: purchaseData.quantity,
                method_payment: purchaseData.method_payment,
            });
            setSelectedCustomer(purchaseData.customer_fk);
            setSelectedBook(purchaseData.book_fk);
            setAvailableQuantity(purchaseData.book_fk.quantity);
            setLoading(false);
        }
    }, [purchaseData]);

    const handleClose = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedDetails = {
                ...purchaseDetails,
                book_fk: selectedBook,
                customer_fk: selectedCustomer,
            };
            await putPurchasesHistoric(updatedDetails);
            onClose();
            console.log(updatedDetails);
        } catch (error) {
            console.error('Erro ao atualizar os detalhes da venda:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quantity') {
            const newQuantity = parseInt(value);
            if (newQuantity > availableQuantity) {
                alert('Quantidade desejada excede a quantidade disponível.');
            } else {
                const newPrice = selectedBook ? selectedBook.price * newQuantity : purchaseDetails.price;
                setPurchaseDetails((prevDetails) => ({
                    ...prevDetails,
                    quantity: newQuantity,
                    price: newPrice.toFixed(2)
                }));
            }
        } else {
            setPurchaseDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value
            }));
        }
    };

    const handleCustomerChange = (value) => {
        const selectedCustomer = customers.find(customer => customer.id === parseInt(value));
        if (selectedCustomer) {
            setSelectedCustomer(selectedCustomer);
            setPurchaseDetails((prevDetails) => ({
                ...prevDetails,
                customer_id: selectedCustomer.id
            }));
        } else {
            console.error('Cliente não encontrado:', value);
        }
    };

    const handleBookChange = (value) => {
        const selectedBook = books.find(book => book.id === parseInt(value));
        if (selectedBook) {
            setSelectedBook(selectedBook);
            setPurchaseDetails((prevDetails) => ({
                ...prevDetails,
                book_id: selectedBook.id
            }));
        } else {
            console.error('Livro não encontrado:', value);
        }
    };

    const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
        <StyledItem className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="SelectItemIndicator">
                <CheckIcon />
            </Select.ItemIndicator>
        </StyledItem>
    ));

    SelectItem.propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string
    };

    return (
        <Dialog.Portal>
            <Overley />
            <Content>
                <Dialog.Title>Editar Venda</Dialog.Title>

                <CloseButton onClick={handleClose}>
                    <X size={24} />
                </CloseButton>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <form onSubmit={handleSubmit}>
                        <>
                            <input
                                type="date"
                                name="purchase_date"
                                placeholder="Data de Compra"
                                value={purchaseDetails.purchase_date || ''}
                                onChange={handleChange}
                                required
                            />
                            <Select.Root value={purchaseDetails.customer_id} onValueChange={handleCustomerChange}>
                                <SelectTrigger className="SelectTrigger" aria-label="Nome do Cliente">
                                    <Select.Value>
                                        {purchaseDetails.customer_id
                                            ? customers.find(customer => customer.id === purchaseDetails.customer_id)?.name
                                            : 'Selecione um cliente…'}
                                    </Select.Value>
                                    <SelectIcon className="SelectIcon">
                                        <ChevronDownIcon />
                                    </SelectIcon>
                                </SelectTrigger>
                                <Select.Portal>
                                    <SelectContent className="SelectContent">
                                        <SelectScrollUpButton className="SelectScrollButton">
                                            <ChevronUpIcon />
                                        </SelectScrollUpButton>
                                        <SelectViewport className="SelectViewport">
                                            <Select.Group>
                                                {customers.map((customer) => (
                                                    <SelectItem key={customer.id} value={customer.id.toString()}>
                                                        <Select.ItemText>{customer.name}</Select.ItemText>
                                                    </SelectItem>
                                                ))}
                                            </Select.Group>
                                        </SelectViewport>
                                        <SelectScrollDownButton className="SelectScrollButton">
                                            <ChevronDownIcon />
                                        </SelectScrollDownButton>
                                    </SelectContent>
                                </Select.Portal>
                            </Select.Root>

                            <Select.Root value={purchaseDetails.book_id} onValueChange={handleBookChange}>
                                <SelectTrigger className="SelectTrigger" aria-label="Nome do Livro">
                                    <Select.Value>
                                        {purchaseDetails.book_id
                                            ? books.find(book => book.id === purchaseDetails.book_id)?.title
                                            : 'Selecione um livro…'}
                                    </Select.Value>
                                    <SelectIcon className="SelectIcon">
                                        <ChevronDownIcon />
                                    </SelectIcon>
                                </SelectTrigger>
                                <Select.Portal>
                                    <SelectContent className="SelectContent">
                                        <SelectScrollUpButton className="SelectScrollButton">
                                            <ChevronUpIcon />
                                        </SelectScrollUpButton>
                                        <SelectViewport className="SelectViewport">
                                            <Select.Group>
                                                {books.map((book) => (
                                                    <SelectItem key={book.id} value={book.id.toString()}>
                                                        <Select.ItemText>{book.title}</Select.ItemText>
                                                    </SelectItem>
                                                ))}
                                            </Select.Group>
                                        </SelectViewport>
                                        <SelectScrollDownButton className="SelectScrollButton">
                                            <ChevronDownIcon />
                                        </SelectScrollDownButton>
                                    </SelectContent>
                                </Select.Portal>
                            </Select.Root>
                            {selectedBook && (
                                <p>Quantidade disponível: {availableQuantity}</p>
                            )}
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantidade"
                                value={purchaseDetails.quantity || ''}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="price"
                                placeholder="Preço Total"
                                value={purchaseDetails.price || ''}
                                onChange={handleChange}
                                required
                            />

                            {/* <select 
                                name="method_payment" 
                                value={purchaseDetails.method_payment} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="" disabled>Selecione a forma de pagamento...</option>
                                <optgroup label="Forma de Pagamento">
                                    <option value="Dinheiro">Dinheiro</option>
                                    <option value="Pix">Pix</option>
                                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                                    <option value="Cartão de Débito">Cartão de Débito</option>
                                </optgroup>
                            </select> */}

                            <CustomSelect 
                                name="method_payment" 
                                value={purchaseDetails.method_payment} 
                                onChange={handleChange} 
                                required 
                            />
                            <button type="submit">
                                Atualizar
                            </button>
                        </>
                    </form>
                )}
            </Content>
        </Dialog.Portal>
    );
}

PurchaseEditModal.propTypes = {
    purchaseData: PropTypes.object.isRequired,
    customers: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
};
