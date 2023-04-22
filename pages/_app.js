import "../styles/globals.css";
import { wrapper } from "../store";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Metadata } from "next";
import { useRouter } from "next/router";
import {
  loadToken,
  loadUser,
  logout,
  onlineStatus,
} from "../actions/userAction";
import PageLayout from "../components/PageLayout";

function MyApp({ Component, pageProps, ...rest }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { store, props } = wrapper.useWrappedStore(rest);
  const { user, isAuthenticated, loading, error, message } = useSelector(
    (state) => state.user
  );
  const [status, setStatus] = useState(true);

  useEffect(() => {
    function changeStatus() {
      setStatus(navigator.onLine);
      dispatch(onlineStatus(navigator.onLine));
    }
    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);
    return () => {
      window.removeEventListener("online", changeStatus);
      window.removeEventListener("offline", changeStatus);
    };
  }, []);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadToken());
  }, [dispatch]);
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);
  useEffect(() => {
    console.log(user, "raveena");
  }, [user]);

  return (
    <>
      <Head>
        <title>2023 karntaka board results namewise</title>
        <meta
          name="2023 pu board results namewise"
          content="karnataka board results namewise"
        />
      </Head>
      <Provider store={store}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp, { debug: true });
