import React, { Component } from 'react'
import { connect } from 'react-redux';
import { doListarMateriais } from './materiais/actions/actions';
// import { doReceitas } from './receitas/actions/actions';

class HomeContainer extends Component {

    componentWillMount() {
        this.props.onListarMateriais()
        // this.props.onListarReceitas()
    }

    render() {

        return (
            <div className="container"><h1>Bem vindo(a) a By Me!</h1></div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onListarMateriais: () => dispatch(doListarMateriais())
        // ,onListarReceitas: () => dispatch(doListarReceitas())
    }
}

export const Home = connect(null, mapDispatchToProps)(HomeContainer)