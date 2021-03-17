const router = require('express').Router();
const AuthController = require('../../controllers/AuthController');

/**
   * @swagger
   * definitions:
   *   users:
   *     required:
   *       - id
   *       - username
   *       - email
   *     properties:
   *       id:
   *         type: integer
   *       username:
   *         type: string
   *       email:
   *         type: string
   */


/**
  * @swagger
  * /login:
  *   post:
  *     tags:
  *       - Auth
  *     produces:
  *       - application/json
  *     parameters:
  *     - name: body
  *       in: body
  *       description: the login credentials
  *       required: true
  *       schema:
  *         type: object
  *         required:
  *           - email
  *           - password
  *         properties:
  *           email:
  *             type: string
  *           password:
  *             type: string
  *     responses:
  *       200:
  *         description: user logged in succesfully
  */
router.post('/login', AuthController.login);


module.exports = router;
