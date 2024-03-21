import Home from "./Home";
import SignIn from "./SignIn";
import { useSession } from "../context/AuthSession";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Account from "./Account";
import { Text } from "react-native";

const Drawer = createDrawerNavigator();

export default () => {
  const { session, loading } = useSession();
  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <Drawer.Navigator>
      {session && session?.user ? (
        <>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Account" component={Account} />
        </>
      ) : (
        <>
          <Drawer.Screen name="SignIn" component={SignIn} />
        </>
      )}
    </Drawer.Navigator>
  );
};
