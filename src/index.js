import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

//rotas
import {
    BrowserRouter,
    Route,
    Redirect
} from 'react-router-dom';

//componentes
import {
    Material,
    MaterialDetalhe,
    Login,
    Receita,
    ReceitaDetalhe,
    Home
} from './features';


//redux
import { createStore, applyMiddleware } from 'redux';
import reducers from './features/reducers';
import { Provider } from 'react-redux';//libera a store em toda a aplicação
import thunk from 'redux-thunk';//permite que as actions retornem funções que retornem o tipo da ação (lazy evaluation)

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route exact path='/' render={() => 
                        <Redirect to='/home' />
                }/>
                <Route path='/login' component={Login} />
                <Route path='/home' component={Home} />
                <Route path='/ingredientes' component={Material} />
                <Route path='/ingrediente/detalhe/:codigo' component={MaterialDetalhe} />
                <Route path='/receitas' component={Receita} />
                <Route path='/receita/detalhe/:id' component={ReceitaDetalhe} />
            </App>
        </BrowserRouter>
    </Provider>, document.getElementById('root'))
registerServiceWorker()
