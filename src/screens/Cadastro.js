import React, { useState, useEffect } from 'react'
import { Alert, Text } from 'react-native'
import { Botao, Container, TextoBotao, TextoInput, Scroll } from '../components/global'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

export default function CadastroScreen({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cadastroRealizado, setCadastroRealizado] = useState(false);

  const input = {
    desativado: "#bbc0c7"
  }

  useEffect(() => {
    if (cadastroRealizado) {
      salvaConta()
      navigation.navigate('Login');
    }
  }, [cadastroRealizado, navigation]);

  const vazio = (email.length === 0 || senha.length === 0 || confirmarSenha.length === 0)
  const senhaIgual = senha !== confirmarSenha

  const handleConta = () => {
    
    if(vazio) Alert.alert('Erro', "Campos incompletos")

    else if(senhaIgual) Alert.alert('Erro', 'Senha não corresponde')

    else setCadastroRealizado(true)
  };

  async function salvaConta() {

    const conta = {
      email,
      senha
    }

    const data = await AsyncStorage.getItem('conta')
    const currentData = data ? JSON.parse(data) : []
    const formattedData = [
      ...currentData,
      conta
    ]
    console.log(`${JSON.stringify(formattedData)}`)
    await AsyncStorage.setItem('conta', JSON.stringify(formattedData))
  }

  const getCEP = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const data = response.data
      setLogradouro(data.logradouro)
      setBairro(data.bairro)
      setComplemento(data.complemento)
      if(data.complemento == "") setComplemento("N/A")
    } catch(error) {
      console.log("Erro na requisição: ", error)
    }
  }

  return (
    <Container>
      {cadastroRealizado && (
        <Text>Cadastro realizado!</Text>
      )}
      <Scroll>
        <TextoInput
          placeholder="Nome completo"
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />
        <TextoInput
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
        />
        <TextoInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextoInput
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TextoInput
          placeholder="Confirmar senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        <TextoInput
          placeholder="Data de Nascimento"
          value={dataNascimento}
          onChangeText={setDataNascimento}
        />
        <TextoInput
          placeholder="CEP"
          value={cep}
          onChangeText={setCep}
          onBlur={getCEP}
        />
        <TextoInput
          placeholder="Logradouro"
          value={logradouro}
          onChangeText={setLogradouro}
          editable={false}
          style={{backgroundColor: input.desativado}}
          placeholderTextColor={'black'}
        />
        <TextoInput
          placeholder="Número"
          value={numero}
          onChangeText={setNumero}
        />
        <TextoInput
          placeholder="Bairro"
          value={bairro}
          onChangeText={setBairro}
          editable={false}
          style={{ backgroundColor: input.desativado }}
          placeholderTextColor={'black'}
        />
        <TextoInput
          placeholder="Complemento"
          value={complemento}
          onChangeText={setComplemento}
          editable={false}
          style={{ backgroundColor: input.desativado }}
          placeholderTextColor={'black'}
        />
        <Botao onPress={handleConta}>
          <TextoBotao>Cadastrar</TextoBotao>
        </Botao>
      </Scroll>
    </Container>
  );
}