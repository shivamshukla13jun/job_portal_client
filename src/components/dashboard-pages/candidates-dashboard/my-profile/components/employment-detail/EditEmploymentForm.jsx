import DatePicker from '@/components/common/date-picker/DatePicker'
import { categories } from '@/data/category';
import React, { useState } from 'react'
import { Controller } from 'react-hook-form';
import Select from "react-select";
const EditEmploymentForm = ({ watch, register, setValue, error, index ,control}) => {

    if (index === null) {
        return;
    }

    return (
        <div className='default-form'>
            <h4>Employment Form</h4>
            <div className='row form-group mt-4'>
                <div className="form-group col-lg-6 col-md-12">
                    <label>Employer Name</label>
                    <input type="text" {...register(`employment.${index}.name`)} placeholder="XYZ" required />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Position</label>
                    <input type="text" {...register(`employment.${index}.position`)} placeholder="Software Developer" required />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Department</label>
                    <input type="text" {...register(`employment.${index}.department`)} placeholder="Engineer" required />
                </div>
                     <div className="form-group col-lg-12 col-md-12">
                        <label>
                            Job Sector <span className="required-form">*</span>
                        </label>
                        <Controller
                            name={`employment.${index}.categories`}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                            <Select
                                {...field}
                                isMulti
                                options={categories}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                            )}
                        />
                        {error.employment?.[index]?.categories && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    <div className="form-group col-lg-12 col-md-12">
                    <label>Scope of Work</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register(`employment.${index}.scope`)}
                        placeholder="Scope"
                    />
                    {error?.employment?.[index]?.scope && (
                        <span className="text-red-500">This field is required</span>
                    )}
                    </div>
                <div className="form-group col-lg-6 col-md-12">
                    <label>From Date</label>
                    <div>
                        <DatePicker
                            id='employmentFromDate'
                            value={watch?.from}
                            onChange={(date) => setValue(`employment.${index}.from`, date)}
                        />
                    </div>
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Till Date</label>
                    <div>
                        <DatePicker
                            id='employmentTillDate'
                            value={watch?.to}
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

export default EditEmploymentForm