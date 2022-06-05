interface Props {
  error: {
    response: {
      status: number;
    };
  };
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const authException = (props: Props) => {
  const { error, setErrorMessage } = props;
  const { response } = error;
  if (!response) {
    setErrorMessage("No Server Response");
  } else {
    const { status } = response;
    switch (status) {
      case 400:
        setErrorMessage("Missing Username of Password");
        break;
      case 401:
        setErrorMessage("Unauthorized");
        break;
      default:
        setErrorMessage("Login Failed");
        break;
    }
  }
};

export default authException;
