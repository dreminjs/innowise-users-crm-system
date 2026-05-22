import { render, screen, fireEvent } from "@testing-library/react";
import { useQuery } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useTableState } from "@/shared/helpers/useTableState";
import { LanguagesTable } from "./LanguagesTable";

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/shared/helpers/useTableState", () => ({
  useTableState: jest.fn(),
}));

jest.mock("@/modules/Languages/ui/LanguagesTable/LanguageActions", () => ({
  LanguageActions: ({
    languageId,
    languageName,
    nativeName,
    iso2,
  }: {
    languageId: string;
    languageName: string;
    nativeName: string;
    iso2: string;
  }) => (
    <div>
      actions:
      {languageId}-{languageName}-{nativeName}-{iso2}
    </div>
  ),
}));

jest.mock("@/shared/ui/GenericTable/GenericTable", () => ({
  GenericTable: ({
    data,
    columns,
    loading,
    sortField,
    sortOrder,
    onSort,
    rowKey,
  }: {
    data: Array<{
      id: string;
      name: string;
      native_name?: string | null;
      iso2?: string | null;
    }>;
    columns: Array<{
      key: string;
      title: string;
      render: (item: {
        id: string;
        name: string;
        native_name?: string | null;
        iso2?: string | null;
      }) => React.ReactNode;
    }>;
    loading: boolean;
    sortField: string;
    sortOrder: string;
    onSort: (field: string) => void;
    rowKey: (item: { id: string }) => string;
  }) => (
    <div>
      <div>
        loading:
        {String(loading)}
      </div>

      <div>
        sortField:
        {sortField}
      </div>

      <div>
        sortOrder:
        {sortOrder}
      </div>

      <button type="button" onClick={() => onSort("name")}>
        sort
      </button>

      {columns.map((column) => (
        <div key={column.key}>
          column:
          {column.title}
        </div>
      ))}
      {data.map((item) => (
        <div key={rowKey(item)}>
          <div>
            row:
            {item.name}
          </div>
          {columns.map((column) => (
            <div key={column.key}>{column.render(item)}</div>
          ))}
        </div>
      ))}
    </div>
  ),
}));

jest.mock("@/modules/Languages/api/queries", () => ({
  GET_LANGUAGES: "GET_LANGUAGES",
}));

jest.mock("./LanguagesTable.module.css", () => ({
  nameColumn: "nameColumn",
  nativeNameColumn: "nativeNameColumn",
  isoColumn: "isoColumn",
  actionsColumn: "actionsColumn",
  cellContent: "cellContent",
}));

describe("LanguagesTable", () => {
  const handleSort = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    (useTableState as jest.Mock).mockReturnValue({
      sortField: "name",
      sortOrder: "asc",
      handleSort,
    });
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        languages: [
          {
            id: "1",
            name: "English",
            native_name: "English",
            iso2: "en",
          },
          {
            id: "2",
            name: "German",
            native_name: "Deutsch",
            iso2: "de",
          },
        ],
      },
      loading: false,
      error: null,
    });
  });

  it("renders GenericTable", () => {
    render(<LanguagesTable search="" />);
    expect(screen.getByText("loading:false")).toBeInTheDocument();
  });

  it("renders all languages", () => {
    render(<LanguagesTable search="" />);
    expect(screen.getByText("row:English")).toBeInTheDocument();
    expect(screen.getByText("row:German")).toBeInTheDocument();
  });

  it("filters languages by name", () => {
    render(<LanguagesTable search="engl" />);
    expect(screen.getByText("row:English")).toBeInTheDocument();
    expect(screen.queryByText("row:German")).not.toBeInTheDocument();
  });

  it("filters languages by native name", () => {
    render(<LanguagesTable search="deut" />);
    expect(screen.getByText("row:German")).toBeInTheDocument();
    expect(screen.queryByText("row:English")).not.toBeInTheDocument();
  });

  it("filters languages by iso2", () => {
    render(<LanguagesTable search="en" />);
    expect(screen.getByText("row:English")).toBeInTheDocument();
  });

  it("renders translated columns", () => {
    render(<LanguagesTable search="" />);
    expect(screen.getByText("column:name")).toBeInTheDocument();
    expect(screen.getByText("column:nativeName")).toBeInTheDocument();
    expect(screen.getByText("column:iso2")).toBeInTheDocument();
  });

  it("renders LanguageActions", () => {
    render(<LanguagesTable search="" />);
    expect(
      screen.getByText("actions:1-English-English-en"),
    ).toBeInTheDocument();
  });
  it("passes loading state", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        languages: [],
      },
      loading: true,
      error: null,
    });
    render(<LanguagesTable search="" />);
    expect(screen.getByText("loading:true")).toBeInTheDocument();
  });

  it("renders error message", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
      error: {
        message: "Request failed",
      },
    });
    render(<LanguagesTable search="" />);
    expect(screen.getByText("Error: Request failed")).toBeInTheDocument();
  });

  it("calls handleSort", () => {
    render(<LanguagesTable search="" />);
    fireEvent.click(screen.getByText("sort"));
    expect(handleSort).toHaveBeenCalledWith("name");
  });

  it("passes sort state", () => {
    (useTableState as jest.Mock).mockReturnValue({
      sortField: "name",
      sortOrder: "desc",
      handleSort,
    });
    render(<LanguagesTable search="" />);
    expect(screen.getByText("sortOrder:desc")).toBeInTheDocument();
  });

  it("sorts languages descending", () => {
    (useTableState as jest.Mock).mockReturnValue({
      sortField: "name",
      sortOrder: "desc",
      handleSort,
    });
    render(<LanguagesTable search="" />);
    const rows = screen.getAllByText(/row:/);
    expect(rows[0]).toHaveTextContent("row:German");
    expect(rows[1]).toHaveTextContent("row:English");
  });

  it("renders fallback values", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        languages: [
          {
            id: "1",
            name: "French",
            native_name: null,
            iso2: null,
          },
        ],
      },
      loading: false,
      error: null,
    });
    render(<LanguagesTable search="" />);
    expect(screen.getAllByText("-")).toHaveLength(2);
  });
});
