import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import SematicUiNavBar from './SematicUiNavBar';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <SematicUiNavBar />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
