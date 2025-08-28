import { ParkController } from "@/controllers";
import { parkValidations } from "@/validations";
import { Router } from "express";

const parkRouter = Router();

/**
 * @swagger
 * /parks/add:
 *   post:
 *     summary: Add a new park
 *     tags: [Parks]
 *     description: Create a new park with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - park_Id
 *               - park_english_name
 *               - park_arabic_name
 *               - image
 *               - latitude
 *               - longitude
 *             properties:
 *               park_Id:
 *                 type: string
 *                 description: Unique park identifier
 *                 example: "PARK001"
 *               park_english_name:
 *                 type: string
 *                 description: Park name in English
 *                 example: "Central Park"
 *               park_arabic_name:
 *                 type: string
 *                 description: Park name in Arabic
 *                 example: "الحديقة المركزية"
 *               image:
 *                 type: string
 *                 description: Park image URL or path
 *                 example: "park_image.jpg"
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Park latitude coordinate
 *                 example: 25.3314
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Park longitude coordinate
 *                 example: 56.3419
 *     responses:
 *       201:
 *         description: Park created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Park'
 *       400:
 *         description: Bad request - validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
parkRouter.post('/add', parkValidations, ParkController.addPark)

/**
 * @swagger
 * /parks/get:
 *   get:
 *     summary: Get all parks
 *     tags: [Parks]
 *     description: Retrieve a list of all parks in the system
 *     responses:
 *       200:
 *         description: List of parks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Park'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
parkRouter.get('/get', ParkController.viewParks)

export default parkRouter;