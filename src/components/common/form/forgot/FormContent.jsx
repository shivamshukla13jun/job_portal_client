import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { ForgotPasswordSchema } from "@/validations/login";
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
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    }
  })

  const mutation = useMutation({
    mutationFn: (data) => post('/user/forgot', data),
    onSuccess: async (res) => {
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        let message = (await getById(`/user`, res.data.data._id)).data.message;
        toast.success(message)
      }
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.response.data.error);
    }
  })

  const handleLoginSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="form-inner">
      <h3>Enter Registered Email Id</h3>

      <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <div className="form-group">
          <label>Email</label>
          <input className={errors.email ? 'error-border' : ''} type="email" placeholder="Email" required {...register("email")} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        

        <div className="form-group">
          <button className="theme-btn btn-style-one" type="submit" name="log-in">
          Send
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
