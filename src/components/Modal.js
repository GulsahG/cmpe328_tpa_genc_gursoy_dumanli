import React from 'react';
import ReactDOM from 'react-dom';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";

const CustomModal = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isOpen } = useDisclosure({defaultIsOpen: true});
  return (
    <>
    <Modal 
      isOpen={isOpen} 
      size="md"
      onClose={props.onDismiss} 
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="1.25rem">
          {props.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody fontSize="1.1rem">
          {props.body}
        </ModalBody>
        <ModalFooter>
          {props.buttonOne}
          {props.buttonTwo}
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}

const MyModal = props => {
  return ReactDOM.createPortal(
    <CustomModal {...props}/>, document.querySelector('#modal')
  );
};

export default MyModal;