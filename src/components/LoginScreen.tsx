import { useState } from 'react'
import { ArrowSmRightIcon } from '@heroicons/react/solid'
import { sbClient } from '../utils/supabase'
import { LoaderScreen } from './LoaderScreen'
import { classNames } from '../utils/helpers'
import toast from 'react-hot-toast'
import { AppLogo } from './AppLogo'

export const LoginScreen = () => {
    const [loading, setLoading] = useState(false)
    const [actionIsLogin, setActionIsLogin] = useState(true)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [realname, setRealName] = useState('')

    const handleLogin = async () => {
        const { error } = await sbClient.auth.signIn({ email, password })

        if (error) {
            setLoading(false)
            return toast.error(error.message)
        }

        // .then((resp) => {

        //     if (!resp.user) return toast.error('You are not registered yet!')
        //     if (resp.error) return toast.error(resp.error.message)
        // })
        // .catch((error) => {

        // })
        // .finally(() => setLoading(false))
    }

    const handleRegister = async () => {
        await sbClient.auth
            .signUp({ email, password }, { data: { realname, avatar_url: null, onboarded_at: null } })
            .then(async (resp) => {
                if (resp.error) {
                    setLoading(false)
                    return toast.error(resp.error.message)
                }

                if (resp.user) {
                    setLoading(false)
                    return toast.success('You are already registered!')
                }

                setActionIsLogin(true)
                return toast.success('Check your email to verify your account!')
            })
            .catch((error) => {
                setLoading(false)
                return toast.error(error.message)
            })
            .finally(() => setLoading(false))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        return actionIsLogin ? handleLogin() : handleRegister()
    }

    if (loading) return <LoaderScreen />

    return (
        <div
            className={classNames(
                actionIsLogin ? 'py-12' : 'py-0',
                'flex min-h-full items-center justify-center px-6'
            )}
        >
            <div className='w-full max-w-sm'>
                <div>
                    <AppLogo className={classNames(actionIsLogin ? 'h-12' : 'h-8', 'mx-auto w-auto')} />
                    <h2 className='mt-8 text-center text-xl font-semibold tracking-tight text-white'>
                        {actionIsLogin ? 'Sign in to continue' : 'Create account'}
                    </h2>
                </div>

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
                        {!actionIsLogin && (
                            <>
                                <div>
                                    <label htmlFor='realname' className='sr-only'>
                                        First name
                                    </label>
                                    <input
                                        id='realname'
                                        name='realname'
                                        type='text'
                                        autoComplete='realname'
                                        required
                                        className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none'
                                        placeholder='Full name'
                                        onChange={(e) => setRealName(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
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
                    {/* <p className='text-center text-sm text-gray-300'>
                        Forgot password?{' '}
                        <a
                            href='https://otentik.app/recovery?ref=authenticator'
                            className='font-medium text-primary-500 hover:text-primary-600'
                            rel='noreferrer noopener'
                            target='_blank'
                        >
                            Reset
                        </a>
                    </p> */}
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
