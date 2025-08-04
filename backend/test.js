const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || '<paste-your-connection-URI-here>', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch(err => {
    console.error("❌ MongoDB connection error:", err);
});
