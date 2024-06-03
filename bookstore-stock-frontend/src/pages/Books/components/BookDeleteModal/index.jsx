import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Toast from '@radix-ui/react-toast';
import PropTypes from "prop-types";
import { CloseButton, Overlay, Content, Title, Description, Button, ButtonGroup, ToastRoot, ToastTitle, ToastDescription, ToastAction, ButtonStyled, ToastViewport } from "./styles";
import { X } from "phosphor-react";
import { Trash } from '@phosphor-icons/react'
import { deleteBook,checkBooksPurchase } from "../../../../business/Book";
import { useState } from "react";

export function BookDeleteModal({ bookId, onClose, onDelete }) {
  const [toastOpen, setToastOpen] = useState(false);

  const handleCloseModal = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleDelete = async () => {
    const hasSales = await checkBooksPurchase(bookId);
    console.log('Livro tem vendas?', hasSales); // Log de depuração

    if (hasSales) {
      setToastOpen(true);
      return;
    }

    try {
      await deleteBook(bookId);
      if (typeof onDelete === "function") {
        onDelete();
      }
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }

  //   await deleteBook(bookId);
  //   if (typeof onDelete === "function") {
  //     onDelete();
  //   }
  //   onClose();
  };

  return (
    <Toast.Provider swipeDirection="right">
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <Button>
              <Trash size={20} />
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <Overlay />
          <Content>
            <Title>Deseja realmente deletar esse Livro?</Title>
            <br />
            <Description>
              Essa ação não pode ser desfeita, isso deletará os dados permanentemente da sua base de dados.
            </Description>
            <ButtonGroup>
              <AlertDialog.Action asChild>
                <Button variant="confirm" onClick={handleDelete}>Sim, deletar esse livro</Button>
              </AlertDialog.Action>
              <AlertDialog.Cancel asChild>
                <Button variant="cancel">Cancelar</Button>
              </AlertDialog.Cancel>
            </ButtonGroup>
            <CloseButton onClick={handleCloseModal} >
              {/* <X size={24} /> */}
            </CloseButton>
          </Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <ToastRoot open={toastOpen} onOpenChange={setToastOpen}>
        <ToastTitle>Livro Não Pode Ser Deletado!</ToastTitle>
        <ToastDescription>
          Não é possível deletar este livro porque ele está atrelado a uma venda.
        </ToastDescription>
        <ToastAction asChild altText="Fechar">
          <ButtonStyled size="small" onClick={() => setToastOpen(false)}>
            <X size={24} />
          </ButtonStyled>
        </ToastAction>
      </ToastRoot>
      <ToastViewport />
    </Toast.Provider>
  );
}

BookDeleteModal.propTypes = {
  bookId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
