import React from 'react';
import {required} from "../../utils/validators";
import Input from "../FormElements/Input";
import {Field, reduxForm} from "redux-form";

const LoginForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-outline mb-4">
                <Field
                    type="text"
                    placeholder="Логин"
                    name="login"
                    className="form-control"
                    validate={[required]}
                    component={Input}
                />
            </div>
            <div className="form-outline mb-4">
                <Field
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    className="form-control"
                    validate={[required]}
                    component={Input}
                />
            </div>
            <div className="row mb-4">
                <div className="col">
                    <div className="form-check">
                        <Field
                            type="checkbox"
                            name="rememberMe"
                            id="remember-me"
                            className="form-check-input"
                            component="input"
                        />
                        <label className="form-check-label" htmlFor="remember-me">Запомнить</label>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">Войти</button>
            {props.__error && <div className="invalid-feedback d-block">{props.__error}</div>}
        </form>
    );
};

const LoginReduxForm = reduxForm({form: 'loginForm'})(LoginForm);
const Login = props => <LoginReduxForm onSubmit={formData => props.login(formData)} {...props}/>;
export default Login;