// 'use client'
// import React, { useState } from 'react'
// import Link from 'next/link'
// import TopNavOne from '@/components/Header/TopNav/TopNavOne'
// import MenuOne from '@/components/Header/Menu/MenuOne'
// import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
// import Footer from '@/components/Footer/Footer'
// import * as Icon from "@phosphor-icons/react/dist/ssr";
// import axios from 'axios'

// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             setError("Passwords do not match.");
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/register', {
//                 name,
//                 email,
//                 password,
//             });

//             // Assuming the response contains a token
//             const { token } = response.data;

//             // Store the token (e.g., in localStorage)
//             localStorage.setItem('authToken', token);

//             setSuccess('Registration successful!');

//             // Optionally, redirect to the homepage or user dashboard
//             // window.location.href = '/'; // Uncomment if you want to redirect
//         } catch (err) {
//             setError(err.response?.data?.message || 'An error occurred');
//         }
//     };


//     return (
//         <>
//             <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
//             <div id="header" className='relative w-full'>
//                 <MenuOne props="bg-transparent" />
//                 <Breadcrumb heading='Create An Account' subHeading='Create An Account' />
//             </div>
//             <div className="register-block md:py-20 py-10">
//                 <div className="container">
//                     <div className="content-main flex gap-y-8 max-md:flex-col">
//                         <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
//                             <div className="heading4">Register</div>
//                             <form className="md:mt-7 mt-4">
//                                 <div className="email ">
//                                     <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="username" type="email" placeholder="Username or email address *" required />
//                                 </div>
//                                 <div className="pass mt-5">
//                                     <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="password" type="password" placeholder="Password *" required />
//                                 </div>
//                                 <div className="confirm-pass mt-5">
//                                     <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="confirmPassword" type="password" placeholder="Confirm Password *" required />
//                                 </div>
//                                 <div className='flex items-center mt-5'>
//                                     <div className="block-input">
//                                         <input
//                                             type="checkbox"
//                                             name='remember'
//                                             id='remember'
//                                         />
//                                         <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
//                                     </div>
//                                     <label htmlFor='remember' className="pl-2 cursor-pointer text-secondary2">I agree to the
//                                         <Link href={'#!'} className='text-black hover:underline pl-1'>Terms of User</Link>
//                                     </label>
//                                 </div>
//                                 <div className="block-button md:mt-7 mt-4">
//                                     <button className="button-main">Register</button>
//                                 </div>
//                             </form>
//                         </div>
//                         <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
//                             <div className="text-content">
//                                 <div className="heading4">Already have an account?</div>
//                                 <div className="mt-2 text-secondary">Welcome back. Sign in to access your personalized experience, saved preferences, and more. We{String.raw`'re`} thrilled to have you with us again!</div>
//                                 <div className="block-button md:mt-7 mt-4">
//                                     <Link href={'/login'} className="button-main">Login</Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default Register

'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
            });

            // Assuming the response contains a token
            const { token } = response.data;

            // Store the token (e.g., in localStorage)
            localStorage.setItem('authToken', token);

            setSuccess('Registration successful!');

            // Optionally, redirect to the homepage or user dashboard
            // router.push('/'); // Uncomment if you want to redirect
        } catch (err: unknown) {
            // Check if the error has a response property
            if (axios.isAxiosError(err)) {
                // Accessing the error response
                setError(err.response?.data?.message || 'An error occurred');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Create An Account' subHeading='Create An Account' />
            </div>
            <div className="register-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Register</div>
                            <form className="md:mt-7 mt-4" onSubmit={handleSubmit}>
                                <div className="email ">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        id="name"
                                        type="text"
                                        placeholder="Name *"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="email mt-5">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        id="email"
                                        type="email"
                                        placeholder="Email address *"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="pass mt-5">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        id="password"
                                        type="password"
                                        placeholder="Password *"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="confirm-pass mt-5">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password *"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                {success && <p style={{ color: 'green' }}>{success}</p>}
                                <div className='flex items-center mt-5'>
                                    <div className="block-input">
                                        <input
                                            type="checkbox"
                                            name='remember'
                                            id='remember'
                                        />
                                        <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                    </div>
                                    <label htmlFor='remember' className="pl-2 cursor-pointer text-secondary2">I agree to the
                                        <Link href={'#!'} className='text-black hover:underline pl-1'>Terms of User</Link>
                                    </label>
                                    <div className="block-button md:mt-7 mt-4">
                                    <button className="button-main" type="submit">Register123</button>
                                </div>
                                </div>
                                
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">Already have an account?</div>
                                <div className="mt-2 text-secondary">Welcome back. Sign in to access your personalized experience, saved preferences, and more. We{String.raw`'re`} thrilled to have you with us again!</div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/login'} className="button-main">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register;
