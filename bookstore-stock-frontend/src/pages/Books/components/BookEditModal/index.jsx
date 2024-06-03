import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Overley, Content } from "./styles";
import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { putBook } from "../../../../business/Book";

export function BookEditModal({ booksData, onClose }){
    const [booksDetails, setBooksDetails] = useState({
        title: '',
        author: '',
        publisher: '',
        quantity: '',
        price: '',
    })

    useEffect(() => {
        if (booksData){
            setBooksDetails(booksData);
        }
    }, [booksData]);

    const handleClose = () => {
        if(typeof onClose === 'function'){
            onClose();
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await putBook(booksDetails);
            onClose();
        }catch (error){
            console.log('Erro ao atualizar os detalhes do cliente:', error);
        }
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooksDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return(
        <Dialog.Portal>
            <Overley />
            <Content>
                <Dialog.Title>Editar Livro</Dialog.Title>

                <CloseButton onClick={handleClose}>
                    <X size={24}/>
                </CloseButton>

                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="title"
                        placeholder="Título do Livro"
                        value={booksDetails.title || ''} 
                        onChange={handleChange} 
                        required
                    />
                    <input 
                        type="text"
                        name="author"
                        placeholder="Nome do Autor"
                        value={booksDetails.author}
                        onChange={handleChange}
                        required  
                    />
                    <input 
                        type="text"
                        name="publisher"
                        placeholder="Nome da Editora"
                        value={booksDetails.publisher}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="number"
                        name="quantity"
                        placeholder="Quantidade"
                        value={booksDetails.quantity}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="money"
                        name="price"
                        placeholder="Preço do Livro"
                        value={booksDetails.price}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" >
                        Atualizar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}

BookEditModal.propTypes = {
    booksData: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};