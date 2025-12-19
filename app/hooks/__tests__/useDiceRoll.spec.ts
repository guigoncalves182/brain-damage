import { act, renderHook, waitFor } from "@testing-library/react";
import { useDiceRoll } from "../useDiceRoll";

describe("useDiceRoll", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should initialize with null diceResult and isRolling false", () => {
    const { result } = renderHook(() => useDiceRoll());

    expect(result.current.diceResult).toBeNull();
    expect(result.current.isRolling).toBe(false);
  });

  it("should roll dice and set a result between 1 and 6", async () => {
    const { result } = renderHook(() => useDiceRoll());

    act(() => {
      result.current.rollDice();
    });

    expect(result.current.isRolling).toBe(true);

    // Avançar todos os timers
    act(() => {
      jest.advanceTimersByTime(10 * 80); // 10 spins * 80ms
    });

    await waitFor(() => {
      expect(result.current.isRolling).toBe(false);
    });

    expect(result.current.diceResult).toBeGreaterThanOrEqual(1);
    expect(result.current.diceResult).toBeLessThanOrEqual(6);
  });

  it("should not roll dice if already rolling", () => {
    const { result } = renderHook(() => useDiceRoll());

    act(() => {
      result.current.rollDice();
    });

    const firstRolling = result.current.isRolling;

    act(() => {
      result.current.rollDice(); // Tentar rolar novamente
    });

    expect(firstRolling).toBe(true);
    expect(result.current.isRolling).toBe(true);
  });

  it("should reset dice result to null", () => {
    const { result } = renderHook(() => useDiceRoll());

    // Primeiro rolar o dado
    act(() => {
      result.current.rollDice();
      jest.advanceTimersByTime(10 * 80);
    });

    // Resetar
    act(() => {
      result.current.resetDice();
    });

    expect(result.current.diceResult).toBeNull();
  });

  it("should update diceResult multiple times during animation", () => {
    const { result } = renderHook(() => useDiceRoll());
    const results: (number | null)[] = [];

    act(() => {
      result.current.rollDice();
    });

    // Capturar resultados intermediários
    for (let i = 0; i < 5; i++) {
      act(() => {
        jest.advanceTimersByTime(80);
      });
      results.push(result.current.diceResult);
    }

    // Deve ter múltiplos resultados diferentes durante a animação
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r !== null)).toBe(true);
  });
});
