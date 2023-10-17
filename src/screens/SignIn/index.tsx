import React, {useState} from "react";
import {Container, Header, Title, SubTitle, Form, Footer} from "./style"
import {Button} from "../../components/Button";
import {useTheme} from "styled-components";
import {Input} from "../../components/Input";
import {PasswordInput} from "../../components/PasswordInput";
import {Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from "react-native";

export function SignIn() {
    const theme = useTheme()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    return (
        <KeyboardAvoidingView behavior={"position"} enabled={true}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <Title>
                            Estamos {"\n"}
                            quase lá.
                        </Title>
                        <SubTitle>
                            Faça seu login para começar{"\n"}
                            uma experiencia incrível
                        </SubTitle>
                    </Header>
                    <Form>
                        <Input
                            iconName={"mail"}
                            placeholder={"E-mail"}
                            keyboardType={"email-address"}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            onChangeText={(value) => setEmail(value)}
                            value={email}
                        />
                        <PasswordInput
                            iconName={"lock"}
                            placeholder={"Senha"}
                            onChangeText={(value) => setPassword(value)}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title={"Login"}
                            onPress={() => {
                            }}
                            enabled={false}
                            loading={false}
                        />
                        <Button
                            title={"Criar conta gratuita"}
                            onPress={() => {
                            }}
                            enabled={false}
                            loading={false}
                            color={theme.colors.background_secondary}
                            light={true}
                        />

                    </Footer>
                </Container>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    )
}
