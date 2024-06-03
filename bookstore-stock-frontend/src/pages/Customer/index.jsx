import { Tooltip } from 'react-tooltip'
import { ActionsIcons, CustomerContainer, CustomerContainerTable, CustomerContainerThead, CustomerTable, EditionButton} from './styles'
import { PencilSimple } from 'phosphor-react'
import { CustomerCreateModal } from './components/CustomerCreateModal';
import * as Dialog from '@radix-ui/react-dialog'
import { CustomerEditModal } from './components/CustomerEditModal'
import { getCustomers } from '../../business/Customer';
import { useEffect, useState } from 'react';
import { CustomerDeleteModal } from './components/CustomerDeleteModal';

export function Customer(){
    const [customers, setCustomers] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);

    const handleCloseModal = () => {
        setEditingCustomer(null);
        fetchCustomers(); // Atualiza a lista de clientes após a edição
      };
    
    const fetchCustomers = async () => {
        const customersData = await getCustomers();
        setCustomers(customersData);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = () => {
        fetchCustomers();
    };

    return(
        <div>
            <CustomerContainer>
                <CustomerContainerTable>
                    <CustomerContainerThead>
                        <h2>Lista de Clientes</h2>
                        <CustomerCreateModal />
                    </CustomerContainerThead>
                    <CustomerTable>
                        <thead>
                            <tr>
                                <td>Identificação</td>
                                <td>Nome do Cliente</td>
                                <td align='center'>Data de Nascimento</td>
                                <td>E-mail do Cliente</td>
                                <td align='center'>Número de Telefone</td>
                                <td align='center'>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            {customers
                            .sort((a, b) => b.id - a.id) // Ordena os clientes pelo ID em ordem decrescente
                            .map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td align='center'>{customer.birth_date}</td>
                                    <td>{customer.email}</td>
                                    <td align='center'>{customer.phone}</td>
                                    <td>
                                    <ActionsIcons>
                                        <Dialog.Root open={editingCustomer === customer} onOpenChange={(open) => !open && setEditingCustomer(null)}>
                                            <Dialog.Trigger asChild>
                                                <EditionButton
                                                    data-tooltip-id="editar-tooltip" 
                                                    data-tooltip-content="Editar"
                                                    onClick={() => setEditingCustomer(customer)}>
                                                
                                                    <PencilSimple size={20} />
                                                    <Tooltip id="editar-tooltip" />
                                                </EditionButton>
                                            </Dialog.Trigger>
                                                {editingCustomer === customer && (
                                                    <CustomerEditModal customerData={customer} onClose={handleCloseModal} />
                                                )}
                                        </Dialog.Root>
                                        <Dialog.Root>
                                            <Dialog.Trigger asChild>
                                                <div data-tooltip-id="deletar-tooltip" data-tooltip-content="Deletar" >
                                                    <CustomerDeleteModal customerId={customer.id} onClose={() => {}} onDelete={handleDelete} />
                                                    <Tooltip id="deletar-tooltip" />
                                                </div>
                                            </Dialog.Trigger>
                                        </Dialog.Root>
                                    </ActionsIcons>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </CustomerTable>
                </CustomerContainerTable>
            </CustomerContainer>
        </div>
    )
}