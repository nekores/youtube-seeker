import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
  } from "@chakra-ui/react";
  
  export const ModalComp = ({ children, onOpen, onClose, isOpen }) => {
  
    return (
      <>
        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  