# Getting Started

Install node to your machine
Check if node is installed by opening a terminal and running `node -v`
if the command is not identified download the LTS version from https://nodejs.org/en/

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the third party libraries/packages needed for the application to run
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### Notes

##### completed tasks
    Albums overview
        Page showing artist details and all the albums of the selected artist with thumbnail, name and year
        Albums are sorted by name (ascending order).
    Album detail view
        Album details page showing album details and all the tracks listed.
        User can tap/select a favourite song to add to favourites or remove from it.
        User can add a song to favourites from either album detailed view or by navigating to songs url from the button in the header and searching for a song title and clicking on the heart icon.
    Songs page - Search a song | Favourites overview page | Favourites
        All the songs selected for favourites will be shown this page with track name, duration, album and a link to listen the song from Last.fm.
        User can unselect a song from the favourites by clicking on the heart icon in-front of the relevant song.
        User can search a song from the search functionality provided and click on the heart icon in-front of the record and push it to the favourites list.
##### Completed Must Haves
    React with ES6+.
    Usage of modular styling.
    Typescript.
    Styled components
    Redux
##### Completed extra points
    Responsiveness
    Unit test cases - 3 components (TitleCard, AlbumDetails, AlbumCard)

##### Todo
    Best played graph
    Server side rendering
    Usage of a linter
    Personal web-pack configuration
