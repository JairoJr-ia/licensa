import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const $ = require('jquery');
$.dataTable = require('datatables.net');

export default class categoriaTable extends Component {

state = {
_categoria : [],
}

async componentDidMount() {
await this.getcategoria();
this.$el = $(this.el);
this.$el.DataTable({});
}

async getcategoria() {
const response = await api.get('/categoria');
this.setState({ _categoria : response.data });
}

onDelete(id) {
api.delete(`/categoria/${id}`)
.then(res => {
console.log(res);
this.getcategoria();
})
}

render() {
return(
<div className='col-sm-12'>
<br></br>
<h3>Lista de categoria ( {this.state._categoria.length} )</h3>
<br></br>
<div className="row">
<div className="col-sm-12">
<Link to={'/categoria/new'} className="btn btn-success">Novo</Link>
</div>
</div>
<br></br>
<table className="display" width="100%" ref={el => this.el = el}>
<thead>
<tr>
<th>ID</th>
<th>DESCRICAO</th>
<th scope="col">ACOES</th>
</tr>
</thead>
<tbody>
{this.state._categoria.map(categoria => (
<tr key={categoria.ID}>
<td>{categoria.ID}</td>
<td>{categoria.DESCRICAO}</td>
<td>
<Link to={`/categoria/${categoria.ID}`}> <i className="fa fa-pencil"></i> </Link>
<Link to={'/categoria'}  onClick={() => this.onDelete(categoria.ID)}> <i className="fa fa-trash-o"></i> </Link>
</td>
</tr>
))}
</tbody>
</table>
</div>

)
}
}
