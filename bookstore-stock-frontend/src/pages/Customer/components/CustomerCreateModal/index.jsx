import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Overley, Content } from "./styles";
import { X } from "phosphor-react";
import { useState } from "react";
import { postCustomers } from "../../../../business/Customer";
import { PlusCircle} from '@phosphor-icons/react'

export function CustomerCreateModal(){
    //estados dos inputs
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [open, setOpen] = useState(false); // Controle do estado do modal

    const handleSubmit = async (event) => {
        event.preventDefault();
        const customer = { name, birth_date: birthDate, email, phone };
        await postCustomers(customer);

        // Limpar o formulário
        setName('');
        setBirthDate('');
        setEmail('');
        setPhone('');

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
                    Cadastrar Cliente
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Overley />

                <Content>
                    <Dialog.Title>Cadastrar Novo Cliente</Dialog.Title>

                    <CloseButton>
                        <X size={24}/>
                    </CloseButton>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Nome do Cliente"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required
                        />
                        <input 
                            type="date"
                            placeholder="Data de Nascimento"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required  
                        />
                        <input 
                            type="email"
                            placeholder="E-mail do Cliente"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input 
                            type="tel"
                            placeholder="(00) xxxxx-xxxx"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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