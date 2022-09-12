import { Alert, Text, TouchableOpacity, View } from "react-native";
import { getRealm } from "../../database/realm";

import { styles } from "./style";

export type ParticipantProps = {
  _id: string;
  name: string;
  created_at: Date;
}

type Props = {
  data: ParticipantProps;
};

export function Participant({ data, ...rest }: Props) {
  // função que remove participante do banco de dados
  async function participantRemove(id: string) {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const deleted = realm.delete(
          realm
            .objects('Participant')
            .filtered(`_id = '${id}'`)
        )
      });
      Alert.alert("Sucesso", "Participante removido!");
    } catch (error) {
      Alert.alert("Falhou", "Não foi possível remover o participante!");
    }
  }

  //função que executa a query depois do alerta
  function handleParticipantRemove(id: string) {
    Alert.alert(
      "Aviso",
      "O participante será REMOVIDO!",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Confirmar",
          onPress: () => participantRemove(id)
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {data.name}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => handleParticipantRemove(data._id)}>
        <Text style={styles.buttonText}>
          -
        </Text>
      </TouchableOpacity>
    </View>
  )
}
