import React, {createContext, useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
 
const AuthorContext = createContext()
 
export const AuthorProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
 
    const singIn = async (token, userData) => {
        try{
            await AsyncStorage.setItem('userToken', token)
            setUserToken(token)
        } catch (e) {
            console.error('Erro ao salvar token/dados no AsyncStorage', e)
        }
    }
 
    const signOut = async () => {
        try{
            console.log('AuthContext: Iniciando signOut(). Removendo token');
            await AsyncStorage.removeItem('userToken')
            setUserToken(null)
        } catch (e) {
            console.error('AuthContext: Erro no signOut(). Removendo token falhou.', e);
        }
    }
    //função q carrega o token sempre q inicia o app
    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken')
                if (token) {
                    setUserToken(token)
                }
            } catch (e) {
                console.error('Erro ao carregar token', e)
            } finally {
                setIsLoading(false)
            }
        }
 
        loadToken()
    }, [])
 
    return (
        <AuthorContext.Provider value={{userToken, isLoading, singIn, signOut}} >
            {children}
        </AuthorContext.Provider>
    )
 
}
 
export default AuthorContext