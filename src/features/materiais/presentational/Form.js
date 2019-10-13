import React from 'react';
import { Input, CustomButton } from '../../../components';
import { reduxForm } from 'redux-form';

let Form = (props) => {
    const {handleSubmit} = props

    let onCriarMaterial = (values) => {
        props.onCriarMaterial(values)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onCriarMaterial)}>
                <Input name={'nome'} id={'material'} placeholder={'Ex.: Leite'} label={'Material'} />
                <Input name={'peso'} id={'peso'} type={'number'} placeholder={'1kg'} label={'Peso'} />
                <Input name={'custo'} id={'custo'} type={'number'} placeholder={'R$ 15,00'} label={'Custo'} />
                <Input name={'observacao'} id={'observação'} rows={2} placeholder={'Comprado na vendinha do seu Zé'} label={'Observação'} required={false} />
                <CustomButton type={'submit'} label={'Criar'} />
                <br/>
                <br/>
            </form>
        </div>
    )
}

let FormRedux = reduxForm({form: 'materialForm'})(Form)

export {FormRedux}