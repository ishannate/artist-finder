import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TrackCard } from "./TrackCard";

const mockOnFavSelectDeselect = jest.fn();
const mockOnOpen = jest.fn();

const mockSecondsToHMS = jest.fn();
jest.mock("../../helpers/helpers", () => ({
  secondsToHMS: () => {
    mockSecondsToHMS();

    return "10.10";
  },

  removeCharacterFromObject: () => {
    mockRemoveCharacterFromObject();

    return { text: "test", size: "small" };
  },
}));

const mockRemoveCharacterFromObject = jest.fn();

test("renders Track card", () => {
  render(
    <TrackCard
      isTrackInFavList
      isAlbumShown
      onFavSelectDeselect={mockOnFavSelectDeselect}
      track={{
        duration: 230,
        name: "Track name",
        url: "test",
        artist: {
          url: "test",
          name: "Test Artist name",
          mbid: "test",
        },
        attr: {
          rank: 0,
          position: 0,
        },
        album: {
          artist: "test",
          title: "Test Album name",
          mbid: "test",
          url: "test",
          image: [{ text: "test", size: "small" }],
        },
        listeners: 10,
        playcount: 10,
        topTags: { tag: [{ name: "test", url: "test" }] },
        wiki: { content: "test", published: "test", summary: "test" },
      }}
      onOpen={mockOnOpen}
    />
  );

  expect(screen.getByText("Track name")).toBeInTheDocument();
  expect(screen.getByText("Test Album name")).toBeInTheDocument();

  const favButton = screen.getByLabelText("fav-select");
  userEvent.click(favButton);
  expect(mockOnFavSelectDeselect).toBeCalledTimes(1);

  const listenButton = screen.getByLabelText("listen-on-last-fm");
  userEvent.click(listenButton);
  expect(mockOnOpen).toBeCalledTimes(1);

  expect(mockSecondsToHMS).toBeCalledTimes(2);
});

test("renders Track card not in favorite list and album is not shown", () => {
  render(
    <TrackCard
      isTrackInFavList={false}
      isAlbumShown={false}
      onFavSelectDeselect={mockOnFavSelectDeselect}
      track={{
        duration: 230,
        name: "Track name",
        url: "test",
        artist: {
          url: "test",
          name: "Test Artist name",
          mbid: "test",
        },
        attr: {
          rank: 0,
          position: 0,
        },
        album: {
          artist: "test",
          title: "Test Album name",
          mbid: "test",
          url: "test",
          image: [{ text: "test", size: "small" }],
        },
        listeners: 10,
        playcount: 10,
        topTags: { tag: [{ name: "test", url: "test" }] },
        wiki: { content: "test", published: "test", summary: "test" },
      }}
      onOpen={mockOnOpen}
    />
  );

  expect(screen.getByText("Track name")).toBeInTheDocument();
  expect(screen.queryByText("Test Album name")).not.toBeInTheDocument();

  const favButton = screen.getByLabelText("fav-select");
  userEvent.click(favButton);
  expect(mockOnFavSelectDeselect).toBeCalledTimes(1);

  const listenButton = screen.getByLabelText("listen-on-last-fm");
  userEvent.click(listenButton);
  expect(mockOnOpen).toBeCalledTimes(1);
});

test("renders Track card without duration", () => {
  render(
    <TrackCard
      isTrackInFavList
      isAlbumShown
      onFavSelectDeselect={mockOnFavSelectDeselect}
      track={{
        duration: null,
        name: "Track name",
        url: "test",
        artist: {
          url: "test",
          name: "Test Artist name",
          mbid: "test",
        },
        attr: {
          rank: 1,
          position: 1,
        },
        listeners: 10,
        playcount: 10,
        topTags: { tag: [{ name: "test", url: "test" }] },
        wiki: { content: "test", published: "test", summary: "test" },
      }}
      onOpen={mockOnOpen}
    />
  );

  expect(screen.getByText("Track name")).toBeInTheDocument();
  expect(screen.getByText("---")).toBeInTheDocument();
});
