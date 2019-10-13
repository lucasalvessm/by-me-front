import React, { PureComponent } from 'react';
import { Grid } from 'react-bootstrap';
import * as Actions from './actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DetalheForm, SimpleCard, ValoresConsolidados } from './presentational';
import { CustomButton } from '../../components';
import { change as changeFieldValue } from 'redux-form';

class DetalheContainer extends PureComponent {

  limpaHistorico() {
    this.props.actions.dolimpaHistorico();
    this.props.history.push('/receitas');
  }

  render() {
    const { contexto, actions } = this.props;

    return (
      <div>
        <Grid>
          <CustomButton type={'button'} label={'Voltar'} onClick={() => this.limpaHistorico()} />
          <br />
          <br />
          {contexto && contexto[0] ?
            <div>
              <ValoresConsolidados dadosConsolidados={this.props.dadosConsolidados }/>
              <DetalheForm 
                changeFieldValue={this.props.change}
                materiais={this.props.materiais}
                onAlterarReceita={actions.doAlterarReceita}
                onChangeDadosConsolidados={actions.dochangeDadosConsolidados}
                initialValues={contexto[0]} contexto={contexto} 
                onlimpaDadosConsolidados={actions.dolimpaDadosConsolidados}
                />
              <br />
              <Historico contexto={contexto} />
            </div>
            : null}
        </Grid>
      </div>
    )
  }
}

const Historico = (props) => {
  const { contexto } = props;

  let Cards = contexto.map((cadastro, i) =>
    i !== 0 ?
      <SimpleCard key={cadastro.versao} {...cadastro} />
      : null
  );

  return (
    <div>
      {Cards.length > 1 ?
        <div>
          <h1>Histórico da receita</h1>
          {Cards}
        </div> :
        null
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch),
    change: (p1,p2,p3) => dispatch(changeFieldValue(p1,p2,p3))
  }
}

const mapStateToProps = (state) => {
  return {
    contexto: state.receita.historicoReceita,
    materiais: state.material.materiais,
    dadosConsolidados: state.receita.dadosConsolidadosMaterial
  }
}

export const ReceitaDetalhe = connect(mapStateToProps, mapDispatchToProps)(DetalheContainer);