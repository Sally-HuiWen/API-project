// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

//remove this test-route
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

//my note: This route is designed to manage Cross-Site Request Forgery (CSRF) protection by generating and distributing a CSRF token both as a cookie and within a JSON response. 
//the client must include this CSRF token as request header in subsequent requests. got the value from cookie in dev tool or JSON response body;
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });

// All the URLs of the routes in the `api` router will be prefixed with `/api`.
router.use('/api', apiRouter);

module.exports = router;