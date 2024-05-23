import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { App as AppProvider, ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { LanguageContext, useLanguageProvider } from "./hooks/useI18nProvider";
import { router } from "./router";
import { StyleProvider } from "@ant-design/cssinjs";
import axios from "axios";

const httpLink = createHttpLink({
  uri: "/api/graphql",
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ extensions, message }) => {
      if (extensions.code === 403 || extensions.code === 401) {
        // token 过期自动刷新
        if (message === "token expired") {
          axios({
            url: "/api/refresh",
            method: "post",
            data: {
              id: parseInt(localStorage.getItem("id")!),
              refresh_token: localStorage.getItem("refresh_token"),
            },
          })
            .then(({ data }) => {
              localStorage.setItem("token", data.token);
              localStorage.setItem("refresh_token", data.refresh_token);
              localStorage.setItem("access_token", data.access_token);
            })
            .catch(() => {
              window.location.href = "/login";
            });
        } else {
          window.location.href = "/login";
        }
      }
    });
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
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
  },
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
