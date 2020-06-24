import React, { Component } from 'react';
import api from '../../services/api';
import { Link, withRouter } from 'react-router-dom';
import './style.css'; 

class UserForm extends Component {

    state = {
        data : {
            ID : '',
            USERNAME : '',
        },
        flags : {
            new : null
        } 
    }

    dataChange(ev) {
        let name = [ev.target.name];
        let value = ev.target.value;
        this.setState(prevState => ({
            data : { ...prevState.data, [name] : value }
        }))
    }
    
    async componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id)
        if (typeof id !== "undefined") {
            await api.get(`/users/${id}`)
            .then(res => {
                this.setState({ data : res.data });
                this.setState({ flags : { new : false }});       
            })    
        } else {
            this.setState({ flags : { new : true }});
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.flags.new) {
            api.post('/users', this.state.data)
            .then(res => {
                this.props.history.push('/users');
            })
        } else {
            api.put(`/users/${this.state.data.CODIGO}`, this.state.data)
            .then(res => {
                this.props.history.push('/users');
            })    
        }  
    }

    render() {
        return (
            <div className="col-sm-12">
                <h1>Editar Usuário</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="Form">

                        <div className="form-group codigo">
                            <label>Código</label>
                            <input type="text" name="CODIGO" value={this.state.data.CODIGO} 
                                    onChange={this.dataChange.bind(this)} className="form-control" />
                        
                        </div>

                        <div className="form-group CNPJ">
                            <label>CNPJ</label>
                            <input type="text" id="CNPJ" name="CNPJ" value={this.state.data.CNPJ}
                                onkeydown="Mask.apply(this, 'cpfCnpj')" 
                                onChange={this.dataChange.bind(this)} className="form-control" />
                        </div>
                        <div className="form-group Vencimento">
                            <label>Vencimento</label>
                            <input type="date" name="VENCIMENTO" value={this.state.data.VENCIMENTO} 
                                onChange={this.dataChange.bind(this)}
                        
                                className="form-control" />
                        </div>
                        
                    </div>   
                    
                    

                    <div className="form-group nome">
                        <label>Nome</label>
                        <input type="text" name="NOME" value={this.state.data.NOME} 
                             onChange={this.dataChange.bind(this)} className="form-control" />
                    </div>

                       
                                       
                    <div className="Submit">
                        <Link style={{ textDecoration: 'none'}} className='button back' to={`/users`}>Voltar</Link>
                        <button type="submit" className="button sub">Salvar</button>
                        
                    </div>                                    
                    
                </form>

            </div>
        )
    }
}

export default withRouter(UserForm);