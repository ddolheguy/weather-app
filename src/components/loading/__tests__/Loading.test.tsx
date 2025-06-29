import { Providers } from '@/providers/Providers';
import { render, screen } from '@testing-library/react-native';
import { Loading } from '../Loading';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <Providers>
      {component}
    </Providers>
  );
};

describe('Loading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render ActivityIndicator', () => {
    renderWithTheme(<Loading />);

    const activityIndicator = screen.getByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();
  });
}); 