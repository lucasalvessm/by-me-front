import React, { Component } from 'react'
import { Input, CustomButton } from '../../../components'
import { reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap'

class Form extends Component {

    constructor() {
        super();
        this.state = { dsbd: true, switchButton: false };
        this.switchButton = this.switchButton.bind(this);
    }

    switchButton() {
        this.setState({ switchButton: !this.state.switchButton, dsbd: !this.state.dsbd });
    }

    render() {

        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(values => this.props.onAlterarMaterial(values))}>
                    <Input
                        disabled={this.state.dsbd}
                        name={'nome'} id={'material'} placeholder={'Ex.: Leite'} label={'Material'} />
                    <Input
                        disabled={this.state.dsbd}
                        name={'peso'} id={'peso'} type={'number'} placeholder={'1kg'} label={'Peso'} />
                    <Input
                        disabled={this.state.dsbd}
                        name={'custo'} id={'custo'} type={'number'} placeholder={'R$ 15,00'} label={'Custo'} />
                    <Input
                        disabled={this.state.dsbd}
                        name={'observacao'} id={'observação'} rows={2} placeholder={'Comprado na vendinha do seu Zé'} label={'Observação'} required={false} />
                    <Button switchButton={this.state.switchButton} handleChange={this.switchButton} />
                    <br />
                    <br />
                </form>
            </div>
        )
    }
}

const Button = (props) => {

    if (!props.switchButton) {
        return (
            <Row>
                <Col xsOffset={8} mdOffset={11}>
                    <CustomButton
                        type={'button'} label={'Alterar'}
                        onClick={() => props.handleChange()} />
                </Col>
            </Row>
        );
    }
    return (
        <div>
            <Row>
                <Col xsOffset={3} xs={4} md={1} mdOffset={10}>
                    <CustomButton
                        type={'submit'} label={'Salvar'} />
                </Col>
                <Col xs={4} md={1}>
                    <CustomButton
                        type={'button'} label={'Cancelar'}
                        onClick={() => props.handleChange()} />
                </Col>
            </Row>
        </div>
    );
}


let DetalheForm = reduxForm({ form: 'detalheForm' })(Form);

export { DetalheForm };