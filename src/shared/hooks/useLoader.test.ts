import { renderHook, act } from "@testing-library/react";
import { useLoader } from "@/shared/hooks/useLoader";

describe("useLoader", () => {

  // --- USE FAKE TIMERS FOR CONTROLLING ASYNC TIMING ---
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // --- RESTORE REAL TIMERS TO PREVENT SIDE EFFECTS ON OTHER TESTS ---
  afterEach(() => {
    jest.useRealTimers();
  });

  test("returns false initially", () => {
    // Hook returns false before the timeout duration elapses
    const { result } = renderHook(() => useLoader(1000));
    expect(result.current).toBe(false);
  });

  test("returns true after duration", () => {
    const { result } = renderHook(() => useLoader(1000));

    // Advance timers to simulate async delay and trigger state change
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);
  });
});

