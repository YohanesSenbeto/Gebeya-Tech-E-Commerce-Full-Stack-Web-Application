import React, { useState } from 'react';
import { FormData, signup } from './services/signupService';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: ''
  });


  const navigate = useNavigate();

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  

  const [emailError, setEmailError] = useState("");
 
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };
 

  const validate = () => {
    const newErrors: Partial<FormData> = {};
     // Handle client-side validations here
  let valid = true; // Flag

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';

    const user_email = formData.email;

// Email validation
if (!user_email) {
    setEmailError("Please enter your email address");
    valid = false;
  } else if (!user_email.includes("@")) {
    setEmailError("Invalid email format");
    valid = false;
  } else {
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(user_email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }
  }


   // Strong password validation with regex
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
   if (!formData.password || !passwordRegex.test(formData.password)) {
     newErrors.password = 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character';
   }

   if (formData.password !== formData.confirmPassword) {
     newErrors.confirmPassword = 'Passwords do not match';
   }
  

  console.log(emailError);
  console.log(emailError);
  console.log(emailError);
  console.log(emailError);
  



    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    if (!formData.gender) newErrors.gender = 'gender is required';

    // Phone number validation with regex for Ethiopian numbers
    const phoneRegex = /^(\+251|0)?9\d{8}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number is not valid. Must be in format +251912345678 or 0912345678';
    }

    if (valid) {
        console.log("Valid");
        };
    

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setServerError(null);
      await signup(formData);
      // Handle successful signup, e.g., redirect to login
      navigate('/login');
    } catch (error) {
      setServerError(error.message);
    }
  };


console.log(formData);



  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b1e3b] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h4 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-950">
            Welcome to Gebeya Tech <br/> E-commerce
          </h4>
          <p className="mt-2 text-center text-sm text-gray-500">
            Welcome to Gebeya Tech E-commerce Your Gateway to Seamless Shopping!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {serverError && <div className="text-red-500">{serverError}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
              Full Name
            </label>
            <div className="mt-1">
              <input
                autoComplete="name"
                className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0b1e3b] focus:outline-none focus:ring-[#0b1e3b] sm:text-sm"
                id="fullName"
                name="fullName"
                required
                type="text"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <div className="text-red-500">{errors.fullName}</div>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email address
            </label>
            <div className="mt-1">
              <input
                autoComplete="email"
                className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0b1e3b] focus:outline-none focus:ring-[#0b1e3b] sm:text-sm"
                id="email"
                name="email"
                required
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {emailError && <div className="text-red-500">{emailError}</div>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              Username
            </label>
            <div className="mt-1">
              <input
                autoComplete="username"
                className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0b1e3b] focus:outline-none focus:ring-[#0b1e3b] sm:text-sm"
                id="username"
                name="username"
                required
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <div className="text-red-500">{errors.username}</div>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="mt-1">
              <input
                autoComplete="current-password"
                className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0b1e3b] focus:outline-none focus:ring-[#0b1e3b] sm:text-sm"
                id="password"
                name="password"
                required
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="text-red-500">{errors.password}</div>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                autoComplete="current-password"
                className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0b1e3b] focus:outline-none focus:ring-[#0b1e3b] sm:text-sm"
                id="confirmPassword"
                name="confirmPassword"
                required
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
              Phone Number
            </label>
            <div className="mt-1">
              <input
                autoComplete="tel"
                className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0b1e3b] focus:outline-none focus:ring-[#0b1e3b] sm:text-sm"
                id="phone"
                name="phone"
                required
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="text-red-500">{errors.phone}</div>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="gender">
              Gender
            </label>
            <div className="mt-1">
              <select
                className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0b1e3b] focus:outline-none focus:ring-[#0b1e3b] sm:text-sm"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <div className="text-red-500">{errors.gender}</div>}
            </div>
          </div>
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-[#0b1e3b] py-2 px-4 text-sm font-medium text-white hover:bg-[#0a1a32] focus:outline-none focus:ring-2 focus:ring-[#0b1e3b] focus:ring-offset-2"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account?
              <a
                className="font-medium text-[#0b1e3b] hover:text-[#0a1a32]"
                href="#"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}