import { fireEvent, render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";
import { useDeleteAvatar } from "@/modules/Users/model/hooks/useDeleteAvatar";

jest.mock("@/modules/Users/model/hooks/useDeleteAvatar", () => ({
  useDeleteAvatar: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("Avatar", () => {
  const deleteAvatarMock = jest.fn();
  const clearAvatarMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useDeleteAvatar as unknown as jest.Mock).mockReturnValue({
      deleteAvatar: deleteAvatarMock,
    });
  });

  it("should render avatar image", () => {
    render(
      <Avatar
        avatarUrl="avatar.png"
        firstLetter="J"
        isAvailable={true}
        onClearAvatar={clearAvatarMock}
      />,
    );
    expect(screen.getByAltText("avatar")).toBeInTheDocument();
  });
  it("should render first letter", () => {
    render(
      <Avatar
        avatarUrl={null}
        firstLetter="J"
        isAvailable={true}
        onClearAvatar={clearAvatarMock}
      />,
    );
    expect(screen.getByText("J")).toBeInTheDocument();
  });
  it("should render delete button", () => {
    render(
      <Avatar
        avatarUrl="avatar.png"
        firstLetter="J"
        isAvailable={true}
        onClearAvatar={clearAvatarMock}
      />,
    );
    expect(screen.getByText("❌")).toBeInTheDocument();
  });
  it("should hide delete button", () => {
    render(
      <Avatar
        avatarUrl="avatar.png"
        firstLetter="J"
        isAvailable={false}
        onClearAvatar={clearAvatarMock}
      />,
    );
    expect(screen.queryByText("❌")).not.toBeInTheDocument();
  });
  it("should call delete avatar", () => {
    render(
      <Avatar
        avatarUrl="avatar.png"
        firstLetter="J"
        isAvailable={true}
        onClearAvatar={clearAvatarMock}
      />,
    );
    fireEvent.click(screen.getByText("❌"));
    expect(clearAvatarMock).toHaveBeenCalled();
    expect(deleteAvatarMock).toHaveBeenCalled();
  });
});
