import * as React from 'react';
import { ButtonContainer, ButtonText } from './styles';

interface IButtonProps {
  children: any;
  onPress: () => void;
}

export default (props: IButtonProps) => {
  return (
    <ButtonContainer onPress={() => props.onPress()}>
      <ButtonText>{props.children}</ButtonText>
    </ButtonContainer>
  );
};
