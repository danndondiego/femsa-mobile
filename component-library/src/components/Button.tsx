import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Variants = "primary" | "secondary" | "tertiary";

type OtherProps = {
  testID: string;
  onClick: () => void;
  disabled: boolean;
  variant: Variants;
};

type OptionalProps = Pick<OtherProps, "onClick" | "disabled" | "variant">;

/**
 * 1. Uso de generics
 * define las propiedades del componente,
 * utilizando un genérico T para el valor del botón.
 */
type ButtonProps<T> = {
  value: T;
  // 2 y 3. Uso de propiedades opcionales y de utility types "Partial"
} & Partial<OptionalProps>;

// Adding Type-Safe Error Handling
const isValidVariant = (variant: Variants | undefined): variant is Variants => {
  if (variant) {
    return ["primary", "secondary", "tertiary"].includes(variant);
  }
  return false;
};

const Button = <T,>({ value, onClick, disabled, variant }: ButtonProps<T>) => {
  if (!isValidVariant(variant)) {
    throw new Error("Invalid variant");
  }

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onClick}
      disabled={disabled}
    >
      <Text style={styles.text}>{String(value)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "gray",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default Button;