import DatePicker from '@/components/common/date-picker/DatePicker'
import React, { useState } from 'react'

const EmploymentForm = ({ watch, register, setValue, error }) => {
    const index = watch("employment").length - 1;

    return (
        <div className='default-form'>
            <h4>Employment Form</h4>
            <div className='row form-group mt-4'>
                <div className="form-group col-lg-6 col-md-12">
                    <label>Employer Name</label>
                    <input
                        type="text"
                        {...register(`employment.${index}.name`)}
                        onChange={(e) => setValue(`employment.${index}.name`, e.target.value)}
                        placeholder="XYZ"
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Position</label>
                    <input
                        type="text"
                        {...register(`employment.${index}.position`)}
                        onChange={(e) => setValue(`employment.${index}.position`, e.target.value)}
                        placeholder="Software Developer"
                        required
                    />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Department</label>
                    <input
                        type="text"
                        {...register(`employment.${index}.department`)}
                        onChange={(e) => setValue(`employment.${index}.department`, e.target.value)}
                        placeholder="Engineer"
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>From Date</label>
                    <div>
                        <DatePicker
                            id='employmentFromDate'
                            value={watch(`employment.${index}.from`)}
                            onChange={(date) => setValue(`employment.${index}.from`, date)}
                        />
                    </div>
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Till Date</label>
                    <div>
                        <DatePicker
                            id='employmentTillDate'
                            value={watch(`employment.${index}.to`)}
                            onChange={(date) => setValue(`employment.${index}.to`, date)}
                        />
                    </div>
                </div>

                <div className="form-group col-lg-12 col-md-12" style={{ marginBottom: 0 }}>
                    <div role='button' data-bs-dismiss="modal" className="theme-btn btn-style-one">
                        Save
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmploymentForm