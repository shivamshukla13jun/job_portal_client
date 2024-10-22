import { get } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

const LoginWithSocial = ({ type }) => {

  const mutation = useMutation({
    mutationFn: (data) => get(`/user/google?state=${type.toLowerCase()}`),
    onSuccess: (res) => {
      if (res.data.success) {
        window.location.href = res.data.data
      }
    }
  });

  return (
    <div className="btn-box row">
      <div className="col-lg-12 col-md-12">
        <button onClick={(e) => mutation.mutate(e)} className="theme-btn social-btn-two google-btn">
          <i className="fab fa-google"></i> Log In Google
        </button>
      </div>
    </div>
  );
};

export default LoginWithSocial;
