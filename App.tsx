import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";
import { NavigationContainer } from "@react-navigation/native";
import { SessionProvider } from "./context/AuthSession";
import Navigation from "./components/Navigation";
import { TodoProvider } from "./context/TodoList";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SessionProvider>
        <TodoProvider>
          <NavigationContainer>
            <StatusBar animated={true} backgroundColor="#2089dc" />
            <Navigation />
          </NavigationContainer>
        </TodoProvider>
      </SessionProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
