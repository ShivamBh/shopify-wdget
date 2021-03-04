# Ecodrive shopify widget documentation

This project was built using React(Preact), Parcel and Shopify AJAX API.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn predeploy`

This command uses the Parcel bundler to compile the code and return static files(index.js and index.css) which can be served from any static hosting of your choice. By default, it will output the static files to docs folder(which can be edited to output to the folder of your choice).

### `yarn deploy`

This command is a composite command which combines predeploy with deploying to github pages.
**Note: You have configure your github pages for the deploy to work**
**Note: You can configure the command to deploy to any static hosting of your choice such as Amazon S3**

## Usage

Use 'yarn predeploy' or 'npm run predeploy' to build the static js and css files and serve them through a static hosting of your choice.

Include the 'link' and 'script' tags before the end of body tags in the theme.liquid files of your shopify store.

In your cart page add a div tag will class 'toggle-widget' like so:

<div class="toggle-widget" data-variantId="64729472629" data-autoToggle="true" data-position="center"></div>

Add this code to where you would want your component to appear.
In case your cart component uses modals and sliders you may need to add the code there as well.

The toggle accepts three values, the variantId of the Ecodrive product in the store, autoToggle to automatically add the Ecodrive product to the cart and position to render the component in left, right or center.
