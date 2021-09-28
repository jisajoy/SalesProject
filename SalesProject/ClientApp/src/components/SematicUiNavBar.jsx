import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'
import "./Navbar.css";

export default class SematicUiNavBar extends Component {
  state = { activeItem: '/' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div className="ui inverted menu">
      <Menu secondary className = "navbar-button">
      <Menu.Item
          as={NavLink} to="/"
          name='React'
          active={activeItem === '/'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/customer"
          name='Customers'
          active={activeItem === 'customer'}
          onClick={this.handleItemClick}
        />
         <Menu.Item
          as={NavLink} to="/product"
          name='Products'
          active={activeItem === 'Product'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/store"
          name='Stores'
          active={activeItem === 'store'}
          onClick={this.handleItemClick}
        />
          <Menu.Item
          as={NavLink} to="/sale"
          name='Sales'
          active={activeItem === 'sale'}
          onClick={this.handleItemClick}
        />
      </Menu>
      </div>
    )
  }
}