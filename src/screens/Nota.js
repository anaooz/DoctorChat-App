import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Container, Mensagem } from '../components/nota';

export default function Nota({ mensagem, index }) {

    async function removeNota() {
        Alert.alert('Remover atendimento', 'Deseja remover a nota?', [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    const data = await AsyncStorage.getItem('note')
                    const currentData = data ? JSON.parse(data) : []

                    currentData.splice(index, 1)

                    await AsyncStorage.setItem('note', JSON.stringify(currentData))
                }
            }
        ])
    }

    return(
        <Container>
            <Mensagem>{mensagem}</Mensagem>
        </Container>
    )
}