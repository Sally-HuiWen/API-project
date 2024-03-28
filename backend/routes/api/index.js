// backend/routes/api/index.js
const router = require('express').Router();

// phase3: Test User Auth Middlewares-GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');


// phase3: TEstGET /api/restore-user
 const { restoreUser } = require('../../utils/auth.js')


//phase3: Test GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');

// router.post('/test', function(req, res) {
    // res.json({ requestBody: req.body });
  // });


// router.get('/set-token-cookie', async (_req, res) => {
  // const user = await User.findOne({
    // where: {
      // username: 'Demo-lition'
    // }
  // });
  // setTokenCookie(res, user);
  // return res.json({ user: user });
// });

router.use(restoreUser);

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );






module.exports = router;