import { useState } from 'react'
import { ArrowSmRightIcon } from '@heroicons/react/solid'
import { sbClient } from '../utils/supabase'
import { LoaderScreen } from './LoaderScreen'

export const LoginScreen = () => {
    const [loading, setLoading] = useState(false)
    const [actionIsLogin, setActionIsLogin] = useState(true)
    const [error, setError] = useState<any>({ error: null, text: null })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const { user, error } = actionIsLogin
            ? await sbClient.auth.signIn({ email, password })
            : await sbClient.auth.signUp({ email, password })

        if (error) {
            setError({ error: true, text: error.message })
        } else if (!actionIsLogin && user) {
            setError({
                error: true,
                text: 'User already exists. Please login instead.',
            })
        } else if (!user && !error) {
            setError({
                error: false,
                text: 'An email has been sent to you for verification!',
            })
        }

        setLoading(false)
    }

    if (loading) return <LoaderScreen />

    return (
        <div className='min-h-full flex items-center justify-center py-12 px-6 lg:px-4'>
            <div className='max-w-sm w-full'>
                <div>
                    <img className='mx-auto h-12 w-auto' src='/app-logo-wide.svg' alt='Authenticator' />
                    <h2 className='mt-6 text-center text-xl tracking-tight font-semibold text-white'>
                        {actionIsLogin ? 'Sign in to continue' : 'Create account'}
                    </h2>
                </div>
                {error && (
                    <div className='mt-6 -mb-4'>
                        <p className='text-sm text-red-500 text-center font-medium'>{error.text}</p>
                    </div>
                )}

                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    <input type='hidden' name='remember' defaultValue='true' />
                    <div className='rounded-md shadow-sm -space-y-px'>
                        <div>
                            <label htmlFor='email-address' className='sr-only'>
                                Email address
                            </label>
                            <input
                                id='email-address'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none'
                                placeholder='Email address'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='sr-only'>
                                Password
                            </label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none'
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                        >
                            <span>Continue</span>
                            <ArrowSmRightIcon className='h-5 w-5 text-primary-100 group-hover:text-primary-200 ml-2 -mr-1' />
                        </button>
                    </div>
                </form>

                <div className='absolute left-0 bottom-0 w-full items-center justify-center flex flex-col space-y-3 py-10'>
                    <p className='text-center text-sm text-gray-300'>
                        Forgot password?{' '}
                        <a
                            href='https://otentik.app/recovery?ref=authenticator'
                            className='font-medium text-primary-500 hover:text-primary-600'
                            rel='noreferrer noopener'
                            target='_blank'
                        >
                            Reset
                        </a>
                    </p>
                    <p className='text-center text-sm text-gray-300'>
                        {actionIsLogin ? "Dont' have account? " : 'Already have account? '}
                        <a
                            href='#'
                            className='font-medium text-primary-500 hover:text-primary-600'
                            onClick={() => setActionIsLogin(!actionIsLogin)}
                        >
                            {actionIsLogin ? 'Register' : 'Login'}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
