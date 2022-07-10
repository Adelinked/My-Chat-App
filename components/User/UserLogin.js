import { useEffect, useState } from "react";
import styles from "./user.module.css";
import { getProviders, signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, CircularProgress } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { toast } from "react-toastify";

export default function UserLogin({ csrfToken, showLogin, setShowLogin }) {
  const [providers, setProviders] = useState({});
  const getPro = async () => {
    const pro = await getProviders();
    setProviders(pro);
  };
  useEffect(() => {
    getPro();
  }, []);
  const { data: session } = useSession();

  useEffect(() => {
    if (showLogin) {
      document.getElementById("userLogin").style.right = "0";
      document.getElementById("userLogin").style.height = "100vh";
    } else {
      document.getElementById("userLogin").style.right = "100%";
      document.getElementById("userLogin").style.height = "0";
    }
  }, [showLogin]);
  const { query } = useRouter();
  const [status, setStatus] = useState();

  const errorMsg = (error) => {
    if (error) {
      switch (error) {
        case "Signin":
          return "Try signing in with a different account.";
        case "OAuthSignin":
          return "Try signing in with a different account.";
        case "OAuthCallback":
          return "Try signing in with a different account.";
        case "OAuthCreateAccount":
          return "Try signing in with a different account.";
        case "EmailCreateAccount":
          return "Try signing in with a different account.";
        case "Callback":
          return "Try signing in with a different account.";
        case "OAuthAccountNotLinked":
          return "The same email address is already used with a diffrent provider";
        case "EmailSignin":
          return "The e-mail could not be sent.";
        case "CredentialsSignin":
          return "Sign in failed. Check the details you provided are correct.";
        case "SessionRequired":
          return "Please sign in to access this page.";
        default:
          return "Unable to sign in (" + error + ")";
      }
    }
  };
  const handleErrorMsg = (error) => {
    if (error == "Success") {
      toast.success("Success! Ckeck your email box");
      return;
    }
    toast.error(errorMsg(error));
  };

  handleErrorMsg(query.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const providerId = e.nativeEvent.submitter.id;
    switch (providerId) {
      case "google":
      case "facebook":
        signIn(providerId);
        break;
    }
    setTimeout(() => {}, 500);
    setStatus("Loading");
  };

  const GoogleButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    "&:hover": {
      backgroundColor: deepOrange[700],
    },
  }));

  return (
    <div className={styles.userLogin} id="userLogin">
      <span className={styles.userLoginTitle}></span>
      <span
        className={styles.closeLogin}
        onClick={() => {
          setShowLogin(false);
        }}
      >
        <i className="fa fa-close"></i>
      </span>
      <div className={styles.signinContainer}>
        {session ? (
          <>
            {" "}
            <span className={styles.logoutQuestion}>
              Are you sure you want to logout :( ?
            </span>
            <span>
              {" "}
              <button
                onClick={() => {
                  signOut();
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setShowLogin(false);
                }}
              >
                Cancel
              </button>
            </span>
          </>
        ) : (
          <>
            {status !== "Loading" ? (
              <form onSubmit={handleSubmit}>
                <p className={styles.loginTitle}>Choose a login Method</p>
                <input
                  type="hidden"
                  name="csrfToken"
                  defaultValue={csrfToken}
                />

                {providers &&
                  Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                      {provider.name === "Google" ? (
                        <GoogleButton
                          id={provider.id}
                          size="large"
                          sx={{
                            width: "260px",
                            margin: "10px",
                            fontWeight: "700",
                            fontSize: "1.5rem",
                          }}
                          type="submit"
                          variant="contained"
                        >
                          Sign in with {provider.name} &nbsp;&nbsp;
                          <i className="fa fa-google"></i>
                        </GoogleButton>
                      ) : (
                        <Button
                          id={provider.id}
                          sx={{
                            width: "260px",
                            margin: "10px",
                            fontWeight: "700",
                            fontSize: "1.5rem",
                          }}
                          size="large"
                          variant="contained"
                          type="submit"
                        >
                          <span>
                            Sign in with {provider.name}{" "}
                            <i className="fa fa-facebook"></i>
                          </span>
                        </Button>
                      )}
                    </div>
                  ))}
              </form>
            ) : (
              <CircularProgress />
            )}
          </>
        )}
      </div>
      <p style={{ marginBottom: "10px" }}>Secured using</p>
      <a
        href="https://next-auth.js.org/"
        target="_blank"
        title="nextAuth web page"
        rel="noreferrer"
      >
        <Image alt="nextAuthLogo" width={180} height={55} src="/auth.png" />
      </a>
    </div>
  );
}
