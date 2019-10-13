import React, { Component } from 'react'
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

export class Menu extends Component {

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/home'>By Me</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/ingredientes'>
              <NavItem>Ingredientes</NavItem>
            </LinkContainer>
            <LinkContainer to='/receitas'>
              <NavItem>Receitas</NavItem>
            </LinkContainer>
{/*             <LinkContainer to='/vendas'>
              <NavItem>Vendas</NavItem>
            </LinkContainer> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
