import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import LabelAndInput from '../common/form/labelAndInput'
import { init } from './billingCyclesActions'
import ItemList from './itemList'
import Summary from './summary'

class BillingCylesForm extends Component {

    calculateSummary() {
        const sum = (t, v) => t + v
        return {
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebts: this.props.debts && this.props.debts.length > 1 ? 
                this.props.debts.map(d => +d.value || 0).reduce(sum) : 0
        }
    }
    
    render(){
        const { handleSubmit, readOnly, credits, debts } = this.props
        const { sumOfCredits, sumOfDebts } = this.calculateSummary()
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name='name' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome' />
                    <Field name='month' component={LabelAndInput} readOnly={readOnly} type='number' 
                        label='Mês' cols='12 4' placeholder='Informe o mês' />
                    <Field name='year' component={LabelAndInput} readOnly={readOnly} type='number' 
                        label='Ano' cols='12 4' placeholder='Informe o ano' />
                    <Summary credit={sumOfCredits} debt={sumOfDebts} />
                    <ItemList cols='12 6' list={credits} readOnly={readOnly} 
                        field='credits' legend='Créditos' />
                    <ItemList cols='12 6' list={debts} readOnly={readOnly} 
                        field='debts' legend='Débitos' showStatus={true} />
                </div>  
                <div className="box-footer">
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className="btn btn-default" 
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

BillingCylesForm = reduxForm({form: 'billingCyclesForm', destroyOnUnmount: false})(BillingCylesForm)
const selector = formValueSelector('billingCyclesForm')
const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts')
})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCylesForm)