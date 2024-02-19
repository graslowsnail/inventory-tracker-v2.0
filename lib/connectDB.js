import mongoose from 'mongoose';

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    return;
  }

  // use new database connection
  const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  connection.isConnected = db.connections[0].readyState;

  // log mongoDB queries
  mongoose.set('debug', true);
  console.log('CONNECTED TO MONGO 🌎 🗿 💶 ');
}

export default connectDb;

