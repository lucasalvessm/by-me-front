import React, { Component } from 'react';
import { Input, CustomButton, Select } from '../../../components';
import { reduxForm } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
import { calculaCustoUnitarioParcial } from '../calculos';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = { options: [{}], materiais: [] };
        this.props.onlimpaDadosConsolidados();
    }

    selecionaMaterial(value) {
        //se a option escolhida for a vazia, não faz nada
        if (value) {
            let material = this.state.options.find(option => value === option.codigo);
            let materiais = this.state.materiais.concat(material);

            this.setState({
                materiais: materiais,
                options: this.state.options.filter((option) => option.codigo !== material.codigo || !option)
            });

            this.props.onChangeDadosConsolidados(this.calculaCustoConsolidado(materiais), 'custoTotal');
        }
    }

    handleInputChange = (value, input) => {
        if (this.contemCaracterAlfabetico(value)) {
            return;
        } else {
            this.props.onChangeDadosConsolidados(value, input);
        }
    }

    contemCaracterAlfabetico(value) {
        //retorna true se a string contém caracteres alfabéticos
        if (value && isNaN(Number(value))) {
            return true;
        }
        return false;
    }

    handleInputQuantidade = (value, material) => {
        if (this.contemCaracterAlfabetico(value)) {
            return;
        } else {
            //pega a lista de materiais
            let materiais = this.state.materiais.slice()
            //caso ache algum material com o código do material escolhido, atribui a ele a quantidade do peso escolhido
            materiais.some((element, i) => {
                if (element.codigo === material.codigo) {
                    let custoParcial = calculaCustoUnitarioParcial(materiais[i].custo, value, materiais[i].peso);

                    materiais[i] = { ...materiais[i], custoParcial: custoParcial };
                    return true;
                }
                return false;
            });
            //seta no state a lista atualizada, com a quantidade
            this.setState({ materiais: materiais });

            this.props.onChangeDadosConsolidados(this.calculaCustoConsolidado(materiais), 'custoTotal');
        }
    }

    deselecionarMaterial = (value) => {
        let option = { ...value };
        delete option.custoParcial;

        let materiais = this.state.materiais.filter((material) => material.codigo !== value.codigo)
        this.setState({
            materiais: materiais,
            options: this.state.options.concat(value)
        });
        this.props.onChangeDadosConsolidados(this.calculaCustoConsolidado(materiais), 'custoTotal');
    }

    calculaCustoConsolidado(materiais) {
        let custoConsolidado = 0;
        materiais.forEach((material) => custoConsolidado += material.custoParcial ? material.custoParcial : 0);
        return custoConsolidado;
    }

    carregaOptions(nextProps) {
        //carrega somente uma única vez a lista de materiais no selectField
        if(nextProps.materiais && this.state.options.length === 1 && !this.state.optionsCarregadas) {
            this.setState({
                options: this.state.options.concat(
                    nextProps.materiais.map((material) => material)),
                optionsCarregadas: true
            })
        }
    }

    componentWillUpdate(nextProps) {
        this.carregaOptions(nextProps);
    }

    componentWillMount() {
        this.carregaOptions(this.props);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit((values) => this.props.onCriarReceita(values, this.state.materiais))}>
                <Input name={'nome'} placeholder={'Ex.: Bolo de fubá com mocotó'} label={'Receita'} />
                <Input type='number' name={'rendimento'} placeholder={'Ex.: 30 unidades'} label={'Rendimento'}
                    onChange={(event, value) => this.handleInputChange(value, 'rendimento')} />
                <Input type='number' name={'valorVenda'} placeholder={'Ex.: R$ 5.00'} label={'Valor de venda/unidade'}
                    onChange={(event, value) => this.handleInputChange(value, 'valorVenda')}
                />

                <MateriaisSelecionados
                    materiais={this.state.materiais}
                    deselecionarMaterial={this.deselecionarMaterial}
                    handleInputQuantidade={this.handleInputQuantidade} />

                <Select onChange={(value) => this.selecionaMaterial(value)}
                    menuItems={this.state.options} itemLabel={'nome'}
                    itemValue={'codigo'}
                    name={'ingredientes'} label={'Ingredientes'} />

                <Input
                    name={'modoPreparo'} rows={2}
                    placeholder={'Ex.: 3 minutos de microondas e tá pronto'}
                    label={'Modo de preparo'} required={false} />

                <CustomButton type={'submit'} label={'Criar'} />
                <br />
                <br />
            </form>
        );
    }
}

let MateriaisSelecionados = (props) => {
    const { materiais, deselecionarMaterial, handleInputQuantidade } = props;

    let Inputs = materiais.length > 0 && materiais.map((material) => {
        return (
            <div key={material.codigo}>
                <Row>
                    <Col md={2} sm={2} xs={6}>
                        <label>{material.nome}:</label>
                    </Col>
                    <Col md={3} sm={3} xs={6}>
                        <Input name={`${material.codigo}-${material.nome}`} type={'number'}
                            placeholder={'Peso em gramas'} required
                            onChange={(event, value) => { handleInputQuantidade(value, material) }}
                        />
                    </Col>
                    <Col md={3} sm={3} xs={6}>
                        <label>
                            Custo/g: {`R$ ${material.custoParcial ? material.custoParcial : '0'}`}
                        </label>
                    </Col>
                    <Col md={2} sm={2} xs={6}>
                        <CustomButton type={'button'} label={'remover'}
                            onClick={() => deselecionarMaterial(material)}
                        />
                    </Col>
                </Row>
            </div>
        )
    });

    if (Input) {
        return (<div>{Inputs}</div>);
    }
    return null;
}

let FormRedux = reduxForm({ form: 'receitaForm' })(Form);

export { FormRedux };