const ContactInformation = ({ watch, register, setValue, error }) => {
  return (
    <div className="default-form">
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input type="email" className={error?.contact?.email?.message ? 'error' : ''} {...register("contact.email")} placeholder="creativelayers" required />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input type="text" className={error?.contact?.phone?.message ? 'error' : ''} {...register("contact.phone")} placeholder="0 123 456 7890" required />
        </div>


        <div className="form-group col-lg-12 col-md-12 mt-2">
          <label>Permanent Address</label>
          <div>
            <input type="text" className={error?.contact?.permanent_address?.lane1?.message ? 'error' : ''} {...register("contact.permanent_address.lane1")} placeholder="Door No./ Flat No. / Address 1" required />
            <input type="text" className={`${error?.contact?.permanent_address?.lane2?.message ? 'error' : ''} mt-4`} {...register("contact.permanent_address.lane2")} placeholder="Apartment Name / S treet Name / Address 2" required />
            <div className="d-flex justify-content-between col-lg-6 col-md-12" style={{ width: "inherit", gap: "24px" }}>
              <input type="text" className={`${error?.contact?.permanent_address?.city?.message ? 'error' : ''} mt-4`} {...register("contact.permanent_address.city")} placeholder="City" required />
              <input type="text" className={`${error?.contact?.permanent_address?.state?.message ? 'error' : ''} mt-4`} {...register("contact.permanent_address.state")} placeholder="State" required />
            </div>

            <div className="d-flex justify-content-between col-lg-6 col-md-12" style={{ width: "inherit", gap: "24px" }}>
              <input type="number" {...register("contact.permanent_address.pin_code")} className={`${error?.contact?.permanent_address?.pin_code?.message ? 'error' : ''} mt-4`} placeholder="Pin Code" required />
              <select {...register("contact.permanent_address.country")} className={`${error?.contact?.permanent_address?.country?.message ? 'error' : ''} mt-4`} required>
                <option value={""} hidden>Select a country</option>
                <option value={"India"}>India</option>
                <option value={"Japan"}>Japan</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group col-lg-12 col-md-12 mt-2">
          <label>Current Address</label>
          <div>
            <input type="text" {...register("contact.current_address.lane1")} placeholder="Door No./ Flat No. / Address 1" required />
            <input type="text" {...register("contact.current_address.lane2")} placeholder="Apartment Name / S treet Name / Address 2" required className="mt-4" />
            <div className="d-flex justify-content-between col-lg-6 col-md-12" style={{ width: "inherit", gap: "24px" }}>
              <input type="text" {...register("contact.current_address.city")} placeholder="City" required className="mt-4" />
              <input type="text" {...register("contact.current_address.state")} placeholder="State" required className="mt-4" />
            </div>

            <div className="d-flex justify-content-between col-lg-6 col-md-12" style={{ width: "inherit", gap: "24px" }}>
              <input type="number" {...register("contact.current_address.pin_code")} placeholder="Pin Code" required className="mt-4" />
              <select {...register("contact.current_address.country")} className="mt-4" required>
                <option value={""} hidden>Select a country</option>
                <option value={"India"}>India</option>
                <option value={"Japan"}>Japan</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
