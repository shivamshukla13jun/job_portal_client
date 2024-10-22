const FormContent = (props) => {
  const { handleSubmit, register, mutation, errors } = props;

  const handleRegisterSubmit = (data) => {
    mutation.mutate(data)
  };

  return (
    <form onSubmit={handleSubmit(handleRegisterSubmit)}>
      <div className="form-group">
        <label>Email Address</label>
        <input className={errors.email ? 'error-border' : ''} type="email" placeholder="Email" required {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      {/* name */}

      <div className="form-group">
        <label>Password</label>
        <input className={errors.email ? 'error-border' : ''} id="password-field" type="password" placeholder="Password" required {...register("password")} />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      {/* password */}

      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit">
          Register
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContent;
