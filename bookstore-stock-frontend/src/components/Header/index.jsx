import { HeaderContainer } from "./styles";
// import { Books } from '@phosphor-icons/react'

export function Header(){
    return(
        <HeaderContainer>
            {/* <Books size={34}/>
            <h1>Criando Histórias</h1> */}
            <img src="./src/assets/livraria_logo-purple.png" alt="" />
        </HeaderContainer>
    )
}