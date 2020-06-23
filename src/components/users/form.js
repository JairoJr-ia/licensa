import React, { Component } from 'react';
import api from '../../services/api';
import { Link, withRouter } from 'react-router-dom';

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
            api.put(`/users/${this.state.data.ID}`, this.state.data)
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
                    <div className="form-group">
                        <label>ID</label>
                        <input type="text" name="ID" value={this.state.data.ID} onChange={this.dataChange.bind(this)} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>UserName</label>
                        <input type="text" name="USERNAME" value={this.state.data.USERNAME} onChange={this.dataChange.bind(this)} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link className='btn btn-primary' to={`/users`}>Back</Link>
                </form>
            </div>
        )
    }
}

export default withRouter(UserForm);