import { ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { CloseIcon } from "../icon/iconIndex";
import Text from "../text/Text";
import { CloseLockup, Dim, ModalContent } from "./style";

type DialogProps = {
  close: () => void;
  title?: string;
  children: ReactNode;
  modalSize?: string;
};

const Dialog = ({ close, title, children, modalSize }: DialogProps) => {
  return (
    <Dim>
      <ModalContent style={{ width: modalSize ? `${modalSize}%` : "85%" }}>
        <CloseLockup>
          <Icon src={CloseIcon} size={2} onClick={close} />
        </CloseLockup>
        {title && (
          <Text bold fontSize="1.375rem">
            {title}
          </Text>
        )}
        {children}
      </ModalContent>
    </Dim>
  );
};

export default Dialog;
