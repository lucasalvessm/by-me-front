import * as actionsTypes from './actionsTypes';

export function listarMateriais(data) {
  return {
    type: actionsTypes.LISTAR_MATERIAIS,
    data: data
  };
}

export function criarMateral(data) {
  return {
    type: actionsTypes.CRIAR_MATERIAL,
    data: data
  }
}

export function alterarMaterial(data) {
  return {
    type: actionsTypes.ALTERAR_MATERIAL,
    data: data
  };
}

export function listarHistoricoMaterial(data) {
  return {
    type: actionsTypes.LISTAR_HISTORICO_MATERIAL,
    data: data
  };
}

export function limpaHistoricoMaterial() {
  return { type: actionsTypes.LIMPA_HISTORICO_MATERIAL };
}