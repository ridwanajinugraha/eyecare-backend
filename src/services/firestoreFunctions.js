// firestoreFunctions.js
const { db } = require('../login/firebase');

async function createUser(userId, firstName, lastName, email) {
  await db.collection('users').doc(userId).set({
    name: {
      firstName: firstName,
      lastName: lastName
    },
    email: email
  });
}

async function addEyeHealthRecord(userId, symptoms, diagnosis) {
  const suggestions = diagnosis ? "Go to doctor" : "You are healthy";
  await db.collection('users').doc(userId).collection('eyeHealthRecords').add({
    symptoms: symptoms,
    diagnosis: diagnosis,
    suggestions: suggestions
  });
}

async function addNutritionRecommendation(userId, recommendations) {
  await db.collection('users').doc(userId).collection('nutritionRecommendations').add({
    recommendations: recommendations
  });
}

async function addEyeImage(userId, imageUrl, createdAt) {
  await db.collection('users').doc(userId).collection('eyeImages').add({
    imageUrl: imageUrl,
    createdAt: createdAt
  });
}

module.exports = { createUser, addEyeHealthRecord, addNutritionRecommendation, addEyeImage };
