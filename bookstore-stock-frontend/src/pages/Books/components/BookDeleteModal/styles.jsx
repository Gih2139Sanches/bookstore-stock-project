import styled, { css, keyframes } from "styled-components";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Toast from '@radix-ui/react-toast';
import { defaultTheme } from "../../../../styles/themes/default";

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const Overlay = styled(AlertDialog.Overlay)`
  background: rgba(0, 0, 0, 0.75);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const Content = styled(AlertDialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }
`;

export const Title = styled(AlertDialog.Title)`
  margin: 0;
  color: #211f26;
  font-size: 17px;
  font-weight: 500;
`;

export const Description = styled(AlertDialog.Description)`
  margin-bottom: 20px;
  color: #65636d;
  font-size: 15px;
  line-height: 1.5;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
  cursor: pointer;

  background-color: #FF6C47;
    transition: 0.1s;

    &:hover{
        background-color: #eb4c1b;
    }

  ${(props) =>
    props.variant === "cancel" &&
    css`
      background-color: #eae7ec;
      color: #65636d;
      &:hover {
        background-color: #e3dfe6;
      }
      &:focus {
        box-shadow: 0 0 0 2px #d0cdd7;
      }
    `}

  ${(props) =>
    props.variant === "confirm" &&
    css`
      background-color: #ffdbdc;
      color: #ce2c31;
      &:hover {
        background-color: #ffcdce;
      }
      &:focus {
        box-shadow: 0 0 0 2px #f4a9aa;
      }
    `}
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 25px;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${defaultTheme["green-500"]};
`;

const VIEWPORT_PADDING = 25;

export const ToastViewport = styled(Toast.Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: ${VIEWPORT_PADDING}px;
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;

export const hide = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

export const slideIn = keyframes`
  from { transform: translateX(calc(100% + ${VIEWPORT_PADDING}px)); }
  to { transform: translateX(0); }
`;

export const swipeOut = keyframes`
  from { transform: translateX(var(--radix-toast-swipe-end-x)); }
  to { transform: translateX(calc(100% + ${VIEWPORT_PADDING}px)); }
`;

export const ToastRoot = styled(Toast.Root)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: "title action" "description action";
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;

  &[data-state="open"] {
    animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state="closed"] {
    animation: ${hide} 100ms ease-in;
  }
  &[data-swipe="move"] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }
  &[data-swipe="cancel"] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }
  &[data-swipe="end"] {
    animation: ${swipeOut} 100ms ease-out;
  }
`;

export const ToastTitle = styled(Toast.Title)`
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: #FF6C47;
  font-size: 15px;
`;

export const ToastDescription = styled(Toast.Description)`
  grid-area: description;
  margin: 0;
  color: darkslategray;
  font-size: 13px;
  line-height: 1.3;
`;

export const ToastAction = styled(Toast.Action)`
  grid-area: action;
`;

export const ButtonStyled = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #000;
  padding: 0 10px;
  height: 25px;
  &:hover {
    color: #FF6C47;
  }
  &:focus {
    color: #FF6C47;
  }
`;