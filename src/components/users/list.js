import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const $ = require('jquery');
$.dataTable = require('datatables.net');

export default class UserTable extends Component {

    state = {
        _users : [],  
    }

    async componentDidMount() {
        await this.getUser();
        this.$el = $(this.el);
        this.$el.DataTable({});        
    }

    async getUser() {
        const response = await api.get('/users');    
        this.setState({ _users : response.data });
    }

    onDelete(id) {
        api.delete(`/users/${id}`)
        .then(res => {
            console.log(res);
            this.getUser();
        })
    }

    render() {
        return(
            <div className='col-sm-12'>
                <br></br>
                <h3>Lista de Usuários ( {this.state._users.length} )</h3>
                <br></br>
                <div className="row">
                    <div className="col-sm-12">
                        <Link to={'/users/new'} className="btn btn-success">Novo</Link>
                    </div>
                </div>
                <br></br>
                <table className="display" width="100%" ref={el => this.el = el}>
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">CNPJ</th>
                        <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state._users.map(user => (
                            <tr key={user.CODIGO}>
                                <th scope="row">{user.CODIGO}</th>
                                <td>{user.NOME}</td>
                                <td>{user.CNPJ}</td>
                                <td>
                                    <Link to={`/users/${user.CNPJ}`}> <i className="fa fa-pencil"></i> </Link> 
                                    <Link to={'/users'}  onClick={() => this.onDelete(user.ID)}> <i className="fa fa-trash-o"></i> </Link>
                                </td>
                            </tr>    
                        ))}
                    </tbody>
                </table>
            </div>
            
        )
    }
}