import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlbumCard } from "./AlbumCard";

const mockOnClick = jest.fn();

const mockRemoveCharacterFromObject = jest.fn();
jest.mock("../../helpers/helpers", () => ({
  removeCharacterFromObject: () => {
    mockRemoveCharacterFromObject();

    return { text: "test", size: "small" };
  },
}));

test("renders Album card", () => {
  render(
    <AlbumCard
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
        tracks: { track: [] },
      }}
      onClick={mockOnClick}
    />
  );

  expect(screen.getByText("Test name")).toBeInTheDocument();

  const albumCardButton = screen.getByLabelText("album-card");
  userEvent.click(albumCardButton);
  expect(mockOnClick).toBeCalledTimes(1);
});
