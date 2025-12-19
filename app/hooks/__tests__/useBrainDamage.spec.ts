import Archetype from "@/app/archetype";
import { act, renderHook } from "@testing-library/react";
import { useBrainDamage } from "../useBrainDamage";

const mockArchetype: Archetype = {
  _id: "1",
  id: "test-archetype",
  name: "Test Archetype",
  defect: "Test Defect",
  characteristic: "Test Characteristic",
  flavorText: "Test Flavor",
  backgroundImage: "/test.jpg",
  diceRoll: ["1", "2", "3", "4", "5", "6"],
  brainDamage: {
    topLeft: 0,
    topRight: 1,
    middleLeft: 2,
    middleRight: 3,
    bottomLeft: 4,
    bottomRight: 5,
  },
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
  __v: 0,
};

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useBrainDamage", () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should initialize with archetype default values", () => {
    const { result } = renderHook(() => useBrainDamage(mockArchetype));

    expect(result.current.brainDamage.topLeft).toBe(0);
    expect(result.current.brainDamage.topRight).toBe(1);
    expect(result.current.brainDamage.middleLeft).toBe(2);
    expect(result.current.brainDamage.middleRight).toBe(3);
    expect(result.current.brainDamage.bottomLeft).toBe(4);
    expect(result.current.brainDamage.bottomRight).toBe(5);
  });

  it("should increment brain damage on cell click", () => {
    const { result } = renderHook(() => useBrainDamage(mockArchetype));

    act(() => {
      result.current.handleCellClick("topLeft");
    });

    expect(result.current.brainDamage.topLeft).toBe(1);
  });

  it("should reset to default value when clicking at max value", () => {
    const { result } = renderHook(() => useBrainDamage(mockArchetype));

    // Incrementar até o máximo
    for (let i = 0; i < 6; i++) {
      act(() => {
        result.current.handleCellClick("topLeft");
      });
    }

    expect(result.current.brainDamage.topLeft).toBe(6);

    // Clicar novamente deve resetar para o valor padrão
    act(() => {
      result.current.handleCellClick("topLeft");
    });

    expect(result.current.brainDamage.topLeft).toBe(0);
  });

  it("should save to localStorage on brain damage change", () => {
    const { result } = renderHook(() => useBrainDamage(mockArchetype));

    act(() => {
      result.current.handleCellClick("topLeft");
    });

    // Dar tempo para o efeito executar
    act(() => {
      jest.runAllTimers();
    });

    const stored = localStorageMock.getItem("brain-damage-test-archetype");
    expect(stored).not.toBeNull();

    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.topLeft).toBe(1);
    }
  });

  it("should detect when canRollDamage is false (all cells at max)", () => {
    const maxArchetype = {
      ...mockArchetype,
      brainDamage: {
        topLeft: 6,
        topRight: 6,
        middleLeft: 6,
        middleRight: 6,
        bottomLeft: 6,
        bottomRight: 6,
      },
    };

    const { result } = renderHook(() => useBrainDamage(maxArchetype));

    expect(result.current.canRollDamage).toBe(false);
  });

  it("should detect when canRollDamage is true", () => {
    const { result } = renderHook(() => useBrainDamage(mockArchetype));

    expect(result.current.canRollDamage).toBe(true);
  });

  it('should detect "on the edge" status when 3+ cells are at max', () => {
    const edgeArchetype = {
      ...mockArchetype,
      brainDamage: {
        topLeft: 6,
        topRight: 6,
        middleLeft: 6,
        middleRight: 0,
        bottomLeft: 0,
        bottomRight: 0,
      },
    };

    const { result } = renderHook(() => useBrainDamage(edgeArchetype));

    expect(result.current.isOnTheEdge).toBe(true);
  });

  it('should not be "on the edge" with less than 3 cells at max', () => {
    const { result } = renderHook(() => useBrainDamage(mockArchetype));

    expect(result.current.isOnTheEdge).toBe(false);
  });

  it("should roll brain damage and increment a valid cell", () => {
    const { result } = renderHook(() => useBrainDamage(mockArchetype));

    act(() => {
      result.current.rollBrainDamage();
      jest.advanceTimersByTime(10 * 80 + 1500); // Animação + timeout
    });

    // Verificar se alguma célula foi incrementada
    const values = Object.values(result.current.brainDamage);
    const total = values.reduce((sum, val) => sum + val, 0);
    const originalTotal = Object.values(mockArchetype.brainDamage).reduce(
      (sum, val) => sum + val,
      0
    );

    expect(total).toBe(originalTotal + 1);
  });

  it("should not roll if already rolling", () => {
    const { result } = renderHook(() => useBrainDamage(mockArchetype));

    act(() => {
      result.current.rollBrainDamage();
    });

    const firstIsRolling = result.current.isRolling;

    act(() => {
      result.current.rollBrainDamage(); // Tentar rolar novamente
    });

    expect(firstIsRolling).toBe(true);
  });

  it("should set selectedCell during roll animation", () => {
    const { result } = renderHook(() => useBrainDamage(mockArchetype));

    act(() => {
      result.current.rollBrainDamage();
      jest.advanceTimersByTime(80);
    });

    expect(result.current.selectedCell).not.toBeNull();
    expect(result.current.selectedCell).toBeGreaterThanOrEqual(1);
    expect(result.current.selectedCell).toBeLessThanOrEqual(6);
  });
});
