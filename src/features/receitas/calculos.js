export const calculaCustoTotal = () => {

}

export const calculaCustoUnitario = (custoTotal, rendimento) => {
    return Number((custoTotal / rendimento).toFixed(2))
}

export const calculaFaturamentoTotal = (valorVenda, rendimento) => {
    return Number((valorVenda * rendimento).toFixed(2))
}

export const calculaFaturamentoUnitario = (fatTotal, rendimento) => {
    return Number((fatTotal / rendimento).toFixed(2))
}

export const calculaLucroTotal = (fatTotal, custoTotal) => {
    return Number((fatTotal - custoTotal).toFixed(2))
}

export const calculaLucroUnitario = (fatUni, custoUni) => {
    return Number((fatUni - custoUni).toFixed(2))
}

export const calculaCustoUnitarioParcial = (custoTotalMaterial, pesoParcialMaterial, pesoTotalMaterial) => {
    return Number(((custoTotalMaterial * (pesoParcialMaterial / 1000)) / pesoTotalMaterial).toFixed(2))
}
