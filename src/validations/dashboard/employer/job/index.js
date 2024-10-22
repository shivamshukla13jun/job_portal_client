import * as Yup from "yup"

export const jobSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    jobtype: Yup.string().required('Job Type is required'),
    location: Yup.string().required('Location is required'),
    place: Yup.string().required('Place is required'),
    category: Yup.array().of(
        Yup.object().shape({
            value: Yup.string().required('Category value is required'),
            label: Yup.string().required('Category label is required'),
        })
    ).min(1, 'At least one category is required'),
    opening: Yup.number().required('Opening is required').min(1, 'Opening must be at least 1'),
    age: Yup.number().required('Age is required'),
    candidate_requirement: Yup.object().shape({
        experience: Yup.string().required('Experience is required'),
        salary_from: Yup.number().required('Salary from is required').min(0, 'Salary must be a positive number'),
        salary_to: Yup.number().required('Salary to is required').min(Yup.ref('salary_from'), 'Salary to must be greater than or equal to Salary from'),
        bonus: Yup.boolean().required('Bonus is required'),
        job_info: Yup.string().required('Job info is required'),
        skills: Yup.array().of(
            Yup.object().shape({
                value: Yup.string().required('Skill value is required'),
                label: Yup.string().required('Skill label is required'),
            })
        ).min(1, 'At least one skill is required'),
    }),
    personal_info: Yup.array().of(
        Yup.object().shape({
            info: Yup.string().required('Info is required'),
            assets: Yup.array().of(
                Yup.object().shape({
                    value: Yup.string().required('Skill value is required'),
                    label: Yup.string().required('Skill label is required'),
                })
            ).min(1, 'At least one skill is required'),
        })
    ).required('Personal info is required').min(1, 'At least one personal info is required'),
    timing: Yup.object().shape({
        job: Yup.string().required('Job timing is required'),
        interview: Yup.string().required('Interview timing is required'),
    }),
    company: Yup.object().shape({
        name: Yup.string().required('Company name is required'),
        contact_person: Yup.string().required('Contact person is required'),
        phone: Yup.string().required('Phone is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        contact_person_profile: Yup.string().required('Contact person profile is required'),
        size_of_org: Yup.number().required('Size of organization is required').min(1, 'Size must be at least 1'),
        job_address: Yup.string().required('Job address is required'),
        vacancy: Yup.string().required('Vacancy is required'),
    }),
});


const jobSchemas = {
    title: '',
    location: '',
    place: '',
    category: '',
    opening: 1,
    candidate_requirement: {
        experience: '',
        salary_from: 10000,
        salary_to: 12000,
        bonus: false,
        job_info: '',
        skills: [''],
    },
    personal_info: [
        {
            info: '',
            assets: ['']
        }
    ],
    timing: {
        job: '',
        interview: ''
    },
    company: {
        name: '',
        contact_person: '',
        phone: '',
        email: '',
        contact_person_profile: '',
        size_of_org: 20,
        job_address: '',
        vacancy: '',
    }
};