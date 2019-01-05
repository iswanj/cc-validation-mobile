import * as React from 'react';
import { connect } from 'react-redux';

import { isEmpty, isUndefined } from 'lodash';

import {
  Wrapper,
  Row,
  Col,
  Box,
  Header,
  Title,
  InputGroup,
  ButtonContainer,
  LoadingModal,
  LodingText
} from './styles';

import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Keyboard
} from 'react-native';

import { setState, onFieldChange } from '../../actions';

import { validate } from '../../util/validator';

interface IHomeProps {
  frmPayment: any;
  frmErrors: any;
  setState: (state: any) => void;
  onFieldChange: (state: object) => void;
  isShowLoading: boolean;
}

const validationRule = {
  price: {
    name: 'price',
    required: true,
    type: 'decimal'
  },
  name: {
    name: 'name',
    required: true,
    type: 'string'
  },
  cardNumber: {
    name: 'cardNumber',
    required: true,
    length: [16, 16],
    type: 'creditcard'
  },
  expireDate: {
    name: 'expireDate',
    required: true,
    type: 'string',
    pattern: /^(1[0-2]|0[1-9]|\d)\/([2-9]\d[1-9]\d|[1-9]\d)$/,
    errorMessage: 'Invalid Date'
  },
  ccv: {
    name: 'ccv',
    required: true,
    type: 'number',
    length: [3, 3]
  }
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    paddingTop: 16,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    flexDirection: 'column'
  }
});

export default class Home extends React.Component<IHomeProps> {
  public static defaultProps = {
    frmPayment: {},
    frmErrors: {}
  };

  public render() {
    const { frmPayment, frmErrors, isShowLoading } = this.props;
    return (
      <Wrapper>
        <Row>
          <Col span={1}>
            <Box>
              <Header>
                <Title>Payment Details</Title>
              </Header>
              <Image
                style={{ width: 24, height: 24 }}
                source={{ uri: '../../img/visa.png' }}
              />
              <KeyboardAvoidingView
                behavior="padding"
                enabled={true}
                style={{ flex: 1 }}
              >
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={styles.scrollViewStyle}
                >
                  <View>
                    <InputGroup>
                      <TextInput
                        name="price"
                        onChange={this.handleInputChange}
                        label="Price"
                        error={frmErrors.price}
                        value={frmPayment.price}
                        keyboardType="decimal-pad"
                      />
                    </InputGroup>
                    <InputGroup>
                      <TextInput
                        name="name"
                        onChange={this.handleInputChange}
                        label="Name on Card"
                        error={frmErrors.name}
                        value={frmPayment.name}
                      />
                    </InputGroup>
                    <InputGroup>
                      <TextInput
                        name="cardNumber"
                        onChange={this.handleInputChange}
                        renderIcon={this.renderIcon}
                        label="Card Number"
                        error={frmErrors.cardNumber}
                        value={frmPayment.cardNumber}
                        keyboardType="numeric"
                      />
                    </InputGroup>
                    <InputGroup>
                      <TextInput
                        name="expireDate"
                        onChange={this.handleInputChange}
                        label="MM/YY"
                        error={frmErrors.expireDate}
                        value={frmPayment.expireDate}
                      />
                    </InputGroup>
                    <InputGroup>
                      <TextInput
                        name="ccv"
                        onChange={this.handleInputChange}
                        label="CCV"
                        error={frmErrors.ccv}
                        value={frmPayment.ccv}
                        keyboardType="numeric"
                      />
                    </InputGroup>
                    <ButtonContainer>
                      <Button onPress={this.handleCheckout}>Checkout</Button>
                    </ButtonContainer>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </Box>
          </Col>
        </Row>
        {isShowLoading && (
          <LoadingModal>
            <ActivityIndicator size="large" color="#0277BD" />
            <LodingText>Payment Processing</LodingText>
          </LoadingModal>
        )}
      </Wrapper>
    );
  }

  private handleInputChange = (name: string, value: string) => {
    const { frmErrors } = this.props;
    const validateStatus: any = validate(validationRule, {
      [name]: value
    });

    const getErrorState = () => {
      if (validateStatus[name]) {
        return { ...frmErrors, [name]: validateStatus[name] };
      }
      const { [name]: _, ...restErrors } = frmErrors;
      return restErrors;
    };

    this.props.onFieldChange({
      name,
      value,
      form: 'payment'
    });

    this.props.setState({
      frmErrors: getErrorState()
    });
  }

  private handleCheckout = () => {
    const { frmPayment, setState } = this.props;
    const validateStatus = validate(validationRule, frmPayment);
    Keyboard.dismiss();
    if (isEmpty(validateStatus)) {
      setState({
        isShowLoading: true
      });
    } else {
      setState({
        frmErrors: validateStatus
      });
    }
  }

  private renderIcon = (value: string) => {
    const mastercard = new RegExp(
      /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/
    );
    const americanExpress = new RegExp(/^3[47][0-9]{13}$/);
    const visa = new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/);
    const discover = new RegExp( // tslint:disable-next-line
      /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/
    );
    let imageName;
    if (visa.test(value)) {
      imageName = 'https://i.ibb.co/gFgB2Sx/visa.png';
    } else if (mastercard.test(value)) {
      imageName = 'https://i.ibb.co/pykcXZ1/mastercard.png';
    } else if (americanExpress.test(value)) {
      imageName = 'https://i.ibb.co/Y0tsQ12/american-express.png';
    } else if (discover.test(value)) {
      imageName = 'https://i.ibb.co/c8VPTS9/discover.png';
    }

    if (isUndefined(imageName)) return <View />;

    return (
      <Image style={{ width: 24, height: 24 }} source={{ uri: imageName }} />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    frmErrors: state.app.frmErrors,
    frmPayment: state.form.payment,
    isShowLoading: state.app.isShowLoading
  };
};
export const HomeContainer = connect(
  mapStateToProps,
  { setState, onFieldChange }
)(Home);
