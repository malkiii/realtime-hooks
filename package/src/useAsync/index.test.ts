import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAsync } from '.';

describe('useAsync', () => {
  it('should fetch data successfully', async () => {
    const asyncFunction = async () => 'Success';
    const { result } = renderHook(() => useAsync(asyncFunction));
    await act(() => result.current.callback());

    await waitFor(() => expect(result.current.isPending).toBeFalsy());

    expect(result.current.data).toBe('Success');
    expect(result.current.error).toBe(undefined);
  });

  it('should handle error', async () => {
    const asyncFunction = async () => {
      throw new Error('Test Error');
    };

    const { result } = renderHook(() => useAsync(asyncFunction));
    await act(() => result.current.callback());

    await waitFor(() => expect(result.current.isPending).toBeFalsy());

    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
