import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const Wrapper = styled.View`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-top: ${StatusBar.currentHeight};
`;

export const Row = styled.View`
  display: flex;
  flex-grow: 1;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

export const Col = styled.View<{ span: number }>`
  flex: ${p => p.span};
  margin: 0 auto;
  position: relative;
`;

export const Box = styled.View`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-bottom-width: 1;
  border-bottom-color: #ccc;
`;

export const Title = styled.Text`
  font-size: 22;
  color: #333;
  font-weight: 400;
`;

export const InputGroup = styled.View`
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  padding-top: 16px;
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;
`;

export const Img = styled.Image`
  width: 24;
  height: 24;
`;

export const LoadingModal = styled.View`
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LodingText = styled.Text`
  font-size: 15;
  color: #333;
  padding-top: 5px;
`;
