import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import styled from "styled-components";
import { defaultTheme } from "../../../../styles/themes/default";

export const Overley = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    /* background: #eeeeee3b; */
    background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: ${defaultTheme["white"]};

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    form{
        margin-top: 2rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        input{
            border-radius: 6px;
            border: 0;
            background: ${defaultTheme["white-lavander"]};
            color: ${defaultTheme["black-text"]};
            padding: 1rem;

            &::placeholder{
                color: ${defaultTheme["gray-500"]};
            }
        }

        button[type="submit"]{
            height: 58px;
            border: 0;
            background: ${defaultTheme["green-500"]};
            color: ${defaultTheme["white"]};
            font-weight: bold;
            padding: 0 1.25rem;
            border-radius: 6px;
            margin-top: 1.5rem;
            cursor: pointer;

            &:disabled{
                opacity: 0.6;
                cursor: not-allowed;
            }

            &:not(:disabled)&:hover{
                background: ${defaultTheme["green-700"]};
                transition: backgorund-color 0.2s;

            }
        }
    }
`

export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    background: transparent;
    border: 0;
    top: 1.5rem;
    right: 1.5rem;
    line-height: 0;
    cursor: pointer;
    color: ${defaultTheme["green-500"]};
`

export const SelectTrigger = styled(Select.Trigger)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0.5rem;
  font-size: 15px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: ${defaultTheme["white-lavander"]};
  color: #6247dc; 
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.43);  */

  /* &:hover {
    background-color: #ececec;
  } */

  &:focus {
    box-shadow: 0 0 0 1.5px black;
  }

  &[data-placeholder] {
    color: ${defaultTheme["gray-500"]}; 
  }
`;

export const SelectIcon = styled(Select.Icon)`
  color: #684edc;
`;

export const SelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

export const SelectViewport = styled(Select.Viewport)`
  padding: 5px;
`;

export const StyledItem = styled(Select.Item)`
  font-size: 13px;
  line-height: 1;
  color: #000;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;

  &[data-disabled] {
    color: #a3a3a3;
    pointer-events: none;
  }

  &[data-highlighted] {
    outline: none;
    background-color: #7b61ff; 
    color: #fafafa; 
  }
`;

export const SelectLabel = styled(Select.Label)`
  padding: 0 25px;
  font-size: 12px;
  line-height: 25px;
  color: #737373; 
`;

export const SelectSeparator = styled(Select.Separator)`
  height: 1px;
  background-color: #d6d6d6; 
  margin: 5px;
`;

export const SelectScrollUpButton = styled(Select.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: #6b21a8; 
  cursor: default;
`;

export const SelectScrollDownButton = styled(Select.ScrollDownButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: #6b21a8; 
  cursor: default;
`;