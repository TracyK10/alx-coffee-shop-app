import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

type CategoryItemProps = {
  name: string;
  isActive?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  name,
  isActive = false,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && styles.activeContainer,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.text,
        isActive && styles.activeText,
        textStyle,
      ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeContainer: {
    backgroundColor: '#C67C4E',
    borderColor: 'transparent',
  },
  text: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 14,
    color: '#2F2D2C',
    opacity: 0.7,
    lineHeight: 20,
  },
  activeText: {
    color: '#FFFFFF',
    opacity: 1,
  },
});

export default CategoryItem;
