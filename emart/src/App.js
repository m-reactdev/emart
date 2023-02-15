import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/Store";
import Navigator from "./routes/Routes";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigator />
      </PersistGate>

      {/* <GoogleOAuthProvider clientId="126844737668-27d8g1qop8164vmev2mlulejmoph6n4q.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider> */}
    </Provider>
  );
};

export default App;
