const {postPredictHandler, getPredictHistoriesHandler, } = require("../server/handler");
const { registerUser, loginUser } = require('../login/authFunctions');
const { createUser, addEyeHealthRecord, addNutritionRecommendation, addEyeImage } = require('../services/firestoreFunctions');


const routes = [
    {
        method: 'POST',
        path: '/register',
        handler: async (request, h) => {
            const { email, password, firstName, lastName } = request.payload;
            const user = await registerUser(email, password, firstName, lastName);
            await createUser(user.uid, firstName, lastName, email);
            return h.response({ message: 'User registered successfully', user }).code(201);
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
            const { email, password } = request.payload;
            const user = await loginUser(email, password);
            return h.response({ message: 'User logged in successfully', user }).code(200);
        }
    },
    {
        method: 'POST',
        path: '/users/{userId}/eyeHealthRecords',
        handler: async (request, h) => {
            const { userId } = request.params;
            const { symptoms, diagnosis } = request.payload;
            await addEyeHealthRecord(userId, symptoms, diagnosis);
            return h.response({ message: 'Eye health record added successfully' }).code(201);
        }
    },
    {
        method: 'POST',
        path: '/users/{userId}/nutritionRecommendations',
        handler: async (request, h) => {
            const { userId } = request.params;
            const { recommendations } = request.payload;
            await addNutritionRecommendation(userId, recommendations);
            return h.response({ message: 'Nutrition recommendation added successfully' }).code(201);
        }
    },
    {
        method: 'POST',
        path: '/users/{userId}/eyeImages',
        handler: async (request, h) => {
            const { userId } = request.params;
            const { imageUrl, createdAt } = request.payload;
            await addEyeImage(userId, imageUrl, createdAt);
            return h.response({ message: 'Eye image added successfully' }).code(201);
        }
    },
    {
      path: "/predict",
      method: "POST",
      handler: postPredictHandler,
      options: {
          payload: {
              allow: "multipart/form-data",
              maxBytes: 1000000,
              multipart: true,
          },
      },
  },
  {
      path: "/predict/histories",
      method: "GET",
      handler: getPredictHistoriesHandler,
  },
];

module.exports = routes;