import { StatusBar } from "expo-status-bar"

import { Home } from "./src/screens/Home";

export default function App() {
  return (
    <>
      <StatusBar
        style="inverted"
        backgroundColor="transparent"
        translucent
      />
      <Home />
    </>
  )
}
