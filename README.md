# Primary Bid code assignment

This app has been deployed to: http://primarybid.s3-website-us-east-1.amazonaws.com/

# Technical considerations

When builing this little project I made the following decisions:

- To use the default HTML text field validation for the username and password fields on the sign in form. This essentially checks that these fields are not blank. I could have used a form library but that seemed a bit much for this simple app.

- The auth API (https://fakestoreapi.com/auth/login) was just returning a 524 status code for me, even when I tried sending valid input. I assume there may be some issue server side with this API. So I commented out my code which would deal with a real API response and just set a fake token instead.

- For quickness I have used the type `any` for a product's type

- The user's basket is lost on page refresh - this would obviously not be a good if this was a real app

- More test coverage should be added

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
