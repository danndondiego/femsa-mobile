import React from "react";
import { Text, View, FlatList } from "react-native";

// 2 Uso de utility types "ReadOnly"
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

// 1. Uso de generics
type Props<T> = {
  items: Array<ReadOnly<T>>;
  filter?: (item: T) => boolean;
};

// 3. Filtrar elementos de la lista
const filterStrings = (items: Array<unknown>): Array<string> => {
  return items.filter((item): item is string => typeof item === "string");
};

const List = <T,>({ items }: Props<T>) => {
  // Adding Type-Safe Error Handling
  return items.length > 0 ? (
    <View>
      <FlatList
        data={filterStrings(items)}
        renderItem={({ item }) => <Text>{String(item)}</Text>}
      />
    </View>
  ) : null;
};