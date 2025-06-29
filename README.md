# Welcome to the Weather App 👋

## To run this project do the following
NOTE: This is a pre-build app not using Expo Go, so please follow the below and pre-build in step 2.


1. Install dependencies

   ```bash
   yarn install
   ```

2. Pre-build the app

   ```bash
   yarn prebuild
   ```

3. Start the app (ios or android)

   ```bash
   yarn ios
   ```

   ```bash
   yarn android
   ```


To run unit tests
   ```bash
   yarn test
   ```

# Architecture

The project uses a base context for storage but setup using hooks for dealing with business logic.  Normally I would opts for React Query as this provides much better options like cache control etc, so the hooks mimic off this slightly.

Both light and dark themes are support with a useTheme hook and the help of a helper function makeStyles allows updating styles locally in the component with the theme dynamically.

Finally I created a useStoreState hook which offers simular functionality to useState but works with MMKV for sync storage.

