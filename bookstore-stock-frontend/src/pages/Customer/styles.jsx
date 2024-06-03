import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";

export const CustomerContainer = styled.main`
    width: 100%;
    max-width: 1500px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;
    margin-bottom: 4rem;
`

export const CustomerContainerThead = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -2rem;
    
    button{
        display: flex;
        align-items: center;
        border: none;
        padding: 0.8rem 0.8rem;
        border-radius: 6px;
        font-size: 14px;
        background-color: ${defaultTheme['green-300']};
        transition: 0.1s;

        &:hover{
            background-color: ${defaultTheme['green-500']};
        }

        svg {
            margin-right: 0.5rem; 
        }
    }
`

export const CustomerContainerTable = styled.div`
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 2.5rem 2.5rem;
    border-radius: 6px;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    background-color: ${defaultTheme["white"]};
`

export const CustomerTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;
    /* border: 1px solid #000; */

    thead td{
        background-color: #E6E6FA;
        font-weight: bold;
        font-size: 15px;
        /* border-bottom: 1px solid #ccc; */

        &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }

    tbody tr{
        &:last-child{
            border-bottom: none;
        }
        &::hover{
            background-color: #ccc;
        }
    }

    tbody td{
        border-bottom: 1px solid #ccc;
        /* border-left: 1px solid #ccc; */
        /* border-right: 1px solid #ccc; */

        &:last-child{
            /* border: none; */
            /* border-top-right-radius: 6px; */
            /* border-bottom-right-radius: 6px; */
        }
    }

    td{
        padding: 1.25rem 2rem;
        background-color: ${defaultTheme["white"]};

        &:first-child {
            /* border-top-left-radius: 6px; */
            /* border-bottom-left-radius: 6px; */
        }

        &:last-child {
            /* border-top-right-radius: 6px; */
            /* border-bottom-right-radius: 6px; */
        }
    }
`

export const ActionsIcons = styled.div`
    display: flex;
    gap: 1.2rem;
    justify-content: center;
    align-items: center;

    button{
        border: none;
        border-radius: 4px;
        padding: 5px 7px;
    }
`
export const EditionButton = styled.button`
    background-color: #B5AFFF;
    cursor: pointer;
    transition: 0.1s;

    &:hover{
        background-color: #958AFF;
    }
`

export const Footer = styled.footer`
    margin-top: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: gray;
`