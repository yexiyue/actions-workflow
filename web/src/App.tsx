import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { App as AppProvider, ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { LanguageContext, useLanguageProvider } from "./hooks/useI18nProvider";
import { router } from "./router";
import { StyleProvider } from "@ant-design/cssinjs";

const httpLink = createHttpLink({
  uri: "/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const data = useLanguageProvider();
  return (
    <ApolloProvider client={client}>
      <I18nProvider i18n={i18n}>
        <LanguageContext.Provider value={data}>
          <StyleProvider hashPriority="low">
            <ConfigProvider locale={data.antdLocal}>
              <AppProvider>
                <RouterProvider router={router}></RouterProvider>
              </AppProvider>
            </ConfigProvider>
          </StyleProvider>
        </LanguageContext.Provider>
      </I18nProvider>
    </ApolloProvider>
  );
}

export default App;
