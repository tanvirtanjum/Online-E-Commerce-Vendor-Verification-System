// <-- Importing System Library Modules -->
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')

// <-- IMPORTING ROUTES -->
const access  = require("./routes/access.route");
const businesses = require("./routes/businesses.route");
const business_types = require("./routes/chats.route");
const chats = require("./routes/chats.route");
const consumers = require("./routes/consumers.route");
const documents = require("./routes/documents.route");
const downloads = require("./routes/downloads.route");
const emergency_support_officers = require("./routes/emergency_support_officers.route");
const logins = require("./routes/logins.route");
const polices = require("./routes/polices.route");
const roles = require("./routes/roles.route");
const verification_status = require("./routes/verification_status.route");

// <---> 
dotenv.config();

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', 1);
app.use(cors());

// <-- ROUTES -->
app.use('/api/access', access);
app.use('/api/businesses', businesses);
app.use('/api/business_types', business_types);
app.use('/api/chats', chats);
app.use('/api/consumers', consumers);
app.use('/api/documents', documents);
app.use('/api/downloads', downloads);
app.use('/api/emergency_support_officers', emergency_support_officers);
app.use('/api/logins', logins);
app.use('/api/polices', polices);
app.use('/api/roles', roles);
app.use('/api/verification_status', verification_status);


// <-- -->
app.listen(process.env.SERVER_PORT_NO, () => {
  console.log("Server Started at Port: "+process.env.SERVER_PORT_NO);
});