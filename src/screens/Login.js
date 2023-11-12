import React, { useEffect, useState } from 'react'
import { Container, Botao, TextoInput, TextoBotao } from '../components/global'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export default function Login({ navigation }) {
  const [conta, setConta] = useState([]);
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [emailAtivo, setEmailAtivo] = useState('')
  const [senhaAtiva, setSenhaAtiva] = useState('')
  const [loginAtivo, setLoginAtivo] = useState(false)

  useEffect(() => {
    const getConta = async () => {
      const data = await AsyncStorage.getItem('conta');
      const currentData = data ? JSON.parse(data) : [];
      setConta(currentData);
    };

    getConta();
  }, []);

  useEffect(() => {
    if (loginAtivo) {
      navigation.navigate('Footer', {
        screen: 'Usuário',
        initial: false,
        params: {
          email: emailAtivo,
          senha: senhaAtiva,
        },
      });
    }
  }, [loginAtivo, navigation, emailAtivo, senhaAtiva]);

  function checaConta() {
    if (!conta || conta.length === 0) {
      return Alert.alert('Erro', 'Nenhuma conta encontrada!');
    }

    const found = conta.find(
      (element) => element.email === email && element.senha === senha
    );

    if (found) {
      setLoginAtivo(true);
      setEmailAtivo(email);
      setSenhaAtiva(senha);
    } else {
      Alert.alert('Erro', 'E-mail ou senha inválidos!');
    }
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
