// inside /api/apiRoutes.js <- this can be place anywhere and called anything
const router = require('express').Router();

// if the other routers are not nested inside /api then the paths would change
const postsRoutes = require('./posts/posts-routes.js');

// this file will only be used when the route begins with "/api"
// so we can remove that from the URLs, so "/api/users" becomes simply "/users"
router.use('/posts', postsRoutes);


// .. and any other endpoint related to the user's resource

// after the route has been fully configured, then we export it so it can be required where needed
module.exports = router; // standard convention dictates that this is the last line on the file