import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserTable from './components/users/list';
import UserForm from './components/users/form';
import Principal from './components/principal';
// import produtoTable from './components/produto/list';
// import categoriaTable from './components/categoria/list';
// import produtoForm from './components/produto/form';
// import categoriaForm from './components/categoria/form';

const Routes = () => (
        <Switch>
            <Route exact path='/' component={Principal} />
            <Route exact path='/users/new' component={UserForm} />
            <Route exact path='/users' component={UserTable} />
            <Route exact path='/users/:id' component={UserForm} />
            {/* <Route exact path='/produto' component={produtoTable} />
            <Route exact path='/produto/new' component={produtoForm} />
            <Route exact path='/produto/:id' component={produtoForm} />
            <Route exact path='/categoria' component={categoriaTable} />
            <Route exact path='/categoria/new' component={categoriaForm} />
            <Route exact path='/categoria/:id' component={categoriaForm} /> */}
        </Switch>
)

export default Routes;