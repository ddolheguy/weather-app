import { Storage } from '@/services/storage/storage';
import { act, renderHook } from '@testing-library/react-native';
import { useStoreState } from '../useStoreState';

// Mock the Storage service
jest.mock('@/services/storage/storage', () => ({
  Storage: {
    getValue: jest.fn(),
    saveValue: jest.fn(),
    removeValue: jest.fn(),
  },
}));

const mockStorage = Storage as jest.Mocked<typeof Storage>;

describe('useStoreState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with stored value when available', () => {
    const mockValue = { name: 'Test City', temp: 25 };
    mockStorage.getValue.mockReturnValue(mockValue);

    const { result } = renderHook(() => useStoreState('city'));

    expect(result.current[0]).toBe(mockValue);
    expect(mockStorage.getValue).toHaveBeenCalledWith('city');
  });

  it('should initialize with fallback value when no stored value exists', () => {
    mockStorage.getValue.mockReturnValue(undefined);
    const fallbackValue = { name: 'Default City', temp: 20 };

    const { result } = renderHook(() => useStoreState('city', fallbackValue));

    expect(result.current[0]).toBe(fallbackValue);
    expect(mockStorage.getValue).toHaveBeenCalledWith('city');
  });

  it('should initialize with undefined when no stored value and no fallback', () => {
    mockStorage.getValue.mockReturnValue(undefined);

    const { result } = renderHook(() => useStoreState('city'));

    expect(result.current[0]).toBeUndefined();
    expect(mockStorage.getValue).toHaveBeenCalledWith('city');
  });

  it('should save value to storage when setting a new value', () => {
    mockStorage.getValue.mockReturnValue(undefined);
    const newValue = { name: 'New City', temp: 30 };

    const { result } = renderHook(() => useStoreState('city'));

    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toBe(newValue);
    expect(mockStorage.saveValue).toHaveBeenCalledWith('city', newValue);
  });

  it('should update state and save to storage when setting a value', () => {
    const initialValue = { name: 'Initial City', temp: 25 };
    const updatedValue = { name: 'Updated City', temp: 35 };
    mockStorage.getValue.mockReturnValue(initialValue);

    const { result } = renderHook(() => useStoreState('city'));

    act(() => {
      result.current[1](updatedValue);
    });

    expect(result.current[0]).toBe(updatedValue);
    expect(mockStorage.saveValue).toHaveBeenCalledWith('city', updatedValue);
  });

  it('should remove value from storage when setting falsy value', () => {
    const initialValue = { name: 'Test City', temp: 25 };
    mockStorage.getValue.mockReturnValue(initialValue);

    const { result } = renderHook(() => useStoreState('city'));

    act(() => {
      result.current[1](null as any);
    });

    expect(result.current[0]).toBeNull();
    expect(mockStorage.removeValue).toHaveBeenCalledWith('city');
    expect(mockStorage.saveValue).not.toHaveBeenCalled();
  });

  it('should remove value from storage when setting undefined', () => {
    const initialValue = { name: 'Test City', temp: 25 };
    mockStorage.getValue.mockReturnValue(initialValue);

    const { result } = renderHook(() => useStoreState('city'));

    act(() => {
      result.current[1](undefined as any);
    });

    expect(result.current[0]).toBeUndefined();
    expect(mockStorage.removeValue).toHaveBeenCalledWith('city');
    expect(mockStorage.saveValue).not.toHaveBeenCalled();
  });

  it('should remove value from storage when setting empty string', () => {
    const initialValue = { name: 'Test City', temp: 25 };
    mockStorage.getValue.mockReturnValue(initialValue);

    const { result } = renderHook(() => useStoreState('city'));

    act(() => {
      result.current[1]('' as any);
    });

    expect(result.current[0]).toBe('');
    expect(mockStorage.removeValue).toHaveBeenCalledWith('city');
    expect(mockStorage.saveValue).not.toHaveBeenCalled();
  });

  it('should maintain referential equality of setter function', () => {
    mockStorage.getValue.mockReturnValue(undefined);

    const { result, rerender } = renderHook(() => useStoreState('city'));

    const firstSetter = result.current[1];

    rerender(() => useStoreState('city'));

    expect(result.current[1]).toBe(firstSetter);
  });

  it('should handle multiple state updates correctly', () => {
    mockStorage.getValue.mockReturnValue(undefined);

    const { result } = renderHook(() => useStoreState('city'));

    act(() => {
      result.current[1]('First Value');
    });

    expect(result.current[0]).toBe('First Value');
    expect(mockStorage.saveValue).toHaveBeenCalledWith('city', 'First Value');

    act(() => {
      result.current[1]('Second Value');
    });

    expect(result.current[0]).toBe('Second Value');
    expect(mockStorage.saveValue).toHaveBeenCalledWith('city', 'Second Value');
  });
}); 