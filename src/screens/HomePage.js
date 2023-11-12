import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container, TextoBotao } from '../components/global'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native';

import Nota from './Nota';

export default function HomePage({ navigation }) {
    const [notes, setNotes] = useState([])

    async function getNote() {
        const data = await AsyncStorage.getItem('note')
        const currentData = data ? JSON.parse(data) : []
        setNotes(currentData)
    }

    useEffect(() => {
        getNote()
    }, [notes])

    return(
        <Container>
            {notes.length > 0 ? (
                <FlatList
                    data={notes}
                    renderItem={({ item, index }) => (
                        <Nota mensagem={item.body} index={index}/>
                )}
            />
            ) : <TextoBotao>Sem agendamentos!</TextoBotao>}
        </Container>
    )
}