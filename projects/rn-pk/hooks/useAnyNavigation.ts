import { useNavigation } from "@react-navigation/native";

// Only fo skip type checking.
export function useAnyNavigation() {
  return useNavigation<any>();
}
