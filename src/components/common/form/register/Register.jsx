import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { encrypt } from "@/lib/encrypt";
import { login } from "@/store/reducers/user";
import { registerSchema } from "@/validations/login";
import { paths } from "@/services/paths";
import LoginWithSocial from "./LoginWithSocial";
import FormContent from "./FormContent";
import { get, getById, post } from "@/services/api";

const Register = () => {
  const [type, setType] = useState('Candidate');
  const [params, setSP] = useSearchParams()

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: type,
    }
  })

  const handleType = (value) => {
    setType(value)
    setValue("userType", value)
  }

  const { data: types, isLoading } = useQuery({
    queryKey: ['userTypes'],
    queryFn: async () => {
      let res = await get('/userType/type');
      return res.data.data;
    }
  })

  const mutation = useMutation({
    mutationFn: (data) => {
      if (data.userType === 'Candidate' || data.userType === 'Employer') {
        data.userType = types.find(item => item.name.toLowerCase() === data.userType.toLowerCase())._id
      };
      return post('/user/register', data);
    },
    onSuccess: async (res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("email", res.data.data.email)
        navigate(paths.verify + '?email=' + res.data.data.email);
      }

      // sessionStorage.setItem("session", res.data.token)
      // let user;
      // if (res.data.data) {
      //   user = (await getById(`/user`, res.data.data._id)).data.data
      // }

      // let enData = encrypt(res.data.data);
      // sessionStorage.setItem("userInfo", enData);
      // dispatch(login(enData));
      // window.location.href = user.userType.name === 'Candidate' ? paths.candidate_profile : paths.employer_profile;
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.response.data.error)
    }
  });

  useEffect(() => {
    const sendCode = async () => {
      let res = await get(`/user/google/callback?state=${params.get("state")}&code=${params.get("code")}`)
      if (res.data.success) {
        sessionStorage.setItem("session", res.data.token)
        let user;
        if (res.data.data) {
          user = (await getById(`/user`, res.data.data._id)).data.data
        }

        let enData = encrypt(user);
        sessionStorage.setItem("userInfo", enData);
        dispatch(login(enData));
        window.location.href = user.userType.name === 'Candidate' ? paths.candidate_profile : paths.employer_profile;
      }
    }

    params.get("code") && sendCode()
  }, [params.get("code")])


  if (isLoading) {
    return <>Loading....</>
  }


  return (
    <div className="form-inner">
      <h3>Create a Free Chem Pharma Account</h3>

      <Tabs>
        <div className="form-group register-dual">
          <TabList className="btn-box row">
            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four" onClick={() => handleType('Candidate')}>
                <i className="la la-user"></i> Candidate
              </button>
            </Tab>

            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four" onClick={() => handleType('Employer')}>
                <i className="la la-briefcase"></i> Employer
              </button>
            </Tab>
          </TabList>
        </div>
        {/* End .form-group */}

        <TabPanel>
          <FormContent handleSubmit={handleSubmit} register={register} mutation={mutation} errors={errors} />
        </TabPanel>
        {/* End cadidates Form */}

        <TabPanel>
          <FormContent handleSubmit={handleSubmit} register={register} mutation={mutation} errors={errors} />
        </TabPanel>
        {/* End Employer Form */}
      </Tabs>
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link
            to={paths.login}
            className="call-modal login"
            data-bs-dismiss={location.pathname.toLowerCase() === paths.register.toLowerCase() ? '' : "modal"}
            data-bs-toggle={location.pathname.toLowerCase() === paths.register.toLowerCase() ? '' : "modal"}
            data-bs-target={location.pathname.toLowerCase() === paths.register.toLowerCase() ? '' : "#loginPopupModal"}
          >
            Login
          </Link>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        <LoginWithSocial type={type} />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default Register;
