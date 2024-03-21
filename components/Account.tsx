import { Session } from "@supabase/supabase-js";
import { useSession } from "../context/AuthSession";
import { Text, View } from "react-native";
import { Button } from "@rneui/themed";
import { supabase } from "../lib/supabase";
import { useTodoList } from "../context/TodoList";

export default () => {
  const { session } = useSession();
  const { clearTodoList } = useTodoList();
  const logout = () => {
    clearTodoList();
    supabase.auth.signOut();
  };

  return (
    <View>
      <Text>{session?.user?.email}</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};
