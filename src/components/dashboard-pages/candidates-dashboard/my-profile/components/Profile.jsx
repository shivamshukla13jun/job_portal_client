import { useEffect, useRef } from "react";
import DatePicker from "@/components/common/date-picker/DatePicker";

const Profile = ({ watch, register, setValue, error }) => {
  const uploadRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    if (uploadRef.current) {
      const labelElement = uploadRef.current.querySelector('label');
      if (labelElement) {
        if (error?.myProfile?.upload_cv?.message) {
          labelElement.tabIndex = -1;
          labelElement.focus();
          labelElement.classList.add('error');
        } else {
          labelElement.tabIndex = 0;
          labelElement.classList.remove('error');
        }
      }
    }
    if (profileRef.current) {
      const labelElement = profileRef.current.querySelector('label');
      if (labelElement) {
        if (error?.myProfile?.upload_cv?.message) {
          labelElement.tabIndex = -1;
          labelElement.focus();
          labelElement.classList.add('error');
        } else {
          labelElement.tabIndex = 0;
          labelElement.classList.remove('error');
        }
      }
    }
  }, [uploadRef, profileRef, error])

  return (
    <div className="default-form">
      <div className="row form-group" style={{ marginBottom: '0' }}>
        {/* <!-- Input --> */}

        <div className="form-group col-lg-12 col-md-12 d-flex flex-column">
          <label>Candidate Name</label>
          <div className="d-flex flex-row gap-4" style={{ width: 'inherit' }}>
            <select {...register("myProfile.candidate_name.title")} className={error?.myProfile?.candidate_name?.title?.message ? 'error' : ''} required>
              <option value={""} hidden>Title</option>
              <option value={"Mr."}>Mr.</option>
              <option value={"Mrs."}>Mrs.</option>
            </select>
            <input type="text" {...register("myProfile.candidate_name.first")} className={error?.myProfile?.candidate_name?.first?.message ? 'error' : ''} placeholder="First name" required />
            <input type="text" {...register("myProfile.candidate_name.middle")} className={error?.myProfile?.candidate_name?.middle?.message ? 'error' : ''} placeholder="Middle name" required />
            <input type="text" {...register("myProfile.candidate_name.last")} className={error?.myProfile?.candidate_name?.last?.message ? 'error' : ''} placeholder="Last name" required />
          </div>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Gender</label>
          <div className="d-flex justify-content-between ms-2" style={{ width: "60%" }}>
            <div className="d-flex align-items-center">
              <label className={error?.myProfile?.gender?.message ? 'error' : ''}>
                <input type="radio" {...register("myProfile.gender")} className="radio-box" value="Male" />
                <span className="ml-3" style={{ padding: '1px' }} > Male </span>
              </label>
            </div>

            <div className="d-flex align-items-center">
              <label className={error?.myProfile?.gender?.message ? 'error' : ''}>
                <input type="radio" {...register("myProfile.gender")} className="radio-box" value="Female" />
                <span className="ml-3" style={{ padding: '1px' }} > Female </span>
              </label>
            </div>

            <div className="d-flex align-items-center">
              <label className={error?.myProfile?.gender?.message ? 'error' : ''}>
                <input type="radio" {...register("myProfile.gender")} className="radio-box" value="Others" />
                <span className="ml-3" style={{ padding: '1px' }} > Others </span>
              </label>
            </div>
          </div>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Date of Birth</label>
          <div className={error?.myProfile?.dob?.message ? 'error error-border' : ''}>
            <DatePicker
              id={'profileDoB'}
              value={watch("myProfile.dob")}
              onChange={(date) => setValue("myProfile.dob", date)}
            />
          </div>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Marital Status</label>
          <select className={`${error?.myProfile?.gender?.message ? 'error' : ''} chosen-single form-select`} {...register("myProfile.marital_status")} required>
            <option value={""} hidden>Status</option>
            <option value={"Married"}>Married</option>
            <option value={"Unmarried"}>Unmarried</option>
          </select>
        </div>


        <div className="form-group">
          <label>
            Upload latest CV
          </label>
          <div className="uploading-outer" ref={uploadRef} style={{ border: "none", padding: 0, margin: 0 }}>
            <div className="uploadButton">
              <input
                className="uploadButton-input"
                type="file"
               accept=".doc,.docx,.pdf"
                id={`uploadCv`}
                {...register(`myProfile.upload_cv`)}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setValue(`myProfile.upload_cv`, file);
                  }
                }}
                required
              />
              <label
                className="uploadButton-button ripple-effect"
                htmlFor={`uploadCv`}
              >
                {(watch("myProfile.upload_cv")?.name || watch("myProfile.upload_cv")?.originalname) || "Upload File"}
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>
            Upload your profile image
          </label>
          <div className="uploading-outer" ref={profileRef} style={{ border: "none", padding: 0, margin: 0 }}>
            <div className="uploadButton">
              <input
                className="uploadButton-input"
                type="file"
              ccept="image/*"
                id={`profile`}
                {...register(`myProfile.profile`)}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setValue(`myProfile.profile`, file);
                  }
                }}
                required
              />
              <label
                className="uploadButton-button ripple-effect"
                htmlFor={`profile`}
              >
                {(watch("myProfile.profile")?.name || watch("myProfile.profile")?.originalname) || "Upload File"}
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
