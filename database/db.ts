import mongoose from "mongoose";

/**
 * 0 = disconnectd
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log("[mongodb] already connected");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log("[mongodb] Using latest connection");
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URI as string);
  mongoConnection.isConnected = 1;
  console.log("[mongodb] MongoDB connected");
};

export const disconnect = async () => {
    if ( mongoConnection.isConnected !== 0 ) return;

    await mongoose.disconnect();
    console.log('[mongodb] Disconnected from mongodb')
};
