import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardText from 'react-md/lib/Cards/CardText';
import { Row, Col } from 'react-bootstrap';
import dateFormat from 'dateformat';

export const SimpleCard = (props) => {

    let formatedDate = dateFormat(props.dataCadastro, "dd/mm/yyyy h:MM:ss TT");

    return (
        <Card className='md-block-centered'>
            <CardText>
                <Row>
                    <Col md={4}>
                        <span>Custo:</span>
                        <p>{props.custo}</p>
                    </Col>
                    <Col md={4}>
                        <span>peso:</span>
                        <p>{props.peso}</p>
                    </Col>
                    <Col md={4}>
                        <span>Data alteração:</span>
                        <p>{formatedDate}</p>
                    </Col>
                </Row>
            </CardText>
            <CardText>
                <span>Observação:</span>
                <p>{props.observacao}</p>
            </CardText>
        </Card>
    )
}