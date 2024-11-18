import React from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
import "./achieements.css"
const yearsArray = Array.from({ length: new Date().getFullYear() - 1901 + 1 }, (_, i) => 1901 + i);

const Achievements = ({ watch, register, setValue, error, control }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'achievement', // The name must match your form structure
    });

    return (
        <div className="achievements-container">
            {fields.map((item, index) => (
                <div className="row mb-3" key={index}>
                    <div className="col-md-6">
                        <label>
                            Year of Achievement <span className="labelerrorssss">*</span>
                        </label>
                        <Controller
                            name={`achievement.${index}.year`}
                            control={control}
                            render={({ field }) => (
                                <select {...field} className="form-control">
                                    <option hidden>Select Year of Achievement</option>
                                    {yearsArray.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        {error?.achievement?.[index]?.year && (
                            <div className="field-error">{error.achievement[index].year.message}</div>
                        )}

                        <label>
                            Description <span className="labelerrorssss">*</span>
                        </label>
                        <textarea
                            {...register(`achievement.${index}.description`)}
                            placeholder="Description"
                            rows="6"
                            className="form-control"
                        />
                        {error?.achievement?.[index]?.description && (
                            <div className="field-error">
                                {error.achievement[index].description.message}
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <button
                            type="button"
                            className="search-partner add- mt-0"
                            onClick={() => remove(index)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <button
                type="button"
                className="theme-btn btn-style-three my-4 col-md-12"
                onClick={() => append({ year: '', description: '' })}
            >
              {fields.length>0?"Add More":"Add"}  
            </button>
        </div>
    );
};

export default Achievements;
