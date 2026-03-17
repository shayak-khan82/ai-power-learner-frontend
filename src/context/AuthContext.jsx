import React,{createContext,useContext,useEffect,useState} from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const  AuthProvider = ({children}) => {
    const [user,SetUser] = useState(null)
    const[loading,setLoading] = useState(true);
    const [isAuthenticated,setIsAuthenticated] =useState(false);

    useEffect(() => {
        checkAuthStatus()
    },[])

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const userStr = localStorage.getItem('user');

            if(token && userStr){
                const userDate = JSON.parse(userStr);
                SetUser(userDate)
                setIsAuthenticated(true)
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            logout();
        } finally {
            setLoading(false)
        }
    }

    const login = (userDate,token) => {
        localStorage.setItem('token',token)
        localStorage.setItem('user', JSON.stringify(userDate))

        SetUser(userDate)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        SetUser(null);
        setIsAuthenticated(false)
        window.location.href = '/'
    }

    const updateUser = (updateUserData) => {
        const newUserData ={...user,...updateUserData}
        localStorage.setItem('user',JSON.stringify(newUserData))
        SetUser(newUserData)
    }

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        updateUser,
        checkAuthStatus
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}