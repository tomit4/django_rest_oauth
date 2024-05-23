import { GoogleOAuthProvider } from '@react-oauth/google'
import MyCustomButton from './MyCustomButton'
const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID

const Login = () => {
    return (
        <>
            <GoogleOAuthProvider clientId={googleClientId}>
                <MyCustomButton />
            </GoogleOAuthProvider>
        </>
    )
}

export default Login
