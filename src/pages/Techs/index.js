import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    Form,
    Input,
    List,
    Name,
    ProbileButton,
    SubmitButton,
    Tech
} from './styles'

import api from '../../services/api';

export default function Techs() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [techs, setTechs] = useState([]);
    const [newTech, setNewTech] = useState(null);


    async function handleAddTech() {
        setLoading(true);

        const { data } = await api.post('/techs/',
            { id: newTech });

        setTechs([...techs, { id: newTech }]);

        setLoading(false);

        setNewTech(null);

        Keyboard.dismiss();
    }

    async function handleDeleteTech(id) {

        await api.delete(`/techs/${id}`);

        const filteredTechs = techs.filter((item) => item.id != id);

        setTechs(filteredTechs);

    }

    function navigationToDetail(tech) {
        navigation.navigate('TechDetails', { tech });
    }

    return (
        <Container>
            <Form>
                <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Adicionar tecnologia"
                    value={newTech}
                    onChangeText={setNewTech}
                    returnKeyType="send"
                    onSubmitEditing={handleAddTech} />
                <SubmitButton
                    loading={loading}
                    onPress={handleAddTech}>
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                            <Icon name="add" size={20} color="#FFF" />
                        )
                    }
                </SubmitButton>
            </Form>

            <List
                data={techs}
                keyExtractor={(tech) => tech.id}
                renderItem={({ item }) =>
                    (
                        <Tech>
                            <Name>{item.id}</Name>
                            <ProbileButton
                                background="#FFC107"
                                onPress={() => navigationToDetail(item)}>
                                <Icon name="design-services"
                                    size={20}
                                    color='#FFF' />
                            </ProbileButton>


                            <ProbileButton
                                background="#E0A800"
                                onPress={() => handleDeleteTech(item.id)}>
                                <Icon name="delete"
                                    size={20}
                                    color='#FFF' />
                            </ProbileButton>
                        </Tech>
                    )
                }
            />
        </Container>
    );
}