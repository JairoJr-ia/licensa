import React, { Component } from 'react';
import api from '../../services/api';
import { Link, withRouter } from 'react-router-dom';

class categoriaForm extends Component {

    state = {
        data: {
            ID: '',
            DESCRICAO: '',
        },
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
            await api.get(`/categoria/${id}`)
                .then(res => {
                    this.setState({ data: res.data });
                    this.setState({ flags: { new: false } });
                })
        } else {
            this.setState({ flags: { new: true } });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.flags.new) {
            api.post('/categoria', this.state.data)
                .then(res => {
                    this.props.history.push('/categoria');
                })
        } else {
            api.put(`/categoria/${this.state.data.ID}`, this.state.data)
                .then(res => {
                    this.props.history.push('/categoria');
                })
        }
    }

    render() {
        return (
            <div className="col-sm-12">
                <h1>Editar categoria</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>ID</label>
                        <input type="text" name="ID" value={this.state.data.ID} onChange={this.dataChange.bind(this)} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>DESCRICAO</label>
                        <input type="text" name="DESCRICAO" value={this.state.data.DESCRICAO} onChange={this.dataChange.bind(this)} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link className='btn btn-primary' to={`/categoria`}>Back</Link>
                </form>
            </div>
        )
    }
}

export default withRouter(categoriaForm);
