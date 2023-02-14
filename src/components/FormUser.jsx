import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import defaultValues from '../utils/defaultValue';

const FormUser = ({ createNewUser, updateInfo, updateUserById, handleClose, setUpdateInfo, userId }) => {
  const { reset, register, handleSubmit } = useForm();

  useEffect(() => {
    if (updateInfo) {
      reset(updateInfo);
    }
  }, [updateInfo]);

  const submit = (data) => {
    if (updateInfo) {
      updateUserById(updateInfo.id, data);
    } else {
      createNewUser({ ...data, userId }); // Agregado userId al objeto data
    }
    handleClose();
    reset(defaultValues);
  };

  const handleX = () => {
    reset(defaultValues);
    setUpdateInfo();
    handleClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit(submit)}>
      <h2 className="form__title">Form User</h2>
      <div onClick={handleX} className="form__x">
        X
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input className="form__input" {...register('email')} type="email" id="email" />
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input className="form__input" {...register('password')} type="password" id="password" />
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="firstName">
          First Name
        </label>
        <input className="form__input" {...register('first_name')} type="text" id="firstName" />
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="lastName">
          Last Name
        </label>
        <input className="form__input" {...register('last_name')} type="text" id="lastName" />
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="birthday">
          Birthday
        </label>
        <input className="form__input" {...register('birthday')} type="date" id="birthday" />
      </div>
      <button className="form__btn">{updateInfo ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default FormUser;
