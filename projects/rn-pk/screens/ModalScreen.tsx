import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { useNavigation } from "@react-navigation/native";

export default function ModalScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 6 }}/>
      <View style={{ width: "100%", flex: 4, backgroundColor: "gray" }}>
        <Text>内容</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent"
  },
});
