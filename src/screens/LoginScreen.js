import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity }
    from 'react-native'
import api from '../services/api'
import AuthorContext from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = useContext(AuthorContext)

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { identifier, password })
            Alert.alert('sucesso!', 'login realizado com sucesso.')
            // chamar singIn para salvar/atualizar o token global
            await signIn(response.data.token, response.data.user)
            // não precisa redimensionar pq o appnavigator ja o faz
        } catch (e) {
            console.error('erro no login', e.response?.data || e.message)
            Alert.alert('erro no login', 'ocorreu um erro no login :(')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <TextInput
                style={styles.input}
                placeholder="Usuário ou Email"
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Entrar" onPress={handleLogin} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    )

}  