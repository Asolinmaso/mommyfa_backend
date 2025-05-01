import mongoose from "mongoose"

// This function safely gets or creates a Mongoose model
export function getModel<T>(modelName: string, schema: mongoose.Schema) {
  // Check if mongoose is ready (we're on the server)
  if (mongoose.connection.readyState >= 1) {
    return mongoose.models[modelName] || mongoose.model<T>(modelName, schema)
  }

  // Return null or throw an error if trying to access on the client
  return null
}
