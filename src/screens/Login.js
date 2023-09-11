import React, { useEffect, useState } from 'react';
import { Container, Botao, TextoInput, TextoBotao } from '../components/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function Login({ navigation }) {
  const [conta, setConta] = useState([]);
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [emailAtivo, setEmailAtivo] = useState('')
  const [senhaAtiva, setSenhaAtiva] = useState('')
  const [loginAtivo, setLoginAtivo] = useState(false)

  async function getConta() {
    const data = await AsyncStorage.getItem('conta')
    const currentData = data ? JSON.parse(data) : []

    setConta(currentData)
  }

  useEffect(() => {
    getConta()
  }, [conta])

  useEffect(() => {
    if(loginAtivo) navigation.navigate('Footer', { 
      screen: "Usuário",
      initial: false,
      params: {
        email: emailAtivo,
        senha: senhaAtiva
      } 
    });
  }, [loginAtivo, navigation])

  // const clearAll = async () => {
  //   await AsyncStorage.clear()
  //   console.log(conta)
  // }

  function checaConta() {
    //console.log(`${conta[0].email}/${email} e ${conta[0].senha}/${senha}`)
    conta.some((element) => {
      if(element.email === email && element.senha === senha) {
        console.log(element)
        setLoginAtivo(true)
        setEmailAtivo(email)
        setSenhaAtiva(senha)
        return
      }
    })
    return Alert.alert("Erro", "E-mail ou senha inválidos!")
  }


  return (
    <Container>
      <TextoInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextoInput
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <Botao title="Login" onPress={() => checaConta()}>
        <TextoBotao>Login</TextoBotao>
      </Botao>
    </Container>
  );
}
