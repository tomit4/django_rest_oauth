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
            console.log('tokenResponse :=>', tokenResponse)
            try {
                const res = await fetch(
                    import.meta.env.VITE_BACKEND_REGISTRATION_ROUTE,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            access_token: tokenResponse.access_token,
                        }),
                    },
                )
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
        flow: 'implicit',
        // might be useful in getting refresh token from backend
        // returns authorization code to be used to grab new access token/refreshtoken
        // flow: 'auth-code',
    })

    return <button onClick={() => login()}>Sign In With Google</button>
}

export default MyCustomButton
