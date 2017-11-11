declare module 'react-firebaseui' {
    import * as firebase from 'firebase';

    export type SignInFlows = 'popup' | 'redirect';

    export type AuthUiConfig = {
        signInFlow: SignInFlows,
        signInOptions: string[],
        signInSuccessUrl?: string,
        callbacks?: {
          signInSuccess?: () => boolean;
        }
    }

    export type AuthProps = {
        uiConfig: AuthUiConfig,
        firebaseAuth: firebase.auth.Auth, 
    }

    export const FirebaseAuth: React.ComponentClass<AuthProps>;
}