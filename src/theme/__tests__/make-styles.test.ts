import { makeStyles } from '../make-styles';
import { Theme } from '../theme';

describe('makeStyles', () => {
  // Mock theme for testing
  const mockTheme: Theme = {
    colors: {
      text: '#11181C',
      error: '#FF0000',
      highlight: '#000000',
      textInverse: '#fff',
      border: '#11181C',
      background: '#fff',
      inverseBackground: '#11181C',
      tint: '#0a7ea4',
      placeholder: '#687076',
      icon: '#687076',
    },
  };

  it('should return a function that accepts a theme', () => {
    const styles = makeStyles((theme: Theme) => ({
      container: {
        backgroundColor: theme.colors.background,
      },
    }));

    expect(typeof styles).toBe('function');
    expect(styles).toHaveLength(1);
  });

  it('should return styles when called with a theme', () => {
    const styles = makeStyles((theme: Theme) => ({
      container: {
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      },
      text: {
        color: theme.colors.text,
        fontSize: 16,
      },
    }));

    const result = styles(mockTheme);

    expect(result).toEqual({
      container: {
        backgroundColor: '#fff',
        color: '#11181C',
      },
      text: {
        color: '#11181C',
        fontSize: 16,
      },
    });
  });
}); 