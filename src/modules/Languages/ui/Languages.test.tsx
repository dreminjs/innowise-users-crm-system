import { render, screen } from "@testing-library/react";
import { useQuery } from "@apollo/client/react";
import { Languages } from "@/modules/Languages/ui/Langauges";
import { useUserStore } from "@/application/store/user.store";
jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));
jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));
jest.mock("../api/queries", () => ({
  GET_PROFILE_LANGUAGES: "GET_PROFILE_LANGUAGES",
}));
jest.mock("./MenagementLanguages/MenagementLanguages", () => ({
  MenagementLanguages: ({ userId }: { userId: string }) => (
    <div>
      management:
      {userId}
    </div>
  ),
}));
jest.mock("@/modules/Languages", () => ({
  LanguagesList: ({
    languagesData,
    isAvailableToChange,
  }: {
    languagesData: {
      profile: {
        languages: Array<{
          name: string;
        }>;
      };
    };
    isAvailableToChange: boolean;
  }) => (
    <div>
      <div>
        list-count:
        {languagesData.profile.languages.length}
      </div>
      <div>
        editable:
        {String(isAvailableToChange)}
      </div>
    </div>
  ),
}));
jest.mock("@/shared/ui/Loading", () => ({
  Loading: () => <div>loading</div>,
}));
jest.mock("@/shared/ui/Empty", () => ({
  Empty: () => <div>empty</div>,
}));

describe("Languages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        userId: "user-1",
      }),
    );
  });

  it("renders loading state", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
      error: null,
    });
    render(<Languages usersLanguagesId="user-1" />);
    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("renders empty on error", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
      error: new Error("Failed"),
    });
    render(<Languages usersLanguagesId="user-1" />);
    expect(screen.getByText("empty")).toBeInTheDocument();
  });

  it("renders empty when profile missing", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {},
      loading: false,
      error: null,
    });
    render(<Languages usersLanguagesId="user-1" />);
    expect(screen.getByText("empty")).toBeInTheDocument();
  });

  it("renders LanguagesList when languages exist", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        profile: {
          languages: [
            {
              name: "English",
            },
            {
              name: "German",
            },
          ],
        },
      },
      loading: false,
      error: null,
    });
    render(<Languages usersLanguagesId="user-1" />);
    expect(screen.getByText("list-count:2")).toBeInTheDocument();
  });

  it("passes editable=true to LanguagesList for owner", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        profile: {
          languages: [
            {
              name: "English",
            },
          ],
        },
      },
      loading: false,
      error: null,
    });
    render(<Languages usersLanguagesId="user-1" />);
    expect(screen.getByText("editable:true")).toBeInTheDocument();
  });

  it("passes editable=false for another user", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        profile: {
          languages: [
            {
              name: "English",
            },
          ],
        },
      },
      loading: false,
      error: null,
    });
    render(<Languages usersLanguagesId="user-55" />);
    expect(screen.getByText("editable:false")).toBeInTheDocument();
  });

  it("renders empty when languages array empty", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        profile: {
          languages: [],
        },
      },
      loading: false,
      error: null,
    });
    render(<Languages usersLanguagesId="user-1" />);
    expect(screen.getByText("empty")).toBeInTheDocument();
  });

  it("renders MenagementLanguages only for owner", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        profile: {
          languages: [],
        },
      },
      loading: false,
      error: null,
    });
    render(<Languages usersLanguagesId="user-1" />);
    expect(screen.getByText("management:user-1")).toBeInTheDocument();
  });

  it("does not render MenagementLanguages for another user", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        profile: {
          languages: [],
        },
      },
      loading: false,
      error: null,
    });
    render(<Languages usersLanguagesId="user-55" />);
    expect(screen.queryByText("management:user-55")).not.toBeInTheDocument();
  });
  it("passes userId to query variables", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        profile: {
          languages: [],
        },
      },
      loading: false,
      error: null,
    });
    render(<Languages usersLanguagesId="abc-123" />);
    expect(useQuery).toHaveBeenCalledWith("GET_PROFILE_LANGUAGES", {
      variables: {
        userId: "abc-123",
      },
    });
  });
  it("renders section element", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        profile: {
          languages: [
            {
              name: "English",
            },
          ],
        },
      },
      loading: false,
      error: null,
    });
    const { container } = render(<Languages usersLanguagesId="user-1" />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("passes full data to LanguagesList", () => {
    const data = {
      profile: {
        languages: [
          {
            name: "English",
          },
        ],
      },
    };
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data,
      loading: false,
      error: null,
    });
    render(<Languages usersLanguagesId="user-1" />);
    expect(screen.getByText("list-count:1")).toBeInTheDocument();
  });
});
