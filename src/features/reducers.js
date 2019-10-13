import {combineReducers} from 'redux'
import materiaisReducer from './materiais/reducer'
import receitasReducer from './receitas/reducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    material: materiaisReducer,
    receita: receitasReducer,
    form: formReducer
})