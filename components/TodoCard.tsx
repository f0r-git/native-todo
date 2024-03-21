import { Card, CheckBox, Text } from "@rneui/themed";
import { TODO } from "../types";
import { changeTodoStatus, deleteTodo } from "../lib/supabase";
import { useTodoList } from "../context/TodoList";
import { Button } from "react-native";

interface Props {
  todo: TODO;
}
export default ({ todo }: Props) => {
  const { updateTodo, removeTodo } = useTodoList();

  const updateTodoStatus = async () => {
    const { data, error } = await changeTodoStatus(!todo.completed, todo.id);
    if (!error) {
      updateTodo(todo.id, data[0]);
    }
  };
  const removeTodoFromDB = async () => {
    const { error } = await deleteTodo(todo.id);
    if (!error) {
      removeTodo(todo.id);
    }
  };
  return (
    <Card>
      <Card.Title>{todo.title}</Card.Title>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>{todo.description}</Text>
      <CheckBox checked={todo.completed} size={24} onPress={updateTodoStatus} />
      <Button title="Delete" onPress={removeTodoFromDB} />
    </Card>
  );
};
