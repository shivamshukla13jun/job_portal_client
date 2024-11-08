
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { post } from '@/services/api';
import { useForm } from 'react-hook-form';

// Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});


const ContactForm = () => {
  // Initialize the form with validation schema via yupResolver
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // TanStack Query mutation hook for form submission
  const { mutate, isLoading, error, data } = useMutation( {
    mutationFn:(data)=>post("utilities/ContactUs",data),
    onSuccess: (data) => {
      console.log('Form submitted successfully', data);
      // You can show a success message or reset the form here
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  // Form submission handler
  const onSubmit = (data) => {
    mutate(data); // Pass form data to the mutation hook
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-lg-12 col-md-12 col-sm-12">
          <div className="response">
            {error && <div className="error-message">{error.message}</div>}
            {data && <div className="success-message">Form submitted successfully!</div>}
          </div>
        </div>

        {/* Name Field */}
        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Your Name*"
            className={`${errors?.username?.message ? 'error' : ''}`}
            {...register('username')}
          />
        </div>

        {/* Email Field */}
        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <label>Your Email</label>
          <input
            type="email"
            
            placeholder="Your Email*"
            {...register('email')}
            className={`${errors?.email?.message ? 'error' : ''}`}
          />
        </div>

        {/* Subject Field */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Subject</label>
          <input
            type="text"
            placeholder="Subject *"
            {...register('subject')}
            className={`${errors?.subject?.message ? 'error' : ''}`}

          />
        </div>

        {/* Message Field */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Your Message</label>
          <textarea
            placeholder="Write your message..."
            {...register('message')}
            className={`${errors?.message?.message ? 'error' : ''}`}

          />
        </div>

        {/* Submit Button */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button className="theme-btn btn-style-one" type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
