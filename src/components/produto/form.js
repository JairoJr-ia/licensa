import React, { Component } from 'react';
import api from '../../services/api';
import { Link, withRouter } from 'react-router-dom';

class produtoForm extends Component {

    state = {
        data: {
            ID: '',
            DESCRICAO: '',
            CATEGORIA: '',
            PRECO: '',
            CATEGORIA_DESCRICAO : '',
        },
        categorias : [],
        flags: {
            new: null
        }
    }

    dataChange(ev) {
        let name = [ev.target.name];
        let value = ev.target.value;
        this.setState(prevState => ({
            data: { ...prevState.data, [name]: value }
        }))
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        if (typeof id !== "undefined") {
            await api.get(`/produto/${id}`)
                .then(res => {
                    this.setState({ data: res.data });
                    this.setState({ flags: { new: false } });
                })
        } else {
            this.setState({ flags: { new: true } });
        }

        await api.get('/categoria')
        .then(res => {
            this.setState({ categorias : res.data })
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.flags.new) {
            api.post('/produto', this.state.data)
                .then(res => {
                    this.props.history.push('/produto');
                })
        } else {
            api.put(`/produto/${this.state.data.ID}`, this.state.data)
                .then(res => {
                    this.props.history.push('/produto');
                })
        }
    }

    render() {
        return (
            <div className="col-sm-12 col-md-8">
                <h1>Editar produto</h1>
                <form onSubmit={this.handleSubmit}>
                    <br></br>
                    <div className="row">
                        <div className="col-sm-2">
                            <div className="form-group">
                                <label>ID</label>
                                <input type="text" name="ID" value={this.state.data.ID} onChange={this.dataChange.bind(this)} className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-10">
                            <div className="form-group">
                                <label>DESCRICAO</label>
                                <input type="text" name="DESCRICAO" value={this.state.data.DESCRICAO} onChange={this.dataChange.bind(this)} className="form-control" />
                            </div>    
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-sm-4'>
                            <div className="form-group">
                                <label>PRECO</label>
                                <input type="text" name="PRECO" value={this.state.data.PRECO} onChange={this.dataChange.bind(this)} className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="form-group">
                                <label>CATEGORIA</label>
                                <select 
                                    className="custom-select" 
                                    name="CATEGORIA" 
                                    onChange={this.dataChange.bind(this)} 
                                    value={this.state.data.CATEGORIA}>
                                    {this.state.categorias.map(categoria => (
                                        <option key={categoria.ID} value={categoria.ID}>{categoria.DESCRICAO}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-sm-4">
                            <button type="submit" className="btn btn-success">Confirmar</button>
                            &nbsp;&nbsp;<Link className='btn btn-light' to={`/produto`}>Voltar</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(produtoForm);
