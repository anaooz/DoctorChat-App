import { useState, useEffect } from "react";
import { Botao, Container, TextoBotao, TextoInput } from "../components/global";
import { Imagem } from "../components/inicial";
import { Trash2, FileEdit } from "lucide-react-native";
import { TouchableOpacity, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Usuario({ navigation, route }) {
    const [email, setEmail] = useState(route.params.email)
    const [senha, setSenha] = useState(route.params.senha)
    const [conta, setConta] = useState([])

    const icons = {
        tamanho: 60,
        tamanhoFonte: 20
    }


    async function getConta() {
        const data = await AsyncStorage.getItem('conta')
        const currentData = data ? JSON.parse(data) : []
    
        setConta(currentData)
    }

    useEffect(() => {
        getConta()
    }, [conta])

    async function editar(emailToChange, passwordToChange) {
        const updatedAccount = {
            email: emailToChange,
            senha: passwordToChange,
        }

        const accountIndex = conta.findIndex((account) => account.email === emailToChange)

        if (accountIndex !== -1) {
            conta[accountIndex] = updatedAccount;
    
            await AsyncStorage.setItem('conta', JSON.stringify(conta))
            getConta();
            console.log(conta);
            console.log("Sucesso!", "Conta alterada com sucesso!")
    }
}

    function excluir(accountToDelete) {
        Alert.alert("Tem certeza que deseja excluir a conta", "Essa ação é definitiva", [
            {
                text: "Cancelar",
                onPress: () => {return},
                style: 'cancel'
            },
            {
                text: "Ok",
                onPress: async () => {
                    console.log(conta)
                    const atualizaContas = conta.filter(function(e){return e.email !== accountToDelete})
                
                    await AsyncStorage.setItem('conta', JSON.stringify(atualizaContas))
                    getConta()
                    console.log(conta)
                    navigation.navigate('Inicial')
                } 
            }
        ])
    }

    return(
        <Container>
            <Imagem source={require('../img/user.png')}/>
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
        <TouchableOpacity onPress={async () => await editar(email, senha)}>
            <FileEdit size={icons.tamanho} color="white"/>
            <Text style={{fontSize: icons.tamanhoFonte, color: "white"}}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => excluir(email)}>
            <Trash2 size={icons.tamanho} color="red"/>
            <Text style={{fontSize: icons.tamanhoFonte, color: "red"}}>Excluir</Text>
        </TouchableOpacity>
        </Container>
    )
}