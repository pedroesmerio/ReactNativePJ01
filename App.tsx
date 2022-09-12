import { StatusBar } from "expo-status-bar"
import { GlobalProvider } from "./src/contexts/GlobalContext";

import { Home } from "./src/screens/Home";

export default function App() {
  return (
    <GlobalProvider>
      <StatusBar
        style="inverted"
        backgroundColor="transparent"
        translucent
      />
      <Home />
    </GlobalProvider>
  )
}
