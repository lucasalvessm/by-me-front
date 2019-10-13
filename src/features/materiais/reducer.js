import * as actionsTypes from './actions/actionsTypes';

const defaultState = {};

export default function materiaisReducer(state = defaultState, action) {

    switch (action.type) {
        case actionsTypes.LISTAR_MATERIAIS:

            return {
                ...state,
                materiais: [...action.data]
            };

        case actionsTypes.CRIAR_MATERIAL:
            return {
                ...state,
                materiais: [
                    ...state.materiais,
                    action.data
                ]
            };

        case actionsTypes.LISTAR_HISTORICO_MATERIAL:
            return {
                ...state,
                historicoMaterial: [...action.data]
            };

        case actionsTypes.ALTERAR_MATERIAL:
            let materiais = state.materiais.slice();

            materiais.some((material, i) => {
                if (material.codigo === action.data.codigo) {
                    materiais[i] = action.data;
                    return true;
                }
                return false;
            });

            let historicoMaterial = [];
            historicoMaterial.push(action.data);
            historicoMaterial.push(...state.historicoMaterial.slice());


            return {
                ...state,
                historicoMaterial: [...historicoMaterial],
                materiais: [...materiais]
            };

        case actionsTypes.LIMPA_HISTORICO_MATERIAL:
            return {
                ...state,
                historicoMaterial: []
            };

        default:
            return state;
    }

}