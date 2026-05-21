import { act, fireEvent, render, screen } from "@testing-library/react";
import { UploadAvatar } from "./UploadAvatar";
import { useUploadAvatar } from "../../../model/hooks/useUploadAvatar";
import { toBase64 } from "../../../model/utils/toBase64";

jest.mock("../../../model/hooks/useUploadAvatar", () => ({
  useUploadAvatar: jest.fn(),
}));

jest.mock("../../../model/utils/toBase64", () => ({
  toBase64: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("./Avatar", () => ({
  Avatar: ({ firstLetter }: { firstLetter: string }) => (
    <div>{firstLetter}</div>
  ),
}));

jest.mock("@/shared/ui/Icon/Icon", () => ({
  Icon: () => <div>icon</div>,
}));

jest.mock("@chakra-ui/react", () => ({
  Spinner: () => <div>Loading...</div>,
  FileUpload: {
    Root: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    HiddenInput: ({
      onChange,
    }: {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }) => <input type="file" data-testid="file-input" onChange={onChange} />,

    Trigger: ({
      children,
      disabled,
    }: {
      children: React.ReactNode;
      disabled?: boolean;
    }) => <button disabled={disabled}>{children}</button>,
  },
}));

describe("UploadAvatar", () => {
  const submitMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    global.URL.createObjectURL = jest.fn(() => "preview-url");
    (useUploadAvatar as unknown as jest.Mock).mockReturnValue({
      onSubmit: submitMock,
      loading: false,
    });
    (toBase64 as unknown as jest.Mock).mockResolvedValue("base64");
  });
  it("should render upload text", () => {
    render(
      <UploadAvatar
        userId="1"
        avatarUrl=""
        firstLetter="J"
        isUploadAvailable={true}
      />,
    );
    expect(screen.getByText("uploadTitle")).toBeInTheDocument();
    expect(screen.getByText("uploadDescription")).toBeInTheDocument();
  });
  it("should render avatar", () => {
    render(
      <UploadAvatar
        userId="1"
        avatarUrl=""
        firstLetter="J"
        isUploadAvailable={true}
      />,
    );
    expect(screen.getByText("J")).toBeInTheDocument();
  });
  it("should render spinner", () => {
    (useUploadAvatar as unknown as jest.Mock).mockReturnValue({
      onSubmit: submitMock,
      loading: true,
    });
    render(
      <UploadAvatar
        userId="1"
        avatarUrl=""
        firstLetter="J"
        isUploadAvailable={true}
      />,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("should upload file", async () => {
    render(
      <UploadAvatar
        userId="1"
        avatarUrl=""
        firstLetter="J"
        isUploadAvailable={true}
      />,
    );
    const file = new File(["test"], "avatar.png", {
      type: "image/png",
    });
    const input = screen.getByTestId("file-input") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(input, {
        target: {
          files: [file],
        },
      });
    });
    expect(toBase64).toHaveBeenCalledWith(file);
    expect(submitMock).toHaveBeenCalledWith({
      userId: "1",
      base64: "base64",
      size: file.size,
      type: file.type,
    });
  });
  it("should hide upload controls", () => {
    render(
      <UploadAvatar
        userId="1"
        avatarUrl=""
        firstLetter="J"
        isUploadAvailable={false}
      />,
    );
    expect(screen.queryByText("uploadTitle")).not.toBeInTheDocument();
  });
});
