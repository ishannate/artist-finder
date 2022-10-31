import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlbumDetails } from "./AlbumDetails";

const mockNumberWithCommas = jest.fn();
const mockopenInNewTab = jest.fn();
const mockOnBack = jest.fn();

const mockRemoveCharacterFromObject = jest.fn();
jest.mock("../../helpers/helpers", () => ({
  removeCharacterFromObject: () => {
    mockRemoveCharacterFromObject();

    return { text: "test", size: "small" };
  },
  numberWithCommas: () => {
    mockNumberWithCommas();

    return "123,456";
  },
  openInNewTab: () => {
    mockopenInNewTab();
  },
}));

test("renders Album details", () => {
  render(
    <AlbumDetails
      album={{
        artist: "Test Artist",
        image: [{ text: "test", size: "small" }],
        name: "Test name",
        playcount: 1,
        url: "Test url",
        listeners: 1,
        mbid: "1234",
        wiki: {
          published: "10 Oct 2022, 22:51",
          content: "Lorem Ipsum",
          summary: "Lorem Ipsm",
        },
        tags: { tag: [{ name: "tag 1", url: "tag 1" }] },
        tracks: { track: [] },
      }}
      onBack={mockOnBack}
    />
  );

  expect(screen.getByText("Test name")).toBeInTheDocument();
  expect(mockNumberWithCommas).toBeCalledTimes(4);

  const albumCardButton = screen.getByLabelText("back-button");
  userEvent.click(albumCardButton);
  expect(mockOnBack).toBeCalledTimes(1);

  const openInTabButton = screen.getByLabelText("open-in-tab");
  userEvent.click(openInTabButton);
  expect(mockopenInNewTab).toBeCalledTimes(1);
});
