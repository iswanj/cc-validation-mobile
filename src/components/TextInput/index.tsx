import * as React from 'react';
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
  returnKeyType: any;
  ref?: any;
  onSubmitEditing?: () => void;
  onChange: (name: string, value: string) => void;
}

export default class TextInput extends React.Component<IInputProps> {
  public static defaultProps = {
    keyboardType: 'default',
    returnKeyType: 'done'
  };

  private input: any;

  constructor(props: IInputProps) {
    super(props);
    this.input = React.createRef();
  }

  public focus = () => {
    this.input.current.root.focus();
  }

  public render() {
    const {
      label,
      error,
      value,
      renderIcon,
      placeholder,
      returnKeyType,
      keyboardType,
      onSubmitEditing
    } = this.props;
    return (
      <Wrapper>
        <Label>{label}</Label>
        <InputGroup>
          <InputContainer error={error}>
            <Input
              ref={this.input}
              returnKeyType={returnKeyType}
              placeholder={placeholder}
              value={value || ''}
              onChangeText={this.handleOnChange}
              keyboardType={keyboardType}
              onSubmitEditing={onSubmitEditing}
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
