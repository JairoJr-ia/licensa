import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const $ = require('jquery');
$.dataTable = require('datatables.net');

export default class produtoTable extends Component {

    state = {
        _produto: [],
    }

    async componentDidMount() {
        await this.getproduto();
        this.$el = $(this.el);
        this.$el.DataTable({});
    }

    async getproduto() {
        const response = await api.get('/produto');
        this.setState({ _produto: response.data });
    }

    onDelete(id) {
        api.delete(`/produto/${id}`)
            .then(res => {
                console.log(res);
                this.getproduto();
            })
    }

    render() {
        return (
            <div className='col-sm-12'>
                <br></br>
                <h3>Lista de produto ( {this.state._produto.length} )</h3>
                <br></br>
                <div className="row">
                    <div className="col-sm-12">
                        <Link to={'/produto/new'} className="btn btn-success">Novo</Link>
                    </div>
                </div>
                <br></br>
                <table className="display" width="100%" ref={el => this.el = el}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DESCRICAO</th>
                            <th>CATEGORIA</th>
                            <th>PRECO</th>
                            <th scope="col">ACOES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state._produto.map(produto => (
                            <tr key={produto.ID}>
                                <td>{produto.ID}</td>
                                <td>{produto.DESCRICAO}</td>
                                <td>{produto.CATEGORIA_DESCRICAO}</td>
                                <td>{produto.PRECO}</td>
                                <td>
                                    <Link to={`/produto/${produto.ID}`}> <i className="fa fa-pencil"></i> </Link>
                                    <Link to={'/produto'} onClick={() => this.onDelete(produto.ID)}> <i className="fa fa-trash-o"></i> </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        )
    }
}
