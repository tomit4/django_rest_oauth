import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleOAuthSignInBtn from './GoogleOAuthSignInBtn'
const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID

const Login = () => {
    return (
        <>
            <GoogleOAuthProvider clientId={googleClientId}>
                <GoogleOAuthSignInBtn />
            </GoogleOAuthProvider>
        </>
    )
}

export default Login
