import { Container, TextoInput } from "../components/global";

export default function Agendamento() {
    return(
        <Container>
            <TextoInput placeholder="Inicie aqui seu agendamento..." style={{width: 550, position: 'absolute', bottom: 0}}/>
        </Container>
    )
}