import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions/actions';
import { Form, TableF, ValoresConsolidados } from './presentational';
import { doListarMateriais } from '../materiais/actions/actions';

class ReceitaContainer extends Component {

  componentDidMount() {
    this.props.onListarMateriais();
    this.props.actions.doListarReceitas();
  }

  render() {
    const { actions, history } = this.props;
    let receitas = this.props.contexto.receitas;

    return (
      <div>
        <Grid>
          <ValoresConsolidados dadosConsolidados={this.props.dadosConsolidados}/>
          <Form
            onChangeDadosConsolidados={actions.dochangeDadosConsolidados}
            onlimpaDadosConsolidados={actions.dolimpaDadosConsolidados}
            onCriarReceita={actions.doCriarReceita}
            materiais={this.props.materiais}
          />
        </Grid>
        <br />
        <Grid>
          <TableF
            listaReceitas={receitas}
            history={history}
            onDetalharReceita={actions.doDetalharReceita}
          />
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch),
    onListarMateriais: () => dispatch(doListarMateriais())
  }
}

const mapStateToProps = (state) => {
  return {
    contexto: state.receita,
    materiais: state.material.materiais,
    dadosConsolidados: state.receita.dadosConsolidadosMaterial
  }
}

export const Receita = connect(mapStateToProps, mapDispatchToProps)(ReceitaContainer)