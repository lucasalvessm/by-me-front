import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {
    calculaCustoUnitario,
    calculaFaturamentoTotal,
    calculaFaturamentoUnitario,
    calculaLucroUnitario,
    calculaLucroTotal
} from '../calculos';

export { TableF } from './Table';
export { FormRedux as Form } from './Form';
export * from './DetalheForm';
export * from './Card';

export const ValoresConsolidados = (props) => {

    const { dadosConsolidados: { custoTotal, rendimento, valorVenda } } = props;

    let custoUni;
    let fatTotal;
    let fatUni;
    let lucroTotal;
    let lucroUni;

    if(rendimento && custoTotal){
        custoUni = calculaCustoUnitario(custoTotal, rendimento);
    }

    if(valorVenda && rendimento){
        fatTotal = calculaFaturamentoTotal(valorVenda, rendimento);
        fatUni = calculaFaturamentoUnitario(fatTotal, rendimento);
    }

    if(fatUni && custoTotal && custoUni && fatTotal){
        lucroTotal = calculaLucroTotal(fatTotal, custoTotal);
        lucroUni = calculaLucroUnitario(fatUni, custoUni);
    }

    return (
        <div>
            <Row>
                <Col md={4} sm={4}>
                    <span>Custo total: R$ {custoTotal ? custoTotal.toFixed(2) : '0'}</span>
                </Col>
                <Col md={4} sm={4}>
                    <span>Faturamento total: R$ {fatTotal ? fatTotal.toFixed(2) : '0'}</span>
                </Col>
                <Col md={4} sm={4}>
                    <span>Lucro total: R$ {lucroTotal ? lucroTotal.toFixed(2) : '0'}</span>
                </Col>
            </Row>
            <Row>
                <Col md={4} sm={4}>
                    <span>Custo unitário: R$ {custoUni ? custoUni.toFixed(2) : '0'}</span>
                </Col>
                <Col md={4} sm={4}>
                    <span>Faturamento unitário: R$ {fatUni ? fatUni.toFixed(2) : '0'}</span>
                </Col>
                <Col md={4} sm={4}>
                    <span>Lucro unitário: R$ {lucroUni ? lucroUni.toFixed(2) : '0'}</span>
                </Col>
            </Row>
        </div>
    )
}