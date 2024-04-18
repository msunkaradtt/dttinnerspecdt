import React from "react"
import { useSnapshot } from "valtio";

import state from "../store";

const Home = () => {
  const snap = useSnapshot(state);

  return (<></>)
}

export default Home