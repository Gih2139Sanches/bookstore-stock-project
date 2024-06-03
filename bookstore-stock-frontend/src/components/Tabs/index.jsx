import { BookBookmark, Users, CashRegister } from '@phosphor-icons/react'
import { ContainerLinks, ContainerTabs } from './styles'
import { Link, useLocation  } from 'react-router-dom'

export function Tabs(){
    const location = useLocation();

    return(
        <ContainerTabs>
            <ContainerLinks>
                <Link className={`button ${location.pathname === '/clientes' ? 'active' : ''}`} to="/clientes">
                    <Users size={20}/>
                    Clientes
                </Link>
                <Link className={`button ${location.pathname === '/livros' ? 'active' : ''}`} to="/livros">
                    <BookBookmark size={20}/>
                    Livros
                </Link>
                <Link className={`button ${location.pathname === '/vendas' ? 'active' : ''}`} to="/vendas">
                  <CashRegister size={20}/>
                    Venda de Livros
                </Link>
            </ContainerLinks>
        </ContainerTabs>
    )
}