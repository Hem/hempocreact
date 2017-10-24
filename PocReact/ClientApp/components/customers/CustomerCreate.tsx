import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import 'isomorphic-fetch';

const DEFAULT_STATE = {
    id: 0,
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    companyName: '',
    phone: '',
    emailAddress: '',
};

class CustomerCreateBase extends React.Component<RouteComponentProps<{}>, Customer> {
    

    handleStateUpdate(key: any) {
        
        return (value: any) => {
            let param:any = {};
            param[key] = value.target.value;
            this.setState(param);
        }
    }

    
    handleSubmit(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        const params = { ...this.state };

        // set the state back to default state...
        this.setState({ ...DEFAULT_STATE });

        axios.post('/api/customer', params)
            .then(r => {
                console.info("POSTED DATA", r);
                // This is a HACK.... typescript and withRouter was not working...
                window.location.href = "/customers";
            });
        
    }

    constructor() {
        super();
        this.handleStateUpdate = this.handleStateUpdate.bind(this);

        this.state = { ...DEFAULT_STATE };        
    }


    


    public render() {
        
        
        return (
            <div>
                <h1>Create Customer</h1>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Title"
                            value={this.state.title}
                            onChange={this.handleStateUpdate('title').bind(this)}
                            maxLength={8} />
                     </div>

                    <div className="form-group">
                        <label>First Name *</label>
                        <input type="text" className="form-control" id="firstName" placeholder="First Name (Required)"
                            value={this.state.firstName}
                            onChange={this.handleStateUpdate('firstName').bind(this)}
                            maxLength={50}/>
                    </div>

                    <div className="form-group">
                        <label>Middle Name *</label>
                        <input type="text" className="form-control" id="middleName" placeholder="Middle Name (Required)"
                            value={this.state.middleName}
                            onChange={this.handleStateUpdate('middleName').bind(this)}
                            maxLength={50}
                        />
                    </div>


                    <div className="form-group">
                        <label>Last Name *</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Last Name (Required)"
                            value={this.state.lastName}
                            onChange={this.handleStateUpdate('lastName').bind(this)}
                            maxLength={50}
                            />
                    </div>

                    <div className="form-group">
                        <label>Suffix</label>
                        <input type="text" className="form-control" id="suffix" placeholder="Suffix"
                            value={this.state.suffix}
                            onChange={this.handleStateUpdate('suffix').bind(this)}
                            maxLength={10}
                            />
                    </div>

                    <div className="form-group">
                        <label>Company Name *</label>
                        <input type="text" className="form-control" id="companyName" placeholder="Company Name (Required)"
                            value={this.state.companyName}
                            onChange={this.handleStateUpdate('companyName').bind(this)}
                            maxLength={100}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={
                        !this.state.firstName ||
                        !this.state.lastName ||
                        !this.state.middleName ||
                        !this.state.companyName} >Submit</button>
                    
                </form>
                
            </div>)
            ;
    }
}

export default withRouter(CustomerCreateBase);

interface Customer {
    id: number;
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    companyName: string;
    phone: string;
    emailAddress: string;
}
