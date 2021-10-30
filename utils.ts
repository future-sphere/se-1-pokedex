import { NativeScrollEvent } from 'react-native';

export const zeroFilled = (id: string | number): string => {
  return ('0000' + id).slice(-3);
};

export const isCloseToBottom = (nativeEvent: NativeScrollEvent) => {
  const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
