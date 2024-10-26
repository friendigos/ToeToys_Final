'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { register } from '@/store/slices/authSlice'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import MenuJewelry from '@/components/Header/Menu/MenuJewelry'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!termsAccepted) {
            alert("Please accept the Terms & Conditions");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        dispatch(register({ name, email, password }));
    };

    return (
        <>
            <div id="header" className='relative w-full'>
            <MenuJewelry props="bg-white" />
                <Breadcrumb heading='Create An Account' subHeading='Create An Account' />
            </div>
            <div className="register-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Register</div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                                <div className='flex items-center mt-5'>
                                    <div className="block-input">
                                        <input
                                            type="checkbox"
                                            name='remember'
                                            id='remember'
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                        />
                                        <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                    </div>
                                    <label htmlFor='remember' className="pl-2 cursor-pointer text-secondary2">I agree to the
                                        <Link href={'#!'} className='text-black hover:underline pl-1'>Terms & Conditions</Link>
                                    </label>
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <button className="button-main bg-[#1F1F1F]" type="submit" disabled={loading}>
                                        {loading ? 'Registering...' : 'Register'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">Already have an account?</div>
                                <div className="mt-2 text-secondary">Welcome back. Sign in to access your personalized experience, saved preferences, and more. We&apos;re thrilled to have you with us again!</div>
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
