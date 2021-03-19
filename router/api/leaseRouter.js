const router = require('express').Router();
const leaseController = require('../../controllers/leaseController');
const auth = require('../../utils/auth');
/**
   * @swagger
   * definitions:
   *   lease:
   *     required:
   *       - startDate
   *       - endDate
   *       - frequency
   *       - weeklyRent
   *       - timezone
   *     properties:
   *       startDate:
   *         type: string
   *         example: 2021-03-16T00:00:00Z
   *       endDate:
   *         type: string
   *         example: 2021-05-26T00:00:00Z
   *       frequency:
   *         type: string
   *         example: WEEKLY | FORTNIGHTLY | MONTHLY 
   *       weeklyRent:
   *         type: number
   *         example: 9000
   *       timezone:
   *         type: string
   *         example: Australia/Victoria
   */


/**
 * @swagger
 * /lease:
 *   get:
 *     tags:
 *       - Lease
 *     description: Generate ledger on given data
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: startDate
 *        description: Start date of the ledger
 *        in: query
 *        required: true
 *        type: string
 *        format: date-time
 *        example: 2021-03-16T01:38:39Z
 *      - name: endDate
 *        description: End date of the ledger
 *        in: query
 *        required: true
 *        type: string
 *        format: date-time
 *        example: 2021-03-30T01:38:39Z
 *      - name: frequency
 *        description: Payment frequency of the ledger
 *        in: query
 *        required: true
 *        type: string
 *        example: WEEKLY | FORTNIGHTLY | MONTHLY 
 *      - name: weeklyRent
 *        description: weekly amount of the ledger
 *        in: query
 *        required: true
 *        type: number
 *        example: 1100
 *      - name: timezone
 *        description: Timezone of the property
 *        in: query
 *        required: true
 *        type: string
 *        example: Australia/Victoria
 *     responses:
 *       200:
 *         description: a single user object
 *         schema:
 *           $ref: '#/definitions/lease'
 */
router.get(
   '/:startDate?:endDate?:frequency?:weeklyRent?:timezone?',
   auth.isAuthunticated,
   leaseController.generateLedger
);


module.exports = router;
