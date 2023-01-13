import { HeaderContainer } from './styles'
import igniteLogo from '../../assets/igniteLogo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
export function Header() {
  return (
    <HeaderContainer>
  <img src={igniteLogo} 
          alt="Dois triângulo verde que representa a logo da empresa" />
      <nav>
        <NavLink to="/" title="time"> 
        <Timer size={24}/>
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24}/>
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
