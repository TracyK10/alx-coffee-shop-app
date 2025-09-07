import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  textClassName?: string;
  loading?: boolean;
  disabled?: boolean;
};

const Button = ({
  title,
  onPress,
  variant = 'primary',
  className = '',
  textClassName = '',
  loading = false,
  disabled = false,
}: ButtonProps) => {
  const buttonClasses = cn(
    'w-full h-14 rounded-2xl justify-center items-center',
    {
      'bg-primary': variant === 'primary',
      'bg-secondary': variant === 'secondary',
      'bg-transparent border border-primary': variant === 'outline',
      'opacity-60': disabled || loading,
    },
    className
  );

  const textClasses = cn(
    'text-base font-semiBold',
    {
      'text-white': variant === 'primary',
      'text-primary': variant === 'secondary' || variant === 'outline',
    },
    textClassName
  );

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? 'white' : '#C67C4E'} 
          size="small"
        />
      ) : (
        <Text className={textClasses}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
