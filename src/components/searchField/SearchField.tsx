import { useTheme } from '@/hooks/useTheme';
import { makeStyles } from '@/theme/make-styles';
import { TextInput, TextInputProps, View } from 'react-native';

interface SearchFieldProps extends Pick<TextInputProps, 'value' | 'onChangeText'> {
  title: string;
}

export const SearchField = ({ title, value, onChangeText }: SearchFieldProps) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={title}
        placeholderTextColor={theme.colors.placeholder}
        testID="search-field"
      />
    </View>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  container: {
    flex: 1,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
  },
  searchInput: {
    color: colors.text,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  }
}));
