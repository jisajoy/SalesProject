import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import {CustomerHome} from './components/Customer/CustomerHome'
import {ProductHome} from './components/Product/ProductHome'
import {StoreHome} from './components/Store/StoreHome'
import {SaleHome} from './components/Sale/SaleHome'
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
         <Route exact path='/' component={Home} />
        <Route path='/customer' component={CustomerHome} />
        <Route path='/product' component={ProductHome}/>
        <Route path='/store' component={StoreHome}/>
        <Route path='/sale' component={SaleHome}/>
      </Layout>
    );
  }
}
