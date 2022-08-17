import { useState } from 'react'
import { ArrowSmRightIcon } from '@heroicons/react/solid'
import { sbClient } from '../utils/supabase'
import { LoaderScreen } from './LoaderScreen'
import { useStores } from '../stores/stores'

export const LoginScreen = () => {
    const loading = useStores((state) => state.loading)
    const setLoading = useStores((state) => state.setLoading)

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
        <div className='flex min-h-full items-center justify-center py-12 px-6 lg:px-4'>
            <div className='w-full max-w-sm'>
                <div>
                    <img className='mx-auto h-12 w-auto' src='/app-logo-wide.svg' alt='Authenticator' />
                    <h2 className='mt-6 text-center text-xl font-semibold tracking-tight text-white'>
                        {actionIsLogin ? 'Sign in to continue' : 'Create account'}
                    </h2>
                </div>
                {error && (
                    <div className='mt-6 -mb-4'>
                        <p className='text-center text-sm font-medium text-red-500'>{error.text}</p>
                    </div>
                )}

                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    <input type='hidden' name='remember' defaultValue='true' />
                    <div className='-space-y-px rounded-md shadow-sm'>
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
                                className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none'
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
                                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none'
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-3 px-4 text-sm font-bold uppercase text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                        >
                            <span>Continue</span>
                            <ArrowSmRightIcon className='ml-2 -mr-1 h-5 w-5 text-primary-100 group-hover:text-primary-200' />
                        </button>
                    </div>
                </form>

                <div className='absolute left-0 bottom-0 flex w-full flex-col items-center justify-center space-y-3 py-10'>
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
