import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

// type ErrorType = 'minLength' | 'maxLength';

type Props = {
  // 1 Uso de propiedades opcionales y obligatorias
  initialValue: string | number;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

// 2. Uso de type guards
const getInitialValue = (value: string | number): string => {
  if (typeof value === 'number') {
    return value.toString();
  }
  return value;
};

type MinLenght = {
  type: 'minLength';
  message: string;
};
type MaxLenght = {
  type: 'maxLength';
  message: string;
};
type Required = {
  type: 'required';
  message: string;
};
type ErrorType = MinLenght | MaxLenght | Required;
// 3. Implementar manejo de errores
// Adding Type-Safe Error Handling
const handleError = (value: string, error: ErrorType): string => {
  switch (error.type) {
    case 'minLength':
      return `The value ${value} is too short`;
    case 'maxLength':
      return `The value ${value} is too long`;
    case 'required':
      return 'The value is required';
  }
};
const InputField = ({initialValue, onChange, disabled}: Props) => {
  const [value, setValue] = useState<string>(getInitialValue(initialValue));
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 4. Uso de funciones como argumentos
  // Adding Type-Safe Error Handling
  const handleChange = (_value: string) => {
    if (_value.length < 5) {
      setErrorMessage(
        handleError(_value, {
          type: 'minLength',
          message: 'The value is too short',
        }),
      );
    } else if (_value.length > 30) {
      setErrorMessage(
        handleError(_value, {
          type: 'maxLength',
          message: 'The value is too long',
        }),
      );
    } else if (_value.length === 0) {
      setErrorMessage(
        handleError(_value, {
          type: 'required',
          message: 'The value is required',
        }),
      );
    }

    onChange?.(value);
    setValue(value);
  };

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={handleChange}
        editable={!disabled}
      />
      <Text>{errorMessage}</Text>
    </View>
  );
}; 