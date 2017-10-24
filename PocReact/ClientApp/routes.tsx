import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CustomerList } from './components/customers/CustomerList';
import CustomerCreate from './components/customers/CustomerCreate'; 

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route path="/customers/create" component={CustomerCreate} exact={true} />
    <Route path="/customers" component={CustomerList} exact={true} />
</Layout>;
