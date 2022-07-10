import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import "font-awesome/css/font-awesome.min.css";
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {" "}
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
}

export default MyApp;
