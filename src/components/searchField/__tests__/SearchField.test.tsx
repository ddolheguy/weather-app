import { Providers } from '@/providers/Providers';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { SearchField } from '../SearchField';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <Providers>
      {component}
    </Providers>
  );
};

describe('SearchField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with title as placeholder', () => {
    const title = 'Search cities...';
    const value = '';
    const onChangeText = jest.fn();

    renderWithTheme(
      <SearchField title={title} value={value} onChangeText={onChangeText} />
    );

    const input = screen.getByPlaceholderText(title);
    expect(input).toBeTruthy();
  });

  it('should display the current value', () => {
    const title = 'Search cities...';
    const value = 'London';
    const onChangeText = jest.fn();

    renderWithTheme(
      <SearchField title={title} value={value} onChangeText={onChangeText} />
    );

    const input = screen.getByDisplayValue(value);
    expect(input).toBeTruthy();
  });

  it('should call onChangeText when text is entered', () => {
    const title = 'Search cities...';
    const value = '';
    const onChangeText = jest.fn();
    const newValue = 'Paris';

    renderWithTheme(
      <SearchField title={title} value={value} onChangeText={onChangeText} />
    );

    const input = screen.getByPlaceholderText(title);
    fireEvent.changeText(input, newValue);

    expect(onChangeText).toHaveBeenCalledWith(newValue);
  });

  it('should handle empty string input', () => {
    const title = 'Search cities...';
    const value = 'London';
    const onChangeText = jest.fn();

    renderWithTheme(
      <SearchField title={title} value={value} onChangeText={onChangeText} />
    );

    const input = screen.getByDisplayValue(value);
    fireEvent.changeText(input, '');

    expect(onChangeText).toHaveBeenCalledWith('');
  });
}); 