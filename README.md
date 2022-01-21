# pensjon-selvbetjening-opptjening-frontend

Frontend-applikasjon for selvbetjening relatert til pensjonsopptjening.

# Bruk

Appen kan nås på følgende adresser: 
- Produksjon: [https://www.nav.no/pensjon/opptjening/](https://www.nav.no/pensjon/opptjening/)
- Utvikling: [https://www-gcp.dev.nav.no/pensjon/opptjening/](https://www-gcp.dev.nav.no/pensjon/opptjening/)

# Henvendelser

NAV-interne henvendelser kan sendes via Slack i kanalen [#po-pensjon-teamselvbetjening](https://nav-it.slack.com/archives/C014M7U1GBY).

# Utviklerinformasjon

Appen er implementert med [React](https://reactjs.org/).
Prosjektet ble initialisert med [Create React App](https://github.com/facebook/create-react-app).

## Utvikling lokalt

Bruk `npm run dev` for å kjøre appen i utviklingsmodus.<br/> 
Åpne [http://localhost:3000/pensjon/opptjening](http://localhost:3000/pensjon/opptjening) for å se den i nettleser.
Applikasjonen kjører da opp en lokal JSON-server som mocker data.

## Visuelle tester
Testene skal kjøres i Docker før de oppdateres. Man kan kjøre både i Docker og uten lokalt.
Testene baserer seg på produksjonsbygget med spesial-URL for Dekoratøren. Dermed må 
man bygge for å få ønsket resultat med `npm run build:cypress`.

Kjøre tester lokalt i Docker-container: `npm run cypress:docker:local`

Oppdatere baseline-images lokalt: `npm run update:cypress:docker:images` (må pushe nye bilder til branch)

Cyress test runner: `npm run cypress:interactive` krever at express serveren allerede kjører => `npm run express`

GitHub Actions kjøres med `cypress-integration.yaml` Her er IP-adressen satt pga. at Docker ikke fungerer med vanlig `localhost` på Linux.

Hvis testene feiler på GitHub Actions kan man laste ned diffen fra jobben. Under "Where does the upload go?" her: [github.com/actions/upload-artifact](https://github.com/actions/upload-artifact)

Cypress-testene kjøres i Docker fra repoet [github.com/cypress-io/cypress-docker-images/tree/master/included](https://github.com/cypress-io/cypress-docker-images/tree/master/included).

Vi intercepter kall mot innloggingsstatus for Dekoratøren for at det skal fungere likt på GitHub Actions og lokalt uten Naisdevice.
OBS: Dekoratørens visuelle endringer vil brekke dette bygget. Ved reload av siden vil Dekoratørens chatbot prompte spørsmål.

#Feilsøking:
Legg til `DEBUG=cypress:*` som en miljøvariabel med `-e` før `cypress/included` i Docker-kommandoen.
Evt. se her: [github.com/cypress-io/cypress-docker-images/tree/master/included](https://github.com/cypress-io/cypress-docker-images/tree/master/included).

Bildene vi bryr oss om ligger under `cypress/snapshots/navn på testfil/bilde.png`.
Ved `bilde.png` vil det komme opp et diff-bilde hvis det avviker fra baselinen.
Vi bruker `cypress-image-snapshot` som er en wrapper for `https://github.com/americanexpress/jest-image-snapshot`
som lar oss ha sømløs integrering mot Jest.
I bunn ligger [Pixelmatch](https://github.com/mapbox/pixelmatch).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
