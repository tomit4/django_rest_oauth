// https://reactnavigation.org/docs/auth-flow/
// TODO: Consider using the above as an example with a parent Login.tsx file,
// this will render something different depending on a simple useState hook
// that is set via the following logic
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

const MyCustomButton = () => {
    // TODO: Put in utils folder/file
    const grabStoredCookie = (cookieKey: string): string => {
        const cookies: { [key: string]: string } = document.cookie
            .split('; ')
            .reduce((prev: { [key: string]: string }, current) => {
                const [key, ...value] = current.split('=')
                prev[key] = value.join('=')
                return prev
            }, {})
        const cookieVal = cookieKey in cookies ? cookies[cookieKey] : ''
        return cookieVal
    }
    const navigate = useNavigate()
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse): Promise<void> => {
            try {
                const res = await fetch(
                    import.meta.env.VITE_BACKEND_REGISTRATION_ROUTE,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            code: tokenResponse.code,
                        }),
                    },
                )
                if (!res.ok) throw new Error('Error While Authenticating User!')
                // TODO: Now that we have secure cookie, figure out how to pass it here
                // and then separate this logic out as a router guard
                const csrfToken = grabStoredCookie('csrftoken')
                const testRes = await fetch(
                    import.meta.env.VITE_BACKEND_TEST_ROUTE,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrfToken,
                        },
                        credentials: 'include',
                    },
                )
                if (!testRes.ok)
                    throw new Error('Error While Authenticating User')
                navigate('/auth')
            } catch (err) {
                console.error('ERROR :=>', err)
                navigate('/')
            }
        },
        onError: (err) => {
            console.error('ERROR :=>', err)
            navigate('/')
        },
        flow: 'auth-code',
    })

    return <button onClick={() => login()}>Sign In With Google</button>
}

export default MyCustomButton
