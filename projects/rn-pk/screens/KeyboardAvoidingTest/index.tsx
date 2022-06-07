import { useAnyNavigation } from "../../hooks/useAnyNavigation";
import { Text, TouchableOpacity, View } from "react-native";

const Item = ({ label, onPress }: { label: string, onPress: () => void }) => {
  return <TouchableOpacity onPress={onPress}>
    <Text>{label}</Text>
  </TouchableOpacity>;
};

export default function KeyboardAvoidingTest() {
  const navigation = useAnyNavigation();

  return <View style={{ flex: 1, flexDirection: "column" }}>
    <Item label={"KeyboardAvoidingCommon"} onPress={() => navigation.navigate("KeyboardAvoidingCommon")}/>
    <Item label={"KeyboardAvoidingCommon"} onPress={() => navigation.navigate("KeyboardAvoidingCommon")}/>
    <Item label={"KeyboardAvoidingCommon"} onPress={() => navigation.navigate("KeyboardAvoidingCommon")}/>
  </View>;
}
