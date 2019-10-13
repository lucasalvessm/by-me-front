import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions/actions';
import { Form, TableF } from './presentational';

class MaterialContainer extends Component {

  componentDidMount() {
      this.props.actions.doListarMateriais()
  }

  render() {

    const { actions, history } = this.props;
    let materiais = this.props.contexto.materiais;

    return (
      <div>
        <Grid>
          <Form
            onCriarMaterial={actions.doCriarMaterial}
          />
        </Grid>
        <br />
        <Grid>
          <TableF
            onListarMateriais={actions.doListarMateriais}
            listaMateriais={materiais}
            history={history}
            onDetalharMaterial={actions.doDetalharMaterial}
          />
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    contexto: state.material
  }
}

export const Material = connect(mapStateToProps, mapDispatchToProps)(MaterialContainer);