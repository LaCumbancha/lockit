import React from 'react';
import Card from 'react-credit-cards';
import Payment from 'payment';
import './newCard.css'
import 'react-credit-cards/es/styles-compiled.css';

export default class NewCreditCard extends React.Component {
    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: null,
    };

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        this.setState({ formData });
        this.form.reset();
        this.props.setCard(this.state.number.split(" ")[3]);
    };

    render() {
        const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

        return (
            <div key="Payment">
                <div className="App-payment">
                    <h1>Agregá una nueva tarjeta</h1>
                    <Card
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                        callback={this.handleCallback}
                    />
                    <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="number"
                                className="form-control"
                                placeholder="Card Number"
                                pattern="[\d| ]{16,22}"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                            <small>E.g.: 49..., 51..., 36..., 37...</small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="card-row">
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="expiry"
                                    className="form-control"
                                    placeholder="Valid Thru"
                                    pattern="\d\d/\d\d"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="cvc"
                                    className="form-control"
                                    placeholder="CVC"
                                    pattern="\d{3,4}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                        </div>
                        <input type="hidden" name="issuer" value={issuer} />
                        <div className="form-actions">
                            <button className="btn btn-primary btn-block">Agregar</button>
                        </div>
                    </form>
                    {formData && (
                        <div className="App-highlight">
                            {formatFormData(formData).map((d, i) => <div key={i}>{d}</div>)}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

function clearNumber(value = '') {
    return value.replace(/\D+/g, '');
}

export function formatCreditCardNumber(value) {
    if (!value) {
        return value;
    }

    const issuer = Payment.fns.cardType(value);
    const clearValue = clearNumber(value);
    let nextValue;

    switch (issuer) {
        case 'amex':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                10,
            )} ${clearValue.slice(10, 15)}`;
            break;
        case 'dinersclub':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                10,
            )} ${clearValue.slice(10, 14)}`;
            break;
        default:
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                8,
            )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
            break;
    }

    return nextValue.trim();
}

export function formatCVC(value, prevValue, allValues = {}) {
    const clearValue = clearNumber(value);
    let maxLength = 4;

    if (allValues.number) {
        const issuer = Payment.fns.cardType(allValues.number);
        maxLength = issuer === 'amex' ? 4 : 3;
    }

    return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
    const clearValue = clearNumber(value);

    if (clearValue.length >= 3) {
        return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }

    return clearValue;
}

export function formatFormData(data) {
    return Object.keys(data).map(d => `${d}: ${data[d]}`);
}

