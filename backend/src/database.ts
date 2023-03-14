import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";

export const Collections: {
  Batteries?: mongoDB.Collection;
  BatteryVoltageReadings?: mongoDB.Collection;
} = {};

export async function connectToDatabase(): Promise<void> {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
  await client.connect();
        
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  Collections.Batteries = db.collection("Batteries");
  Collections.BatteryVoltageReadings = db.collection("BatteryVoltageReadings");
        
  console.log("MongoDB database connection established successfully");
}