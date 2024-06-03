import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Overley, Content } from "./styles";
import { X } from "phosphor-react";
import { useState } from "react";
import { PlusCircle} from '@phosphor-icons/react'
import { postBooks } from "../../../../business/Book";

export function BookCreateModal(){
    //estados dos inputs
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [open, setOpen] = useState(false); // Controle do estado do modal

    const handleSubmit = async (event) => {
        event.preventDefault();
        const book = { title, author, publisher, quantity, price };
        await postBooks(book);

        // Limpar o formulário
        setTitle('');
        setAuthor('');
        setPublisher('');
        setQuantity('');
        setPrice('');

        // Fechar o modal
        setOpen(false);

        // Recarregar a página
        window.location.reload();
    };

    return(
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button onClick={() => setOpen(true)}>
                    <PlusCircle size={20}/> 
                    Cadastrar Livro
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Overley />

                <Content>
                    <Dialog.Title>Cadastrar Novo Livro</Dialog.Title>

                    <CloseButton>
                        <X size={24}/>
                    </CloseButton>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Título do Livro"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required
                        />
                        <input 
                            type="text"
                            placeholder="Nome do Autor"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required  
                        />
                        <input 
                            type="text"
                            placeholder="Nome da Editora"
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            required
                        />
                        <input 
                            type="number"
                            placeholder="Quantidade"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                        <input 
                            type="money"
                            placeholder="Preço do Livro"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <button type="submit" >
                            Cadastrar
                        </button>
                    </form>
                </Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}