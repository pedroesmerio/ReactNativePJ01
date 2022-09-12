import { useContext, useEffect, useState } from "react";
// import { GlobalContext } from "../../contexts/GlobalContext";

import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Participant, ParticipantProps } from "../../components/Participant";

import { getRealm } from "../../database/realm";
import uuid from 'react-native-uuid';

import { styles } from "./style";



export function Home() {
  // Todo: Mover a lógica de execução das Query para o GlobalContext e executar elas por aqui 
  //
  // const {
  //   addParticipant,
  //   removeParticipant,
  //   fetchParticipant
  // } = useContext(GlobalContext);

  // Array de participantes
  const [participants, setParticipants] = useState<ParticipantProps[]>([])
  // State guardando o nome do participant que será enviado no input
  const [nameParticipant, setNamePaticipant] = useState('')

  // função que adiciona participante ao banco de dados
  async function handleParticipantAdd() {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const created = realm.create("Participant", {
          _id: uuid.v4(),
          name: nameParticipant,
          created_at: new Date(),
        });
        console.log("Participante cadastrado como ==>", created);
        setNamePaticipant('')
        fetchParticipants();
      });
      Alert.alert("Sucesso", "Participante cadastro com sucesso!");
    } catch (error) {
      console.log(error)
      Alert.alert("Falhou", "Não foi possível cadastrar participante!");
    }
  }

  // função que puxa os dados do banco
  async function fetchParticipants() {
    const realm = await getRealm();

    try {
      const response = realm
        .objects<ParticipantProps[]>("Participant")
        .sorted("created_at", true) //true diz que o revesed = true
        .toJSON();
      setParticipants(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os participantes");
    } finally {
      realm.close();
    }
  }

  //Puxa os os participantes quando o component é renderizado pela primeira vez
  useEffect(() => {
    fetchParticipants();
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setNamePaticipant}
          value={nameParticipant}
        />

        <TouchableOpacity style={styles.button}
          onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Participant
            key={item._id}
            data={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença
          </Text>
        )}
      />
    </View>
  )
}
