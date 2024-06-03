import * as AlertDialog from "@radix-ui/react-alert-dialog";
import PropTypes from "prop-types";
import { CloseButton, Overlay, Content, Title, Description, Button, ButtonGroup } from "./styles";
// import { X } from "phosphor-react";
import { Trash } from '@phosphor-icons/react'
import { deletePurchasesHistoric } from "../../../../business/PurchasesHistoric";
// import { ToastProvider, Toast, ToastContainer } from '@radix-ui/react-toast';

export function PurchaseDeleteModal({ purchaseId, onClose, onDelete }) {
  // const [showToast, setShowToast] = useState(false);

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleDelete = async () => {
    // const hasSales = await checkCustomerPurchase(customerId);
    // console.log('Cliente tem vendas?', hasSales);

    // if (hasSales) {
    //   alert('Não é possível deletar este cliente porque ele está atrelado a uma venda.');
    //   return;
    // }

    // try {
    //   await deleteCustomer(customerId);
    //   if (typeof onDelete === "function") {
    //     onDelete();
    //   }
    //   handleClose();
    // } catch (error) {
    //   console.error('Erro ao deletar cliente:', error); // Log de erro
    // }

    await deletePurchasesHistoric(purchaseId);
    if (typeof onDelete === "function") {
      onDelete();
    }
    handleClose();
  };

  return (
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <Button>
              <Trash size={20} />
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <Overlay />
          <Content>
            <Title>Deseja realmente deletar essa Venda?</Title>
            <br />
            <Description>
              Essa ação não pode ser desfeita, isso deletará os dados permanentemente da sua base de dados.
            </Description>
            <ButtonGroup>
              <AlertDialog.Action asChild>
                <Button variant="confirm" onClick={handleDelete}>Sim, deletar essa venda</Button>
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
  );
}

PurchaseDeleteModal.propTypes = {
  purchaseId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
