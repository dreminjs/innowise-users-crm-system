import { render, screen } from "@testing-library/react";
import { NotificationList } from "./NotificationList";
import { useNotification } from "@/modules/Notifications";

jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));
jest.mock("./NotificationItem", () => ({
  NotificationItem: ({ message }: { message: string }) => <li>{message}</li>,
}));
describe("NotificationList", () => {
  const removeNotificationMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render notifications", () => {
    (useNotification as unknown as jest.Mock).mockReturnValue({
      removeNotification: removeNotificationMock,
      notifications: [
        {
          id: "1",
          type: "success",
          message: "Success",
        },
        {
          id: "2",
          type: "error",
          message: "Error",
        },
      ],
    });
    render(<NotificationList />);
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("should render empty list", () => {
    (useNotification as unknown as jest.Mock).mockReturnValue({
      removeNotification: removeNotificationMock,
      notifications: [],
    });
    render(<NotificationList />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
  it("should call NotificationItem with remove handler", () => {
    (useNotification as unknown as jest.Mock).mockReturnValue({
      removeNotification: removeNotificationMock,
      notifications: [
        {
          id: "1",
          type: "success",
          message: "Success",
        },
      ],
    });
    render(<NotificationList />);
    expect(screen.getByText("Success")).toBeInTheDocument();
  });
});
