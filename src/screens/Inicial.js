import { Container, Botao, TextoBotao } from '../components/global'
import { Imagem } from '../components/inicial'

export default function Inicial({ navigation }) {
    return(
        <Container>
            <Imagem source={require('../img/doctorchat.png')}/>
            <Botao onPress={() => navigation.navigate('Login')}>
                <TextoBotao>Login</TextoBotao>
            </Botao>
            <Botao onPress={() => navigation.navigate('Cadastro')}>
                <TextoBotao>Registrar-se</TextoBotao>
            </Botao>
        </Container>
    )
}