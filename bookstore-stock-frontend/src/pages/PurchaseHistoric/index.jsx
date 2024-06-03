import { Tooltip } from 'react-tooltip'
import { ActionsIcons, CustomerContainer, CustomerContainerTable, CustomerContainerThead, CustomerTable, EditionButton} from './styles'
import { PencilSimple } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { getPurchasesHistorics } from '../../business/PurchasesHistoric'
import { PurchaseCreateModal } from './components/PurchaseCreateModal'
import { PurchaseEditModal } from './components/PurchaseEditModal'
import { getCustomers } from '../../business/Customer'
import { getBooks } from '../../business/Book'
import { PurchaseDeleteModal } from './components/PurchaseDeleteModal'

export function PurchaseHistoric(){
    const [purchase, setPurchase] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [books, setBooks] = useState([]);
    const [editingPurchase, setEditingPurchase] = useState(null);

    const handleCloseModal = () => {
        setEditingPurchase(null);
        fetchPurchase();
    };

      const fetchPurchase = async () => {
        const purchaseData = await getPurchasesHistorics();
        setPurchase(purchaseData);

        // console.log(purchaseData);
    };

    const fetchCustomers = async () => {
        const customerData = await getCustomers();
        setCustomers(customerData);
    };

    const fetchBooks = async () => {
        const bookData = await getBooks();
        setBooks(bookData);
    };

    useEffect(() => {
        fetchPurchase();
        fetchCustomers();
        fetchBooks();
    }, []);

    const handleDelete = () => {
        fetchPurchase();
    };

    return(
        <div>
            <CustomerContainer>
                <CustomerContainerTable>
                    <CustomerContainerThead>
                        <h2>Lista de Vendas</h2>
                        <PurchaseCreateModal />
                    </CustomerContainerThead>
                    <CustomerTable>
                        <thead>
                            <tr>
                                <td>Identificação</td>
                                <td>Data da Venda</td>
                                <td>Cliente</td>
                                <td>Livro</td>
                                <td>Quantidade</td>
                                <td>Preço</td>
                                <td width="16%">Forma de Pagamento</td>
                                <td align='center'>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            {purchase
                            .sort((a, b) => b.id - a.id) 
                            .map((purchase) => (
                                <tr key={purchase.id}>
                                    <td>{purchase.id}</td>
                                    <td>{purchase.purchase_date}</td>
                                    <td>{purchase.customer_fk.name}</td>
                                    <td>{purchase.book_fk.title}</td>
                                    <td>{purchase.quantity}</td>
                                    <td>{purchase.price}</td>
                                    <td>{purchase.method_payment}</td>
                                    <td>
                                    <ActionsIcons>
                                        <Dialog.Root open={editingPurchase === purchase} onOpenChange={(open) => !open && setEditingPurchase(null)}>
                                            <Dialog.Trigger asChild>
                                                <EditionButton 
                                                    data-tooltip-id="editar-tooltip" 
                                                    data-tooltip-content="Editar"
                                                    onClick={() => setEditingPurchase(purchase)}>

                                                    <PencilSimple size={20} />
                                                    <Tooltip id="editar-tooltip" />
                                                </EditionButton>
                                            </Dialog.Trigger>
                                            {editingPurchase === purchase && (
                                                <PurchaseEditModal purchaseData={purchase} customers={customers} books={books} onClose={handleCloseModal} />
                                            )}
                                        </Dialog.Root>
                                        <div data-tooltip-id="deletar-tooltip" data-tooltip-content="Deletar">
                                            <PurchaseDeleteModal purchaseId={purchase.id} onClose={() => {}} onDelete={handleDelete} />
                                            <Tooltip id="deletar-tooltip" />
                                        </div>
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