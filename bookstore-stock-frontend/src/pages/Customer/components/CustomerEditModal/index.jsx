import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Overley, Content } from "./styles";
import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { putCustomer } from "../../../../business/Customer";
import CircularProgress from '@mui/material/CircularProgress';

export function CustomerEditModal({ customerData, onClose }){
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        birth_date: '',
        email: '',
        phone: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (customerData) {
            setCustomerDetails(customerData);
            setLoading(false);
        }
    }, [customerData]);

    const handleClose = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await putCustomer(customerDetails); 
            onClose(); 
            console.log(customerDetails);
        } catch (error) {
            console.error('Erro ao atualizar os detalhes do cliente:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return(
        <Dialog.Portal>
            <Overley />
            <Content>
                <Dialog.Title>Editar Cliente</Dialog.Title>

                <CloseButton onClick={handleClose}>
                    <X size={24}/>
                </CloseButton>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <form onSubmit={handleSubmit}>
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome do Cliente"
                                value={customerDetails.name || ''}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="date"
                                name="birth_date"
                                placeholder="Data de Nascimento"
                                value={customerDetails.birth_date || ''}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail do Cliente"
                                value={customerDetails.email || ''}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="(00) xxxxx-xxxx"
                                value={customerDetails.phone || ''}
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
    )
}

CustomerEditModal.propTypes = {
    customerData: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};
