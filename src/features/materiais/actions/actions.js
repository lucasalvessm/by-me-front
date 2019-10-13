import * as actionCreators from './actionsCreators';
import {reset} from 'redux-form';
import axios from 'axios';
import alertify from 'alertify.js';
import * as CONST from '../../../utils/constantes';

import { 
    criarMaterial, 
    listarMateriais, 
    detalharMaterial,
    alterarMaterial 
} from '../../../backend/servicesconfig';

export const doListarMateriais = () => {
    return async (dispatch, getState) => {
        let data = getState()
        if (data && data.material && data.material.materiais && data.material.materiais.length > 0) {
            return;
        }
        await axios(listarMateriais())
            .then((response) => dispatch(actionCreators.listarMateriais(response.data.data)))
            .catch((error) => alertify.error(error));
    }
}

export const doCriarMaterial = (data) => {
    return async (dispatch) => {

        await axios(criarMaterial(data))
            .then((response) => {
                alertify.success(CONST.MATERIAL_CADASTRO_SUCESSO);
                dispatch(actionCreators.criarMateral(response.data.data));
                dispatch(reset('materialForm'));
            })
            .catch((error) => alertify.error(error));
    }
}

export const doDetalharMaterial = (codigo) => {
    return async (dispatch) => {
        await axios(detalharMaterial(codigo))
            .then((response) => {
                dispatch(actionCreators.listarHistoricoMaterial(response.data.data))
            })
            .catch((error) => alertify.error(error));
    }
}

export const doAlterarMaterial = (values) => {
    return async (dispatch, getState) => {
        let material = getState().material.historicoMaterial[0];
        values.versao = material.versao;

        await axios(alterarMaterial(values))
            .then((response) => {
                alertify.success(CONST.MATERIAL_ALTERADO_SUCESSO);
                dispatch(actionCreators.alterarMaterial(response.data.data))
            })
            .catch((error) => alertify.error(error));
    }
}

export const dolimpaHistorico = () => {
    return (dispatch) =>
        dispatch(actionCreators.limpaHistoricoMaterial());
}