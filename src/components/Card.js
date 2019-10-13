import React from 'react'
import Card from 'react-md/lib/Cards/Card'
import CardText from 'react-md/lib/Cards/CardText'
import { Row, Col } from 'react-bootstrap'

export const SimpleCard = (props) => {
    return (
        <Card className='md-block-centered'>
            <CardText>
                <Row>
                    <Col xsOffset={8} mdOffset={11}>
                        <span>Data alteração:</span>
                        <p>{props.dataCadastro}</p>
                    </Col>
                </Row>
                <span>Custo:</span>
                <p>{props.custo}</p>
                <span>peso:</span>
                <p>{props.peso}</p>
            </CardText>
            <CardText>
                <span>Observação:</span>
                <p>{props.observacao}</p>
            </CardText>
        </Card>
    )
}