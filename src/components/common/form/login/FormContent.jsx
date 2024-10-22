import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "@/validations/login";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import LoginWithSocial from "./LoginWithSocial";

import { paths } from "@/services/paths";
import { getById, post } from "@/services/api";
import { encrypt } from "@/lib/encrypt";
import { login } from "@/store/reducers/user";

const FormContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const mutation = useMutation({
    mutationFn: (data) => post('/user/login', data),
    onSuccess: async (res) => {
      if (!res.data.success) {
        toast.error(res.data.message);
        localStorage.setItem("email", res.data.data.email)
        navigate(paths.verify + '?email=' + res.data.data.email);
      } else {
        sessionStorage.setItem("session", res.data.token)
        let user = (await getById(`/user`, res.data.data._id)).data.data;
        let enData = encrypt(user);
        sessionStorage.setItem("userInfo", enData);
        dispatch(login(enData));
        window.location.href = user.userType.name === 'Candidate' ? paths.candidate_profile : paths.employer_profile;
      }
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    }
  })

  const handleLoginSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="form-inner">
      <h3>Login to Chem Pharma</h3>

      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input className={errors.email ? 'error-border' : ''} type="email" placeholder="Email" required {...register("email")} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input className={errors.password ? 'error-border' : ''} type="password" placeholder="Password" required {...register("password")} />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              {/* <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label> */}
            </div>
            <Link  to={paths.forgot} className="pwd">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="form-group">
          <button className="theme-btn btn-style-one" type="submit" name="log-in">
            Log In
          </button>
        </div>
      </form>

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            to={paths.register}
            data-bs-toggle={location.pathname.toLowerCase() === paths.login.toLowerCase() ? '' : "modal"}
            data-bs-target={location.pathname.toLowerCase() === paths.login.toLowerCase() ? '' : "#registerModal"}
          >
            Signup
          </Link>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
