import { useEffect, useState } from "react";
import Dialog from "src/components/Dialog/Dialog";
import Text from "src/components/text/Text";
import { useAppDispatch, useAppSelector } from "src/logic/redux/hooks";
import {
  LoadingStatusTypes,
  postLoginDispatch,
  selectUserLoadingStatus,
} from "src/logic/redux/reducers/userSlice/userSlice";
import { Button, Center, Content, Input, Error } from "./style";

type LoginDialogProps = {
  close: () => void;
};

const LoginDialog = ({ close }: LoginDialogProps) => {
  const dispatch = useAppDispatch();
  const [zid, setZid] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const loadingStatus = useAppSelector(selectUserLoadingStatus);

  useEffect(() => {
    setError(false);
  }, [zid]);

  useEffect(() => {
    if (loadingStatus === LoadingStatusTypes.POST_LOGIN_COMPLETED) {
      close();
    }
  }, [loadingStatus]);

  const login = () => {
    if (zid === "") {
      setError(true);
      return;
    }
    dispatch(postLoginDispatch(zid));
  };

  return (
    <Dialog close={close} modalSize="25">
      <Content>
        <Text noMargin bold fontSize="1.8rem" style={{ marginBottom: "2rem" }}>
          Login.
        </Text>
        {error && <Error>Please enter a valid zID</Error>}
        <Text noMargin bold style={{ marginBottom: "1rem" }}>
          zID
        </Text>
        <Input
          placeholder="Enter your zID"
          onChange={(e) => setZid(e.target.value)}
        />
        <Text noMargin bold style={{ marginBottom: "1rem" }}>
          zPass
        </Text>
        <Input placeholder="Enter your zPass" type="password" />
        <Center>
          <Button onClick={login}>
              Log In
          </Button>
        </Center>
      </Content>
    </Dialog>
  );
};

export default LoginDialog;
