import { useUserStore } from "./user.store";
import { UserRole } from "@/generated/graphql";

describe("useUserStore", () => {
  beforeEach(() => {
    useUserStore.setState({
      role: null,
      userId: null,
      email: null,
      position: null,
      position_name: null,
    });
    localStorage.clear();
  });

  it("has initial state", () => {
    const state = useUserStore.getState();
    expect(state.role).toBeNull();
    expect(state.userId).toBeNull();
    expect(state.email).toBeNull();
    expect(state.position).toBeNull();
    expect(state.position_name).toBeNull();
  });
  it("sets role", () => {
    useUserStore.getState().setRole(UserRole.Admin);
    expect(useUserStore.getState().role).toBe(UserRole.Admin);
  });
  it("sets userId", () => {
    useUserStore.getState().setUserId("123");
    expect(useUserStore.getState().userId).toBe("123");
  });

  it("sets email", () => {
    useUserStore.getState().setEmail("test@test.com");
    expect(useUserStore.getState().email).toBe("test@test.com");
  });
  it("sets position name", () => {
    useUserStore.getState().setPositionName("Frontend");
    expect(useUserStore.getState().position_name).toBe("Frontend");
  });
  it("sets user partially", () => {
    useUserStore.getState().setUser({
      role: UserRole.Employee,
      email: "mail@test.com",
    });
    const state = useUserStore.getState();
    expect(state.role).toBe(UserRole.Employee);
    expect(state.email).toBe("mail@test.com");
  });

  it("preserves previous state on partial update", () => {
    useUserStore.getState().setUser({
      role: UserRole.Admin,
      userId: "55",
    });
    useUserStore.getState().setUser({
      email: "admin@test.com",
    });
    const state = useUserStore.getState();
    expect(state.role).toBe(UserRole.Admin);
    expect(state.userId).toBe("55");
    expect(state.email).toBe("admin@test.com");
  });

  it("resets user state", () => {
    useUserStore.getState().setUser({
      role: UserRole.Admin,
      userId: "777",
      email: "test@test.com",
      position_name: "Backend",
    });
    useUserStore.getState().resetUser();
    const state = useUserStore.getState();
    expect(state.role).toBeNull();
    expect(state.userId).toBeNull();
    expect(state.email).toBeNull();
    expect(state.position_name).toBeNull();
  });

  it("updates state multiple times", () => {
    const store = useUserStore.getState();
    store.setRole(UserRole.Employee);
    store.setUserId("1");
    store.setEmail("user@test.com");
    const state = useUserStore.getState();
    expect(state.role).toBe(UserRole.Employee);
    expect(state.userId).toBe("1");
    expect(state.email).toBe("user@test.com");
  });
});
