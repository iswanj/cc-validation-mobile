import styled from 'styled-components/native';

interface IContainerProps {
  error?: string;
}

export const Wrapper = styled.View`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.Text`
  display: flex;
  flex-grow: 3;
  margin-bottom: 5px;
  font-size: 14px;
  color: #444;
  padding-top: 5px;
`;

export const InputGroup = styled.View`
  display: flex;
  flex-grow: 1;
  flex-basis: auto;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin: 1px 0;
`;

export const InputContainer = styled.View<IContainerProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-radius: 3.01px;
  border-color: ${p => (p.error && p.error !== '' ? '#ef5350' : '#ccc')};
  font-size: 20;
  margin: 0;
  width: 100%;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 12px 8px;
`;

export const ErrorMsg = styled.Text`
  color: #ef5350;
  font-size: 18;
  margin: 5px 0 0;
  font-size: 13px;
`;

export const ImgContainer = styled.View`
  padding-right: 4px;
`;
