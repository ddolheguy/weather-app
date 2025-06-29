import { ThemeContext, ThemeProvider } from '@/providers/ThemeProvider';
import { theme } from '@/theme/theme';
import { renderHook } from '@testing-library/react-native';
import { useTheme } from '../useTheme';

// Mock react-native's useColorScheme
jest.mock('react-native', () => ({
  useColorScheme: jest.fn(),
}));

const mockUseColorScheme = require('react-native').useColorScheme;

describe('useTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return theme context when used within ThemeProvider', () => {
    mockUseColorScheme.mockReturnValue('light');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toEqual({
      colors: theme.colors.light,
    });
  });

  it('should return dark theme when device theme is dark', () => {
    mockUseColorScheme.mockReturnValue('dark');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toEqual({
      colors: theme.colors.dark,
    });
  });

  it('should return light theme when device theme is null', () => {
    mockUseColorScheme.mockReturnValue(null);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toEqual({
      colors: theme.colors.light,
    });
  });

  it('should return light theme when device theme is undefined', () => {
    mockUseColorScheme.mockReturnValue(undefined);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toEqual({
      colors: theme.colors.light,
    });
  });

  it('should throw error when used outside of ThemeProvider', () => {
    // Suppress console.error for this test since we expect an error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });

  it('should throw error when ThemeContext is undefined', () => {
    // Create a wrapper that provides undefined context
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={undefined}>{children}</ThemeContext.Provider>
    );

    // Suppress console.error for this test since we expect an error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme(), { wrapper });
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });
}); 