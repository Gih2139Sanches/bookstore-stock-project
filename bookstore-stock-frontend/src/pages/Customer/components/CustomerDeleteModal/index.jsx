import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Toast from '@radix-ui/react-toast';
import PropTypes from "prop-types";
import { checkCustomerPurchase, deleteCustomer } from "../../../../business/Customer";
import { CloseButton, Overlay, Content, Title, Description, Button, ButtonGroup, ToastRoot, ToastTitle, ToastDescription, ToastAction, ButtonStyled, ToastViewport } from "./styles";
import { X } from "phosphor-react";
import { Trash } from '@phosphor-icons/react'
import { useState } from "react";

export function CustomerDeleteModal({ customerId, onClose, onDelete }) {
  const [toastOpen, setToastOpen] = useState(false);

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleDelete = async () => {
    const hasSales = await checkCustomerPurchase(customerId);
    // console.log('Cliente tem vendas?', hasSales);

    // if (hasSales) {
    //   alert('Não é possível deletar este cliente porque ele está atrelado a uma venda.');
    //   return;
    // }

    if (hasSales) {
      setToastOpen(true);
      return;
    }

    try {
      await deleteCustomer(customerId);
      if (typeof onDelete === "function") {
        onDelete();
      }
      handleClose();
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }

    // await deleteCustomer(customerId);
    // if (typeof onDelete === "function") {
    //   onDelete();
    // }
    // handleClose();
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
            <Title>Deseja realmente deletar esse Cliente?</Title>
            <br />
            <Description>
              Essa ação não pode ser desfeita, isso deletará os dados permanentemente da sua base de dados.
            </Description>
            <ButtonGroup>
              <AlertDialog.Action asChild>
                <Button variant="confirm" onClick={handleDelete}>Sim, deletar esse cliente</Button>
              </AlertDialog.Action>
              <AlertDialog.Cancel asChild>
                <Button variant="cancel">Cancelar</Button>
              </AlertDialog.Cancel>
            </ButtonGroup>
            <CloseButton onClick={handleClose}>
              {/* <X size={24} /> */}
            </CloseButton>
          </Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <ToastRoot open={toastOpen} onOpenChange={setToastOpen}>
        <ToastTitle>Cliente Não Pode Ser Deletado!</ToastTitle>
        <ToastDescription>
          Não é possível deletar este cliente porque ele está atrelado a uma venda.
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

CustomerDeleteModal.propTypes = {
  customerId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
