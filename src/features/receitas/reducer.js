import * as actionsTypes from './actions/actionsTypes';

const defaultState = {
    dadosConsolidadosMaterial: {},
    receitas: []
};

export default function receitasReducer(state = defaultState, action) {

    switch (action.type) {

        case actionsTypes.CRIAR_RECEITA:
            return {
                ...state,
                receitas: [
                    ...state.receitas,
                    action.data
                ]
            };

        case actionsTypes.LISTAR_RECEITAS:
            return {
                ...state,
                receitas: [
                    ...action.data
                ]
            };

        case actionsTypes.SALVAR_DADOS_CONSOLIDADOS:
            return {
                ...state,
                dadosConsolidadosMaterial: {
                    ...state.dadosConsolidadosMaterial,
                    [`${action.data.inputName}`]: action.data.valor
                }
            };

        case actionsTypes.LIMPA_DADOS_CONSOLIDADOS:
            return {
                ...state,
                dadosConsolidadosMaterial: {}
            };

        case actionsTypes.LIMPAR_HISTORICO_RECEITA:
            return {
                ...state,
                historicoReceita: []
            };

        case actionsTypes.ALTERAR_RECEITA:
            let receitas = state.receitas.slice();

            receitas.some((receita, i) => {
                if (receita.codigo === action.data.codigo) {
                    receitas[i] = action.data;
                    return true;
                }
                return false;
            });

            let historicoReceita = [];
            historicoReceita.push(action.data);
            historicoReceita.push(...state.historicoReceita.slice());

            return {
                ...state,
                receitas: [...receitas],
                historicoReceita: [...historicoReceita]
            };

        case actionsTypes.LISTAR_HISTORICO_RECEITA:
            return {
                ...state,
                historicoReceita: [...action.data]
            };

        default:
            return state;
    }

}