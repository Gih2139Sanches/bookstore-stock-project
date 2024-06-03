import styled, { css, keyframes } from "styled-components";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
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
