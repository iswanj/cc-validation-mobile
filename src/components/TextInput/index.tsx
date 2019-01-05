import * as React from 'react';
import { Image } from 'react-native';

import {
  Wrapper,
  Label,
  InputGroup,
  InputContainer,
  Input,
  ErrorMsg,
  ImgContainer
} from './styles';

interface IInputProps {
  label: string;
  error?: string;
  value: any;
  renderIcon?: any;
  name: string;
  placeholder?: string;
  keyboardType: any;
  onChange: (name: string, value: string) => void;
}

export default class TextInput extends React.Component<IInputProps> {
  public static defaultProps = {
    keyboardType: 'default'
  };

  public render() {
    const {
      label,
      error,
      value,
      renderIcon,
      placeholder,
      keyboardType
    } = this.props;
    return (
      <Wrapper>
        <Label>{label}</Label>
        <InputGroup>
          <InputContainer error={error}>
            <Input
              placeholder={placeholder}
              value={value || ''}
              onChangeText={this.handleOnChange}
              keyboardType={keyboardType}
            />
            <ImgContainer>{renderIcon && renderIcon(value)}</ImgContainer>
          </InputContainer>
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </InputGroup>
      </Wrapper>
    );
  }

  private handleOnChange = (text: string) => {
    const { onChange, name } = this.props;
    onChange(name, text);
  }
}
