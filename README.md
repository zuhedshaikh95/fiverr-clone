<h1 align="center">Fiverr Clone</h1>

<h3 align="center">A setout to clone one of the largest outsourcing platforms using the toolset from the MERN stack.</h3>

<br />

<h2 align="center">🖥️ Tech Stack</h2>

<h4 align="center">Frontend:</h4>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="reactjs" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="javascript" />
  <img src="https://img.shields.io/badge/Rest_API-02303A?style=for-the-badge&logo=react-router&logoColor=white" alt="restAPI" />
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="sass" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="html5" />
</p>

<h4 align="center">Backend:</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="expressjs" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />

</p>

<h4 align="center">Deployed On:</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="vercel" />
  <img src="https://img.shields.io/badge/Render-430098?style=for-the-badge&logo=heroku&logoColor=white" alt="heroku" />
</p>

<br />
<p align="center">
  <em>
    <b>Pardon render.com's slow service to the server for initial api response</b>
  </em>
</p>
<br />

![cover](https://i.ibb.co/16SWfbg/Fiverr-Gif.gif)

<br />
<br />

An individual project to sharpen the skillset of MERN stack. I'm a big fan of MVC architecture and have been followed in this project. A well-written maintained, and sophisticated backend with models, controllers, middlewares, and other folders to make it easy to maintain and debug. The usage of middlewares makes it much more performant such as cors, compression, and optimizing the API response delivery. Also, usage of media management tools like Cloudinary to upload user profile pictures, Gig slider images, and cover images.
As for the front end, the UI has only been built using JSX and Scss. For state management and error handling, hooks from the Tanstack library have been implemented. Lastly, react-router-dom for routing and private routes.

<br />

## Screens

- Registration, login and gig organize forms
- Homepage / Landing Page with sliding menu
- Gigs page with all categories
- Gig description
- Gig management
- Payments page with Stripe integration
- Message page with one-to-one chat with seller and buyer
- Single gig page
- Gig search
- Image uploading via cloudinary, a media management

<br />

## 🚀 Seller Features

- Chat with buyers
- Create new gigs and
- Only the seller's gig can be deleted
- Gigs can be reviewed by buyers based on comment and stars

## 🚀 User Features

- Chat with seller
- Filter and sort gigs for range of price
- My Orders Section for details of all gigs bought
- Can review gig and give stars
- Order securely with Stripe
- Search gigs with keywords

<br />

## Glimpses of fiverr-clone 😉 :

<table>
  <tr>
    <td><img src="https://i.ibb.co/4Z9CMpn/1.png"  alt="home" /></td>
    <td><img src="https://i.ibb.co/QQQgWTc/2.png"  alt="slider" /></td>
  </tr>
  <tr>
    <td><img src="https://i.ibb.co/YNyrDZb/3.png"  alt="men" /></td>
   <td><img src="https://i.ibb.co/BGw32m3/4.png"  alt="allProducts" /></td>
  </tr>
  <tr>
    <td><img src="https://i.ibb.co/PjXSMsk/5.png" alt="allProducts" /></td>
    <td><img src="https://i.ibb.co/M2xgqN1/13.png"  alt="men" /></td>
  </tr>
  <tr>
    <td><img src="https://i.ibb.co/sKdj3BM/7.png" alt="allProducts" /></td>
    <td><img src="https://i.ibb.co/99VZBNq/11.png"  alt="men" /></td>
  </tr>
  <tr>
    <td><img src="https://i.ibb.co/rc2rzw1/10.png" alt="allProducts" /></td>
    <td><img src="https://i.ibb.co/59WnSW8/9.png"  alt="men" /></td>
  </tr>
  <tr>
    <td><img src="https://i.ibb.co/GkRtV3T/8.png" alt="allProducts" /></td>
    <td><img src="https://i.ibb.co/TkxZjcW/12.png" alt="allProducts" /></td>
    <td></td>
  </tr>
</table>

<br />

<br />

## Getting Started

This project was built using React, Redux, Sass, HTML, JavaScript, Rest API, Node JS, Express and MongoDB with JWT and Stripe integration. It is an freelance outsourcing web application and for running on your local environment you should follow these guidelines.

### Prerequisites

- NPM
- Node JS
- MongoDB

### Setup

The project repository can be found in [GitHub link](https://github.com/zuhedshaikh95/fiverr-clone) or just clone the project using this command.

```
Using HTTPS

# git clone https://github.com/zuhedshaikh95/fiverr-clone.git
```

- Open terminal on your workspace with

```
cd /home/workspace/fiverr-clone
```

## Install

Install NPM

Check that you have node and npm installed

To check if you have Node.js installed, run this command in your terminal:

```
node -v
```

To confirm that you have npm installed you can run this command in your terminal:

```
npm -v
```

To confirm that you have MongoDB installed you can run this command in your terminal:

```
mongo -v
```

To install all the dependences of the project, run the following command:

```
cd client

npm install

cd ../

cd server

npm install
```

To run the application got to the client folder and run the following command:

```
npm run dev
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Server

`JWT_SECRET`
e.g. this_is_secret_123

`MONGODB_URI`
e.g. mongodb cluster URI

`STRIPE_SECRET`
e.g. Secret key from stripe dashboard

`NODE_ENV`
e.g. 'development' for local and 'production' for production

### Client

`VITE_API_URL`
e.g. http://localhost:3000/api or production deployed server link

`VITE_STRIPE_PUBLISHABLE_KEY`
e.g. Publishable key from stripe dashboard

`CLOUDINARY_ENV`
e.g Cloudinary environment string from your cloudinary dashboard

`CLOUDINARY_PRESET`
e.g. Cloudinary preset name from your cloudinary dashboard settings -> Uploads

### Tools used on this project

- Visual Studio Code
- Vite-JS template
- MongoDB compass
- Stripe Dashboard to monitor payments

<br />

## Contact

### Let's connect 🤝 <br />

[![linkedin](https://img.shields.io/badge/Zuhed_Shaikh-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zuhedshaikh95/)
[![GitHub](https://img.shields.io/badge/Zuhed_Shaikh-20232A?style=for-the-badge&logo=Github&logoColor=white)](https://github.com/zuhedshaikh95)

© 2023 Zuhed Shaikh

## Show your support

Give a ⭐️ if you like this project!
