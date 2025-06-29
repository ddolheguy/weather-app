import { ThemeProvider } from '@/providers/ThemeProvider';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from '../Button';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children correctly', () => {
    const buttonText = 'Press Me';
    
    renderWithTheme(
      <Button>{buttonText}</Button>
    );

    expect(screen.getByText(buttonText)).toBeTruthy();
  });

  it('should handle onPress events', () => {
    const onPressMock = jest.fn();
    const buttonText = 'Click Me';

    renderWithTheme(
      <Button onPress={onPressMock}>{buttonText}</Button>
    );

    const button = screen.getByText(buttonText);
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
}); 