import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import { CardText, CardActions } from 'react-md';
import { Row, Col } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { 
    calculaFaturamentoTotal,
    calculaCustoUnitario,
    calculaCustoUnitarioParcial,
    calculaFaturamentoUnitario,
    calculaLucroTotal,
    calculaLucroUnitario
} from '../calculos';

const style = { display: 'flow-root' };
const style2 = { 'word-wrap': 'break-word' }

export const SimpleCard = (props) => {

    let custoTotal = 0;
    
    let Materiais = props.materiais.map((material) => {
        let custoParcial = calculaCustoUnitarioParcial(material.custo, material.quantidade, material.peso);
        custoTotal += custoParcial;
        return (
            <div>
                <Col md={6}>
                    <p>{material.quantidade} gramas de <strong>{material.nome}</strong> com o valor de R$ {(material.custo / material.peso).toFixed(2)} por KG</p>
                </Col>
                <Col md={2}>
                    <p>Custo: R$ {custoParcial}</p>
                </Col>
            </div>
        )
    })
    
    let fatTotal = calculaFaturamentoTotal(props.valorVenda, props.rendimento);
    let custoUnitario = calculaCustoUnitario(custoTotal, props.rendimento);
    let fatUnitario = calculaFaturamentoUnitario(fatTotal, props.rendimento)
    let lucroTotal = calculaLucroTotal(fatTotal, custoTotal);
    let lucroUnitario = calculaLucroUnitario(fatUnitario, custoUnitario);

    let formatedDate = dateFormat(props.dataCadastro, "dd/mm/yyyy h:MM:ss TT");

    return (
        <div>
            <Card style={style2}>
                <CardText style={style}>
                <Row>
                <Col md={3} >
                        <h5>Cadastrado em:</h5>
                        <p>{formatedDate}</p>
                    </Col>
                </Row>
                    <Col md={3} >
                        <h5>Rendimento:</h5>
                        <p>{`${props.rendimento} unidades`}</p>
                    </Col>
                    <Col md={3}>
                        <h5>Custo total:</h5>
                        <p>{`RS ${custoTotal}`}</p>
                    </Col>
                    <Col md={3}>
                        <h5>Faturamento total:</h5>
                        <p>{`R$ ${fatTotal}`}</p>
                    </Col>
                    <Col md={3}>
                        <h5>Lucro total:</h5>
                        <p>{`RS ${lucroTotal}`}</p>
                    </Col>
                    <Col md={3}>
                        <h5>Valor Venda:</h5>
                        <p>{`RS ${Number(props.valorVenda).toFixed(2) || '0.00'}`}</p>
                    </Col>
                    <Col md={3}>
                        <h5>Custo unitário:</h5>
                        <p>{`RS ${custoUnitario}`}</p>
                    </Col>
                    <Col md={3}>
                        <h5>Faturamento unitário:</h5>
                        <p>{`R$ ${fatUnitario}`}</p>
                    </Col>
                    <Col md={3}>
                        <h5>Lucro unitário:</h5>
                        <p>{`RS ${lucroUnitario}`}</p>
                    </Col>
                    <Col md={12}>
                        <h5>Ingredientes:</h5>
                    </Col>
                    {Materiais}
                </CardText>
                <CardActions expander>
                    <CardText>
                        <h5>Modo de Preparo:</h5>
                    </CardText>
                </CardActions>
                <CardText expandable style={style}>
                    <Col md={12}>
                        <p>{props.modoPreparo || 'Não cadastrado'}</p>
                    </Col>
                </CardText>
            </Card>
            <br />
        </div>
    )
}