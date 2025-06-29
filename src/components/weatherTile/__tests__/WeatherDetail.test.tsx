import { ThemeProvider } from '@/providers/ThemeProvider';
import { render, screen } from '@testing-library/react-native';
import { WeatherDetail } from '../WeatherDetail';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('WeatherDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render label and value correctly', () => {
    const label = 'Temperature';
    const value = '25°C';

    renderWithTheme(
      <WeatherDetail label={label} value={value} />
    );

    expect(screen.getByText(label)).toBeTruthy();
    expect(screen.getByText(value)).toBeTruthy();
  });

  it('should apply capitalize style when capitalize prop is true', () => {
    const label = 'Condition';
    const value = 'partly cloudy';

    renderWithTheme(
      <WeatherDetail label={label} value={value} capitalize={true} />
    );

    const valueElement = screen.getByText(value);
    expect(valueElement).toBeTruthy();
    
    // Check if the capitalize style is applied
    const valueStyle = valueElement.props.style;
    expect(valueStyle).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          textTransform: 'capitalize',
        })
      ])
    );
  });

  it('should not apply capitalize style when capitalize prop is false', () => {
    const label = 'Condition';
    const value = 'partly cloudy';

    renderWithTheme(
      <WeatherDetail label={label} value={value} capitalize={false} />
    );

    const valueElement = screen.getByText(value);
    expect(valueElement).toBeTruthy();
    
    // Check that capitalize style is not applied
    const valueStyle = valueElement.props.style;
    expect(valueStyle).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          textTransform: 'capitalize',
        })
      ])
    );
  });

  it('should not apply capitalize style when capitalize prop is undefined', () => {
    const label = 'Condition';
    const value = 'partly cloudy';

    renderWithTheme(
      <WeatherDetail label={label} value={value} />
    );

    const valueElement = screen.getByText(value);
    expect(valueElement).toBeTruthy();
    
    // Check that capitalize style is not applied
    const valueStyle = valueElement.props.style;
    expect(valueStyle).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          textTransform: 'capitalize',
        })
      ])
    );
  });

  it('should handle empty string values', () => {
    const label = 'Wind Speed';
    const value = '';

    renderWithTheme(
      <WeatherDetail label={label} value={value} />
    );

    expect(screen.getByText(label)).toBeTruthy();
    expect(screen.getByText(value)).toBeTruthy();
  });

  it('should handle special characters in values', () => {
    const label = 'Pressure';
    const value = '1013.25 hPa';

    renderWithTheme(
      <WeatherDetail label={label} value={value} />
    );

    expect(screen.getByText(label)).toBeTruthy();
    expect(screen.getByText(value)).toBeTruthy();
  });

  it('should handle long text values', () => {
    const label = 'Description';
    const value = 'This is a very long weather description that might wrap to multiple lines';

    renderWithTheme(
      <WeatherDetail label={label} value={value} />
    );

    expect(screen.getByText(label)).toBeTruthy();
    expect(screen.getByText(value)).toBeTruthy();
  });
}); 