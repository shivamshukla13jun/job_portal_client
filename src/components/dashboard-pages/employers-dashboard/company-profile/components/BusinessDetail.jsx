import React, { useEffect, useRef } from 'react'
import DatePicker from '@/components/common/date-picker/DatePicker';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const BusinessDetail = ({ watch, register, setValue, error }) => {
    const logoRef = useRef(null);
    const picturesRef = useRef(null);
    const videosRef = useRef(null);

    useEffect(() => {
        if (logoRef.current) {
            const labelElement = logoRef.current.querySelector('label');
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

        if (picturesRef.current) {
            const labelElement = picturesRef.current.querySelector('label');
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

        if (videosRef.current) {
            const labelElement = videosRef.current.querySelector('label');
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
    }, [logoRef, picturesRef, videosRef, error])

    return (
        <div className="default-form">
            <div className="row">
                <div className="form-group col-lg-12 col-md-12">
                    <label>Business name <span className='required-form'>*</span></label>
                    <input type="text" className={`${error?.business_name?.message ? 'error' : ''}`} {...register("business_name")} placeholder="creativelayers" required />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Business GST No. <span className='required-form'>*</span></label>
                    <input type="text" className={`${error?.business_gst?.message ? 'error' : ''}`} {...register("business_gst")} placeholder="C2DF24F2DWEFW" required />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>PAN Card No. <span className='required-form'>*</span></label>
                    <input type="text" className={`${error?.pan_card?.message ? 'error' : ''}`} {...register("pan_card")} placeholder="0 123 456 7890" required />
                </div>

                <label style={{ fontWeight: "500", marginBottom: "10px", lineHeight: "20px" }}>Contact Name <span className='required-form'>*</span></label>
                <div className="form-group col-lg-4 col-md-12">
                    <input type="text" className={`${error?.name?.first?.message ? 'error' : ''}`} {...register("name.first")} placeholder="First name" required />
                </div>
                <div className="form-group col-lg-4 col-md-12">
                    <input type="text" className={`${error?.name?.middle?.message ? 'error' : ''}`} {...register("name.middle")} placeholder="Middle name" required />
                </div>
                <div className="form-group col-lg-4 col-md-12">
                    <input type="text" className={`${error?.name?.last?.message ? 'error' : ''}`} {...register("name.last")} placeholder="Last name" required />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Email <span className='required-form'>*</span></label>
                    <input type="text" className={`${error?.email?.message ? 'error' : ''}`} {...register("email")} placeholder="creativelayers" required />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Phone Number <span className='required-form'>*</span></label>
                    <div className='d-flex gap-3 align-items-center'>
                        <input type="text" className={`${error?.phone_area?.message ? 'error' : ''}`} {...register("phone_area")} placeholder="Area Code" required /> -
                        <input type="text" className={`${error?.phone?.message ? 'error' : ''}`} {...register("phone")} placeholder="Phone Number" required />
                    </div>
                </div>

                <div className="form-group col-lg-12 col-md-12 mt-2">
                    <label>Address <span className='required-form'>*</span></label>
                    <div>
                        <input type="text" className={`${error?.address?.lane1?.message ? 'error' : ''}`} {...register("address.lane1")} placeholder="Door No./ Flat No. / Address 1" required />
                        <input type="text" className={`${error?.address?.lane2?.message ? 'error' : ''} mt-4`} {...register("address.lane2")} placeholder="Apartment Name / S treet Name / Address 2" required />
                        <div className="d-flex justify-content-between col-lg-6 col-md-12" style={{ width: "inherit", gap: "24px" }}>
                            <input type="text" className={`${error?.address?.city?.message ? 'error' : ''} mt-4`} {...register("address.city")} placeholder="City" required />
                            <input type="text" className={`${error?.address?.state?.message ? 'error' : ''} mt-4`} {...register("address.state")} placeholder="State" required />
                        </div>

                        <div className="d-flex justify-content-between col-lg-6 col-md-12" style={{ width: "inherit", gap: "24px" }}>
                            <input type="number" className={`${error?.address?.pin_code?.message ? 'error' : ''} mt-4`} {...register("address.pin_code")} placeholder="Pin Code" required />
                            <select {...register("address.country")} className={`${error?.address?.country?.message ? 'error' : ''} mt-4`} required>
                                <option value={""} hidden>Select a country</option>
                                <option value={"India"}>India</option>
                                <option value={"Japan"}>Japan</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Products And Services <span className='required-form'>*</span></label>

                    <div className="form-group col-lg-12 col-md-12"> 
                <CKEditor
                    editor={ClassicEditor}
                    data={watch("product_services")}
                    config={{
                        toolbar: {
                            items: [
                                'heading', '|',
                                'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                                'indent', 'outdent', '|',
                                'blockQuote', '|',
                                'undo', 'redo'
                            ]
                        },
                        placeholder: "Spent several years working on sheep on Wall Street...",
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setValue("product_services", data);
                    }}
                    className={`${error?.product_services ? 'error error-border' : ''}`}
                />
                {error?.product_services && <p className="error">{error.product_services.message}</p>}
            </div>
                 </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Website URL <span className='required-form'>*</span></label>
                    <input type="text" className={`${error?.url?.message ? 'error' : ''}`} {...register("url")} placeholder="http://google.com/" required />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Year Established <span className='required-form'>*</span></label>
                    <div className={error?.year_established?.message ? 'error error-border' : ''}>
                        <DatePicker
                            id='yearEstablished'
                            value={watch(`year_established`)}
                            onChange={(date) => setValue(`year_established`, date)}
                        />
                    </div>
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Target Keywords <span className='required-form'>*</span></label>
                    <input type="text" className={`${error?.keywords?.message ? 'error' : ''}`} {...register("keywords")} placeholder="Please keyword." required />
                </div>
                <div className="form-group">
                    <label> Business / Company Logo <span className='required-form'>*</span></label>
                    <div className="uploading-outer" ref={logoRef} style={{ border: "none", padding: 0, margin: 0 }}>
                        <div className="uploadButton">
                            <input
                                className="uploadButton-input"
                                type="file"
                                accept="image/*"
                                id={`upload-logo`}
                                {...register(`logo`)}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setValue(`logo`, file);
                                    }
                                }}
                            />
                            <label
                                className="uploadButton-button ripple-effect"
                                htmlFor={`upload-logo`}
                            >
                                {(watch(`logo`)?.name || watch(`logo`)?.originalname) || "Upload File"}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label> Videos <span className='required-form'>*</span></label>
                    <div className="uploading-outer" ref={videosRef} style={{ border: "none", padding: 0, margin: 0 }}>
                        <div className="uploadButton">
                            <input
                                className="uploadButton-input"
                                type="file"
                                accept="image/*"
                                id={`upload-video`}
                                {...register(`video`)}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setValue(`videos`, file);
                                    }
                                }}
                            />
                            <label
                                className="uploadButton-button ripple-effect"
                                htmlFor={`upload-video`}
                            >
                                {(watch(`videos`)?.name || watch(`videos`)?.originalname) || "Upload File"}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label> Pictures <span className='required-form'>*</span></label>
                    <div className="uploading-outer" ref={picturesRef} style={{ border: "none", padding: 0, margin: 0 }}>
                        <div className="uploadButton">
                            <input
                                className="uploadButton-input"
                                type="file"
                                accept="image/*"
                                id={`upload-picture`}
                                {...register(`pictures`)}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setValue(`pictures`, file);
                                    }
                                }}
                            />
                            <label
                                className="uploadButton-button ripple-effect"
                                htmlFor={`upload-picture`}
                            >
                                {(watch(`pictures`)?.name || watch(`pictures`)?.originalname) || "Upload File"}
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BusinessDetail