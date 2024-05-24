// NOTE: You might be tempted to put the authentication
// logic here, but isntead, wrap your entire application
// at the Login.tsx file level, which will render the
// Splash/Intro Page instead of the Application based off
// of the Google Oauth2 logic

const AuthPage = () => {
    return (
        <>
            <div>Congratulations! You Are Authenticated!</div>
        </>
    )
}
export default AuthPage
