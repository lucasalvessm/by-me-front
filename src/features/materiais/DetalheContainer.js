import React, { PureComponent } from 'react';
import { Grid } from 'react-bootstrap';
import * as Actions from './actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DetalheForm, SimpleCard } from './presentational';
import { CustomButton } from '../../components';

class DetalheContainer extends PureComponent {

  limpaHistorico() {
    this.props.actions.dolimpaHistorico();
    this.props.history.push('/ingredientes');
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
              <DetalheForm
                initialValues={contexto[0]}
                onAlterarMaterial={actions.doAlterarMaterial}
                ontexto={contexto} />
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
  const { contexto } = props

  let Cards = contexto.map((cadastro, i) =>
    i !== 0 ?
      <SimpleCard key={cadastro.id} {...cadastro} />
      : null
  )

  return (
    <div>
      {Cards.length > 1 ?
        <div>
          <h1>Histórico de alterações</h1>
          {Cards}
        </div> :
        null
      }
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    contexto: state.material.historicoMaterial
  }
}

export const MaterialDetalhe = connect(mapStateToProps, mapDispatchToProps)(DetalheContainer)