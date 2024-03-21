import { FlatList, StyleSheet, Text, View } from "react-native";
import { Input, Button, Dialog } from "@rneui/base";
import { insertTodo } from "../lib/supabase";
import { useSession } from "../context/AuthSession";
import TodoCard from "./TodoCard";
import { useTodoList } from "../context/TodoList";
import { useEffect, useState } from "react";
import { TODO } from "../types";
import { ButtonGroup } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";

export default () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const { todoList, addTodo, loading, fetchTodoList } = useTodoList();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleDialog = () => setVisible((state) => !state);
  const isFocused = useIsFocused();

  const submitTodo = async () => {
    setIsSubmitting(true);
    setIsError(false);
    const { data, error } = await insertTodo({
      title,
      description,
      user_id: session.user.id,
    });
    if (!error) {
      addTodo(data[0] as TODO);
      setTitle("");
      setDescription("");
      toggleDialog();
    } else setIsError(true);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTodoList();
    }
  }, [isFocused]);

  return (
    <View>
      <Button onPress={toggleDialog}>Add todo</Button>
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{ backgroundColor: "white" }}
      >
        <Dialog.Title title="New Todo" />
        <View>
          <Input
            placeholder="Title"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <Input
            placeholder="Description"
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
          {isError && (
            <Text style={styles.errorText}>
              Something went wrong, Please try again.
            </Text>
          )}
        </View>
        <Dialog.Actions>
          <Dialog.Button
            title="submit"
            onPress={submitTodo}
            disabled={isSubmitting}
          />
          <Dialog.Button title="cancel" onPress={toggleDialog} />
        </Dialog.Actions>
      </Dialog>
      <ButtonGroup
        buttons={["All", "Completed", "Pending"]}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.listContainer}
          data={
            selectedIndex === 1
              ? todoList.filter((todo) => todo.completed)
              : selectedIndex === 2
              ? todoList.filter((todo) => !todo.completed)
              : todoList
          }
          renderItem={({ item }) => <TodoCard todo={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 120,
  },
  errorText: {
    color: "red",
  },
  skeleton: {
    marginTop: 20,
    marginBottom: 20,
  },
});
