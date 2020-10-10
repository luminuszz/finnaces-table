/* eslint-disable jsx-a11y/label-has-associated-control */
import useForm, { HandleSubmit } from 'hooks/useForm';
import { NextPage } from 'next';
import router from 'next/router';
import React from 'react';
import fireBaseApp from 'services/firebase';

import { IRequest, validations } from '../../validators/login';

import 'styles/login.scss';

const Login: NextPage = () => {
  const onSuccess: HandleSubmit<IRequest> = async (data): Promise<void> => {
    try {
      await fireBaseApp
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      console.log('foi');
      router.push('/dashboard');
    } catch (error) {
      console.log(error.message);
    }
  };

  const { handleChange, errors, handleSubmit, loading } = useForm({
    validations,
    onSuccess,
  });

  return (
    <main className="hero hero-login">
      <div className="hero-body">
        <div className="container">
          <div className="box">
            <div className="subtitle">
              <h4>Tabela de contas -beta</h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label" htmlFor="email">
                  E-mail
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  className={`${errors.email ? 'input is-danger' : 'input'}`}
                  placeholder="email"
                  name="email"
                />
                {errors && <p className="help is-danger">{errors.email}</p>}
              </div>
              <div className="field">
                <label className="label" htmlFor="password">
                  Senha
                </label>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  id="password"
                  className={`${errors.password ? 'input is-danger' : 'input'}`}
                  placeholder="Nome"
                />
                {errors && <p className="help is-danger">{errors.password}</p>}
              </div>

              <div className="field">
                <button
                  type="submit"
                  className={`${
                    loading
                      ? 'button is-primary is-loading'
                      : 'button is-primary'
                  }`}
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
