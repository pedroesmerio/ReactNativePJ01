import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Participant } from "../components/Participant";

import { styles } from "./style";

export function Home() {

  function handleParticipantAdd() {
    console.log(`Você clicou em adicionar participante!`);
  }

  function handleParticipantRemove(name: string) {
    console.log(`Você clicou em remover o participante: ${name}`);
  }


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
        />

        <TouchableOpacity style={styles.button}
          onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <Participant name={"Pedro Henrique"} onRemove={() => handleParticipantRemove("Pedro Esmerio")} />
      <Participant name={"Maria Luiza"} onRemove={() => handleParticipantRemove("Maria Luiza")} />
      <Participant name={"Hinnara Maria"} onRemove={() => handleParticipantRemove("Hinnara Maria")} />
      <Participant name={"Genival Luna"} onRemove={() => handleParticipantRemove("Genival Luna")} />
    </View>
  )
}
