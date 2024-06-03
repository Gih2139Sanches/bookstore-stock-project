/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/display-name */

import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Overley, Content, StyledItem, SelectTrigger, SelectIcon, SelectContent, SelectViewport, SelectScrollUpButton, SelectScrollDownButton } from "./styles";
import { X } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { getCustomers } from "../../../../business/Customer";
import { PlusCircle } from '@phosphor-icons/react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { postPurchasesHistorics } from "../../../../business/PurchasesHistoric";
import { getBooks, putBook } from "../../../../business/Book";
import CustomSelect from './components/CustomSelect';

export function PurchaseCreateModal() {
    // estados dos inputs
    const [purchase_date, setPurchaseDate] = useState('');
    const [book_id, setBookId] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [customer_id, setCustomerId] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [method_payment, setMethodPayment] = useState('');
    const [open, setOpen] = useState(false); // Controle do estado do modal

    // Estado para armazenar a lista de clientes
    const [customers, setCustomers] = useState([]);
    const [books, setBooks] = useState([]);
    const [availableQuantity, setAvailableQuantity] = useState(0);

    // Fetch customers e books quando o componente monta
    useEffect(() => {
        const fetchCustomers = async () => {
            const customersData = await getCustomers();
            setCustomers(customersData);
        };

        const fetchBooks = async () => {
            const booksData = await getBooks();
            setBooks(booksData);
        };

        fetchBooks();
        fetchCustomers();
    }, []);

    const handleSelectChange = (type, value) => {
        if (type === 'customer') {
            const selectedCustomer = customers.find(customer => customer.id === parseInt(value));
            if (selectedCustomer) {
                setSelectedCustomer(selectedCustomer);
                setCustomerId(selectedCustomer.id);
            }
        } else if (type === 'book') {
            const selectedBook = books.find(book => book.id === parseInt(value));
            if (selectedBook) {
                setSelectedBook(selectedBook);
                setBookId(selectedBook.id);
                setAvailableQuantity(selectedBook.quantity);
                setPrice((selectedBook.price * quantity).toFixed(2));
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quantity') {
            const newQuantity = parseInt(value);
            if (newQuantity > availableQuantity) {
                alert('Quantidade desejada excede a quantidade disponível.');
            } else {
                setQuantity(newQuantity);
                if (selectedBook) {
                    const newPrice = selectedBook.price * newQuantity;
                    setPrice(newPrice.toFixed(2));
                }
            }
        } else {
            setPurchaseDate(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const purchase = { purchase_date, book_id, customer_id, quantity, price, method_payment };

        await postPurchasesHistorics(purchase);

        // Fetch atualizado dos livros
        const booksData = await getBooks();
        setBooks(booksData);

        // Limpar o formulário
        setPurchaseDate('');
        setBookId('');
        setCustomerId('');
        setPrice('');
        setQuantity('');
        setAvailableQuantity(0);

        // Fechar o modal
        setOpen(false);

        // Recarregar a página
        window.location.reload();
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
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button onClick={() => setOpen(true)}>
                    <PlusCircle size={20} />
                    Cadastrar Venda
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Overley />

                <Content>
                    <Dialog.Title>Cadastrar Nova Venda</Dialog.Title>

                    <CloseButton onClick={() => setOpen(false)}>
                        <X size={24} />
                    </CloseButton>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="date"
                            placeholder="Data de Compra"
                            value={purchase_date}
                            onChange={(e) => setPurchaseDate(e.target.value)}
                            required
                        />
                        <Select.Root onValueChange={(value) => handleSelectChange('customer', value)}>
                            <SelectTrigger className="SelectTrigger" aria-label="Nome do Cliente">
                                <Select.Value placeholder="Selecione um cliente…" />
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
                                                    {customer.name}
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

                        <Select.Root onValueChange={(value) => handleSelectChange('book', value)}>
                            <SelectTrigger className="SelectTrigger" aria-label="Nome do Livro">
                                <Select.Value placeholder="Selecione um livro…" />
                                <Select.Icon className="SelectIcon">
                                    <ChevronDownIcon />
                                </Select.Icon>
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
                                                    {book.title}
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
                            value={quantity}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Preço Total"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            readOnly
                        />
                        {/* <StyledSelect name="select" required onChange={(e) => setMethodPayment(e.target.value)}>
                            <FirstOption selected disabled>Selecione a forma de pagamento...</FirstOption>
                            <optgroup label="Forma de Pagamento">
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Pix">Pix</option>
                                <option value="Cartão de Crédito">Cartão de Crédito</option>
                                <option value="Cartão de Débito">Cartão de Débito</option>
                            </optgroup>
                        </StyledSelect> */}
                        <CustomSelect onChange={(option) => setMethodPayment(option.value)} />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </form>
                </Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
