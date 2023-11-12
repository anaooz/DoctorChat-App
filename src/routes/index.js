import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ClipboardList, Home, User } from 'lucide-react-native'

import Inicial from '../screens/Inicial'
import Cadastro from '../screens/Cadastro'
import Login from '../screens/Login'
import HomePage from "../screens/HomePage";
import Agendamento from "../screens/Agendamento";
import Usuario from "../screens/Usuario";
import icons from "../components/icons";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function Footer() {
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 75,
                    backgroundColor: "#292b38",
                }
            }}
            initialRouteName="HomePage">
            <Tab.Screen
            name="Agendamento"
            component={Agendamento}
            options={{
                title: "Agendamento",
                tabBarIcon:({focused}) => (
                    <ClipboardList color={focused ? icons.ativo : icons.desativado} size={icons.tamanho}/>
                ),
            tabBarLabelStyle: {
                fontSize: 16
            }
            }}
            />
            <Tab.Screen
            name="HomePage"
            component={HomePage}
            options={{ 
                title: "Home", 
                tabBarIcon:({focused}) => (
                    <Home color={focused ? icons.ativo : icons.desativado} size={icons.tamanho}/>
                ),
            tabBarLabelStyle: {
                fontSize: 16
            }
        }}
            />
            <Tab.Screen
            name="Usuário"
            component={Usuario}
            options={{
                title: "Usuário",
                tabBarIcon:({focused}) => (
                    <User color={focused ? icons.ativo : icons.desativado} size={icons.tamanho}/>
                ),
            tabBarLabelStyle: {
                fontSize: 16
            }
            }}
            />
        </Tab.Navigator>
    )
}

export default function Routes() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Inicial"
                component={Inicial}
                options={{ headerShown: false}}
                />
                <Stack.Screen
                    name="Cadastro"
                    component={Cadastro}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Footer"
                    component={Footer}
                    options={{ headerShown: false }}
                />
        </Stack.Navigator>
    )
}