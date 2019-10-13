import * as actionCreators from './actionsCreators';
import axios from 'axios';
import { reset } from 'redux-form';
import alertify from 'alertify.js';
import * as CONST from '../../../utils/constantes';
import {
    criarReceita,
    listarReceitas,
    detalharReceita,
    alterarReceita
} from '../../../backend/servicesconfig';

export const doListarReceitas = () => {
    return (dispatch, getState) => {
        axios(listarReceitas())
            .then((response) => dispatch(actionCreators.listarReceitas(response.data)))
            .catch((error) => alertify.error(error))
    }
}

export const doCriarReceita = (values, materiais) => {
    return async (dispatch) => {
        let request = receitaBuilder(values, materiais);

        await axios(criarReceita(request))
            .then((response) => {
                alertify.success(CONST.RECEITA_CADASTRO_SUCESSO);
                dispatch(reset('receitaForm'));
                dispatch(actionCreators.criarReceita(response.data));
            })
            .catch((error) => alertify.error(error));

        return;
    }
}

export const dolimpaDadosConsolidados = () => {
    return (dispatch) => {
        dispatch(actionCreators.limpaDadosConsolidados())
    }
}

export const dochangeDadosConsolidados = (valor, inputName) => {
    return dispatch => {
        if (typeof valor === 'string') {
            valor = Number(valor);
        }
        dispatch(actionCreators.salvarCustoTotal({ valor: valor, inputName: inputName }));
    }
}

export const doDetalharReceita = (receita) => {
    return (dispatch) => {
        axios(detalharReceita(receita.codigo))
            .then((response) => {
                let object = [];
                object.push(receita);
                object = [...object, ...response.data]
                dispatch(actionCreators.listarHistoricoReceita(object));
            })
            .catch((error) => alertify.error(error));
    }
}

export const doAlterarReceita = (values, materiais) => {
    return (dispatch, getState) => {
        let request = receitaBuilder(values, materiais);
        let receitaOld = getState().receita.historicoReceita[0];

        request.codigo = receitaOld.codigo;
        request.versao = receitaOld.versao;
        request.id = receitaOld.id;

        axios(alterarReceita(request))
            .then((response) => {
                alertify.success(CONST.RECEITA_ALTERADO_SUCESSO);
                dispatch(actionCreators.alterarReceita(response.data))
            })
            .catch((error) => alertify.error(error))

        return;
    }
}

export const dolimpaHistorico = () => {
    return (dispatch) =>
        dispatch(actionCreators.limpaHistoricoReceita());
}

const receitaBuilder = (values, materiais) => {
    let request = {};

    request.nome = values.nome;
    request.rendimento = values.rendimento;
    request.valorVenda = values.valorVenda;
    request.modoPreparo = values.modoPreparo;
    request.materiais = [];


    materiais.forEach((material) => {
        for (let name in values) {
            if (name === `${material.codigo}-${material.nome}`) {
                material.quantidade = values[name];
                request.materiais.push(material);
            }
        }
    });

    return request;
}