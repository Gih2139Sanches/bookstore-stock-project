import { Tooltip } from 'react-tooltip'
import { ActionsIcons, CustomerContainer, CustomerContainerTable, CustomerContainerThead, CustomerTable, EditionButton} from './styles'
import { PencilSimple } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { getBooks } from '../../business/Book'
import { BookCreateModal } from './components/BookCreateModal'
import { BookEditModal } from './components/BookEditModal'
import { BookDeleteModal } from './components/BookDeleteModal'

export function Books(){
    const [books, setBooks] = useState([]);
    const [editingBooks, setEditingBooks] = useState(null);

    const handleCloseModal = () => {
        setEditingBooks(null);
        fetchBooks();
      };

    const fetchBooks = async () => {
        const booksData = await getBooks();
        setBooks(booksData);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = () =>{
        fetchBooks();
    }

    return(
        <div>
            <CustomerContainer>
                <CustomerContainerTable>
                    <CustomerContainerThead>
                        <h2>Lista de Livros</h2>
                        <BookCreateModal />
                    </CustomerContainerThead>
                    <CustomerTable>
                        <thead>
                            <tr>
                                <td>Identificação</td>
                                <td>Título</td>
                                <td>Autor</td>
                                <td>Editora</td>
                                <td>Quantidade</td>
                                <td>Preço</td>
                                <td>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            {books
                            .sort((a, b) => b.id - a.id) // Ordena os clientes pelo ID em ordem decrescente
                            .map((books) => (
                                <tr key={books.id}>
                                    <td>{books.id}</td>
                                    <td>{books.title}</td>
                                    <td>{books.author}</td>
                                    <td>{books.publisher}</td>
                                    <td>{books.quantity}</td>
                                    <td>{books.price}</td>
                                    <td>
                                    <ActionsIcons>
                                        <Dialog.Root open={editingBooks === books} onOpenChange={(open) => !open && setEditingBooks(null)}>
                                            <Dialog.Trigger asChild>
                                                <EditionButton 
                                                    data-tooltip-id="editar-tooltip" 
                                                    data-tooltip-content="Editar"
                                                    onClick={() => setEditingBooks(books)}>

                                                    <PencilSimple size={20} />
                                                    <Tooltip id="editar-tooltip" />
                                                </EditionButton>
                                            </Dialog.Trigger>
                                                {editingBooks === books && (
                                                    <BookEditModal booksData={books} onClose={handleCloseModal} />
                                                )}
                                        </Dialog.Root>
                                        <div data-tooltip-id="deletar-tooltip" data-tooltip-content="Deletar">
                                            <BookDeleteModal bookId={books.id} onClose={handleCloseModal} onDelete={handleDelete} />
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