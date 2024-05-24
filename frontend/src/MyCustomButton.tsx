// https://reactnavigation.org/docs/auth-flow/
// TODO: Consider using the above as an example with a parent Login.tsx file,
// this will render something different depending on a simple useState hook
// that is set via the following logic
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

const MyCustomButton = () => {
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
                // Cookie is received (see Network tab),
                // but secure cookies are not set without https...
                // NOTE: set up local https, but still not setting cookie
                // NOTE: NOT visible in Firefox, but is visible in Chrome...
                console.log('res :=>', res)
                console.log('res.headers :=>', res.headers)
                console.log('document.cookie :=>', document.cookie)
                if (!res.ok) throw new Error('Error While Authenticating User!')
                const jsonRes = await res.json()
                const testRes = await fetch(
                    import.meta.env.VITE_BACKEND_TEST_ROUTE,
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Token ${jsonRes.token}`,
                        },
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
