const BASE_URL = 'http://localhost:3001';

export const criarMaterial = (data) => {
    return {
        method: 'post',
        url: `${BASE_URL}/materiais`,
        data: data
    }
}

export const listarMateriais = () => {
    return {
        method: 'get',
        url: `${BASE_URL}/materiais`
    }
}

export const detalharMaterial = (codigo) => {
    return {
        method: 'get',
        url: `${BASE_URL}/materiais/${codigo}`
    }
}

export const criarReceita = (data) => {
    return {
        method: 'post',
        url: `${BASE_URL}/receitas`,
        data: data
    }
}

export const listarReceitas = () => {
    return {
        method: 'get',
        url: `${BASE_URL}/receitas`
    }
}

export const detalharReceita = (codigo) => {
    return {
        method: 'get',
        url: `${BASE_URL}/receitas/${codigo}`
    }
}

export const alterarReceita = (data) => {
    return {
        method: 'put',
        url: `${BASE_URL}/receitas`,
        data: data
    }
}

export const alterarMaterial = (data) => {
    return {
        method: 'put',
        url: `${BASE_URL}/materiais`,
        data: data
    }
}