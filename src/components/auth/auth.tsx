const AUTH = "auth"

const Auth = {

    signIn: (auth: any) => {
        localStorage.setItem("token", auth.token);
        localStorage.setItem(AUTH, JSON.stringify(auth));
        return true
    },
    signOut: () => {
        localStorage.removeItem(AUTH);
        localStorage.removeItem("token");
        localStorage.clear();
        return true
    },
    getAuth: () => {
        let authObj = localStorage.getItem(AUTH) as string
        return (authObj===null) ? null : JSON.parse(authObj);
    },
    getAuthToken: () => {
        return localStorage.getItem("token") as string
    }
}

export default  Auth;