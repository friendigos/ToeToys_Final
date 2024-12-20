// 'use client'
// import React, { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { useDispatch, useSelector } from 'react-redux'
// import { AppDispatch, RootState } from '@/store/store'
// import { login, clearError, initializeAuth } from '@/store/slices/authSlice'
// import TopNavOne from '@/components/Header/TopNav/TopNavOne'
// import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
// import Footer from '@/components/Footer/Footer'
// import * as Icon from "@phosphor-icons/react/dist/ssr";
// import MenuJewelry from '@/components/Header/Menu/MenuJewelry'

// const Login = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [rememberMe, setRememberMe] = useState(false)
//     const router = useRouter()
//     const dispatch = useDispatch<AppDispatch>()
//     const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth)

//     useEffect(() => {
//         dispatch(clearError());
//         return () => {
//             dispatch(clearError());
//         };
//     }, [dispatch]);

//     useEffect(() => {
//         if (isAuthenticated) {
//             router.push('/')
//         }
//     }, [isAuthenticated, router])

//     useEffect(() => {
//         dispatch(initializeAuth());
//     }, [dispatch]);

//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             const rememberedEmail = localStorage.getItem('rememberedEmail');
//             if (rememberedEmail) {
//                 setEmail(rememberedEmail);
//                 setRememberMe(true);
//             }
//         }
//     }, []);

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault()
//         try {
//             const result = await dispatch(login({ email, password })).unwrap();
            
//             if (typeof window !== 'undefined') {
//                 if (rememberMe) {
//                     localStorage.setItem('rememberedEmail', email);
//                 } else {
//                     localStorage.removeItem('rememberedEmail');
//                 }
//             }

//             if (result.token) {
//                 router.push('/');
//             }
//         } catch (error: any) {
//             console.error('Login failed:', error);
//         }
//     }

//     return (
//         <>
//             <div id="header" className='relative w-full'>
//                 <MenuJewelry props="bg-white" />
//                 <Breadcrumb heading='Login' subHeading='Login' />
//             </div>
//             <div className="login-block md:py-20 py-10">
//                 <div className="container">
//                     <div className="content-main flex gap-y-8 max-md:flex-col">
//                         <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
//                             <div className="heading4">Login</div>
//                             {error && (
//                                 <div className="text-red-500 mt-2 p-3 rounded bg-red-50">
//                                     {error}
//                                 </div>
//                             )}
//                             <form className="md:mt-7 mt-4" onSubmit={handleLogin}>
//                                 <div className="email">
//                                     <input 
//                                         className="border-line px-4 pt-3 pb-3 w-full rounded-lg" 
//                                         id="username" 
//                                         type="email" 
//                                         placeholder="Username or email address *" 
//                                         required 
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         disabled={loading}
//                                     />
//                                 </div>
//                                 <div className="pass mt-5">
//                                     <input 
//                                         className="border-line px-4 pt-3 pb-3 w-full rounded-lg" 
//                                         id="password" 
//                                         type="password" 
//                                         placeholder="Password *" 
//                                         required 
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         disabled={loading}
//                                     />
//                                 </div>
//                                 <div className="flex items-center justify-between mt-5">
//                                     <div className='flex items-center'>
//                                         <div className="block-input">
//                                             <input
//                                                 type="checkbox"
//                                                 name='remember'
//                                                 id='remember'
//                                                 checked={rememberMe}
//                                                 onChange={(e) => setRememberMe(e.target.checked)}
//                                                 disabled={loading}
//                                             />
//                                             <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
//                                         </div>
//                                         <label htmlFor='remember' className="pl-2 cursor-pointer">Remember me</label>
//                                     </div>
//                                     <Link href={'/forgot-password'} className='font-semibold hover:underline'>
//                                         Forgot Your Password?
//                                     </Link>
//                                 </div>
//                                 <div className="block-button md:mt-7 mt-4">
//                                     <button 
//                                         type="submit" 
//                                         className={`button-main bg-[#1f1f1f] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                                         disabled={loading}
//                                     >
//                                         {loading ? (
//                                             <span className="flex items-center justify-center">
//                                                 <Icon.CircleNotch className="animate-spin mr-2" />
//                                                 Logging in...
//                                             </span>
//                                         ) : (
//                                             'Login'
//                                         )}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                         <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
//                             <div className="text-content">
//                                 <div className="heading4">New Customer</div>
//                                 <div className="mt-2 text-secondary">Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.</div>
//                                 <div className="block-button md:mt-7 mt-4">
//                                     <Link href={'/register'} className="button-main bg-[#1f1f1f]">Register</Link>
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

// export default Login

'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { login, clearError, initializeAuth } from '@/store/slices/authSlice'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import MenuJewelry from '@/components/Header/Menu/MenuJewelry'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        dispatch(clearError());
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated, router])

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const rememberedEmail = localStorage.getItem('rememberedEmail');
            if (rememberedEmail) {
                setEmail(rememberedEmail);
                setRememberMe(true);
            }
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await dispatch(login({ email, password })).unwrap();
            
            if (typeof window !== 'undefined') {
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
            }

            if (result.token) {
                router.push('/');
            }
        } catch (error: any) {
            console.error('Login failed:', error);
        }
    }

    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuJewelry props="bg-white" />
                <Breadcrumb heading='Login' subHeading='Login' />
            </div>
            <div className="login-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Login</div>
                            {error && (
                                <div className="text-red-500 mt-2 p-3 rounded bg-red-50">
                                    {error}
                                </div>
                            )}
                            <form className="md:mt-7 mt-4" onSubmit={handleLogin}>
                                <div className="email">
                                    <input 
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg" 
                                        id="username" 
                                        type="email" 
                                        placeholder="Username or email address *" 
                                        required 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="pass mt-5">
                                    <input 
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg" 
                                        id="password" 
                                        type="password" 
                                        placeholder="Password *" 
                                        required 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-5">
                                    <div className='flex items-center'>
                                        <div className="block-input">
                                            <input
                                                type="checkbox"
                                                name='remember'
                                                id='remember'
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                disabled={loading}
                                            />
                                            <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                        </div>
                                        <label htmlFor='remember' className="pl-2 cursor-pointer">Remember me</label>
                                    </div>
                                    <Link href={'/forgot-password'} className='font-semibold hover:underline'>
                                        Forgot Your Password?
                                    </Link>
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <button 
                                        type="submit" 
                                        className={`button-main bg-[#1f1f1f] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center">
                                                <Icon.CircleNotch className="animate-spin mr-2" />
                                                Logging in...
                                            </span>
                                        ) : (
                                            'Login'
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Google Authentication Button */}
                            <div className="block-button mt-4">
                                <button 
                                    type="button"
                                    onClick={() => window.location.href = '/auth/google'}
                                    className="button-main bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
                                    disabled={loading}
                                >
                                    <Icon.GoogleLogo size={20} className="mr-2" />
                                    Login with Google
                                </button>
                            </div>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">New Customer</div>
                                <div className="mt-2 text-secondary">Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.</div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/register'} className="button-main bg-[#1f1f1f]">Register</Link>
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

export default Login
