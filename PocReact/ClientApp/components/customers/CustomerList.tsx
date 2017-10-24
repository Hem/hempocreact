import * as React from 'react';
import { RouteComponentProps, Router } from 'react-router';
import { Link } from 'react-router-dom'

import 'isomorphic-fetch';

interface CustomerListModel {
    customers: Customer[];
    loading: boolean;
    filter: string;
}

export class CustomerList extends React.Component<RouteComponentProps<{}>, CustomerListModel> {

    constructor() {
        super();
        this.handleLoadRecords.bind(this);
        this.handleFilterChange.bind(this);
        this.state = { customers: [], filter: '', loading: false };

        this.handleLoadRecords();
    }


    handleLoadRecords() {
        const self = this;
        self.setState({ customers: [], loading: true });

        const params = new URLSearchParams();
        params.append('filter', this.state.filter);

        fetch('api/customer?' + params.toString() )
            .then(response => response.json() as Promise<Customer[]>)
            .then(data => {
                self.setState({ customers: data, loading: false });
            });


    }

    handleFilterChange(event: any) {
        this.setState({ filter: event.target.value });
    }
    

    public render() {


        if (this.state.loading) {
            return <div>
                <h1>Customers</h1>
                <p><em>Loading...</em></p>
            </div>;
        }
        
        const customers = this.state.customers;
        const customerRow = (customers.map(customer =>
            <tr key={customer.id}>
                <td>{customer.title}</td>
                <td>{customer.firstName}</td>
                <td>{customer.middleName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.suffix}</td>
                <td>{customer.companyName}</td>
            </tr>
        ));

        return (
            <div>


                <h1>
                    Customers
                 </h1>

                <div className="text-right"><Link to="/customers/create"> CREATE </Link></div>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Last Name: </th>
                            <th colSpan={2}>
                                <input type="text" value={this.state.filter} onChange={this.handleFilterChange.bind(this)} />
                            </th>
                            <th className="text-right"><button onClick={this.handleLoadRecords.bind(this)}>Load</button></th>                            
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>First Name</th>
                            <th>Middle Name></th>
                            <th>Last Name</th>
                            <th>Suffix</th>
                            <th>Comapny</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerRow}
                    </tbody>
                </table>
            </div>)
            ;
    }
}

interface Customer {
    id: number;
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    companyName: string;
}
