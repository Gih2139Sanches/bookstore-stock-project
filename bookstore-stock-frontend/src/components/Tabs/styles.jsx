import styled from "styled-components";

export const ContainerTabs = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
    margin-bottom: -2rem;
`
export const ContainerLinks = styled.div`
    display: flex;
    gap: 10px;

    .button {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fff;
        color: #555;
        text-decoration: none;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
    }

    .button svg {
        margin-right: 8px;
    }

    .button.active {
        background-color: #7b61ff;
        color: #fff;
        border-color: #7b61ff;
    }

    .button:hover {
        background-color: #eee;
    }

    .button.active:hover {
        background-color: #684edc;
    }
`