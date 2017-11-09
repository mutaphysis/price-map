declare module 'react-firebase' {
    import * as firebase from 'firebase';

    export type FirebaseProps = { 
        firebaseApp: firebase.app.App,
        firebaseRef: () => firebase.database.Reference,
    };
  
    export function connect<PropT>(props: any) : ((component: React.ComponentClass<PropT & FirebaseProps>) => React.ComponentClass<PropT>);
}