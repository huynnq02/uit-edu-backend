import Agenda from "agenda";
import mongoose from "mongoose";
import Otp from "../models/otp.js";

const mongoConnectionString = process.env.MONGO_URL;
const agenda = new Agenda({
  db: { address: mongoConnectionString, collection: "agendaJobs" },
});

// Define the OTP cleanup job
agenda.define("cleanupExpiredOTPs", async (job, done) => {
  try {
    const currentDateTime = new Date();
    const expiredOTPs = await Otp.find({ expiresAt: { $lt: currentDateTime } });

    for (const expiredOTP of expiredOTPs) {
      console.log(
        `Expired OTP removed: Email - ${expiredOTP.email}, Code - ${expiredOTP.otp}`
      );
      await expiredOTP.remove();
    }

    done();
  } catch (error) {
    console.error("Error removing expired OTPs:", error.message);
    done(error);
  }
});

// Connect to MongoDB and start the Agenda scheduler
(async () => {
  await agenda.start();
  console.log("Agenda scheduler started");
  agenda.every("1 second", "cleanupExpiredOTPs");
})();
