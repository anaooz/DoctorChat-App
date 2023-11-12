//https://www.npmjs.com/package/react-native-dotenv
//https://medium.com/swlh/how-to-properly-use-environment-variables-in-an-expo-react-native-app-7ab852590b30
import { OPEN_AI_KEY } from '@env'
import { useState } from 'react'
import { Container, TextoInput, EnviaSolicitacao, AreaAgendamento } from '../components/global'
import axios from 'axios'
import { SendHorizontal } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Agendamento({ navigation }) {
//https://medium.com/@vibinreji123/integrating-chatgpt-3-5-into-your-react-native-application-a5a6f691b061
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('')
    const [agendamento, setAgendamento] = useState('')
        
    const sendMessage = async() => {
        const userMessage = { role: 'user', content: inputText}
        setMessages([...messages, userMessage])
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [...messages, userMessage],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPEN_AI_KEY}`
                    },
                }
            )
            const botMessage = {
                role: 'bot',
                content: response.data.choices[0].message.content,
            }
            setMessages([...messages, botMessage])
            setAgendamento(botMessage.content)
            

            const data = await AsyncStorage.getItem('note')
            const currentData = data ? JSON.parse(data) : []
            const formattedData = [
                ...currentData,
                agendamento
            ]

            await AsyncStorage.setItem('note', JSON.stringify(formattedData))

            navigation.navigate("HomePage")

            console.log(`messages: ${messages}\n` )
            console.log(`botMessage: ${JSON.stringify(botMessage)}`)
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    return(
        <Container>
            <AreaAgendamento>
                <TextoInput value={inputText} onChangeText={text => setInputText(text)} placeholder="Inicie aqui seu agendamento..."/>
                <EnviaSolicitacao onPress={() => sendMessage()}>
                    <SendHorizontal color={"white"} size={50}/>
                </EnviaSolicitacao>
            </AreaAgendamento>
        </Container>
    )
}