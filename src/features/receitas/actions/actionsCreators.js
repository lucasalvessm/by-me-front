import * as actionsTypes from './actionsTypes';

export function criarReceita(data) {
  return {
    type: actionsTypes.CRIAR_RECEITA,
    data: data
  }
}

export function alterarReceita(data) {
  return {
    type: actionsTypes.ALTERAR_RECEITA,
    data: data
  }
}

export function listarReceitas(data) {
  return {
    type: actionsTypes.LISTAR_RECEITAS,
    data: data
  }
}

export function salvarCustoTotal(data) {
  return {
    type: actionsTypes.SALVAR_DADOS_CONSOLIDADOS,
    data: data
  }
}

export function limpaDadosConsolidados() {
  return { type: actionsTypes.LIMPA_DADOS_CONSOLIDADOS }
}

export function listarHistoricoReceita(data) {
  return {
    type: actionsTypes.LISTAR_HISTORICO_RECEITA,
    data: data
  }
}

export function limpaHistoricoReceita() {
  return { type: actionsTypes.LIMPAR_HISTORICO_RECEITA }
}