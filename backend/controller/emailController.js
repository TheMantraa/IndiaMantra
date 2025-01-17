const emailTemplate = require("../utils/emailTemplate");
const transporter = require("../config/nodemailerConfig");
const exceljs = require("exceljs");
const path = require("path");

let emailList = [];

const contactUs = async (req, res) => {
  const { name, email, phone, comment } = req.body;

  if (!email || !comment) {
    return res.status(400).json({ message: "Email and Comment are required" });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "New Contact Form Submission",
      html: emailTemplate({ name, email, phone, comment }),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
};

const saveEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  emailList.push({ email, date: new Date().toISOString() });

  try {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Emails");

    worksheet.columns = [
      { header: "Email", key: "email", width: 30 },
      { header: "Date Submitted", key: "date", width: 30 },
    ];

    emailList.forEach((entry) => {
      worksheet.addRow(entry);
    });

    // Define the file path for the Excel file
    const filePath = path.join(__dirname, "emails.xlsx");
    await workbook.xlsx.writeFile(filePath);
    res.status(200).json({ message: "Email saved successfully to Excel" });
  } catch (error) {
    console.error("Error saving email:", error);
    res.status(500).json({ message: "Error saving email" });
  }
};

const downloadEmails = (req, res) => {
  const filePath = path.join(__dirname, "emails.xlsx");

  // Check if the file exists before sending
  res.download(filePath, "emails.xlsx", (err) => {
    if (err) {
      console.error("Error downloading the file:", err);
      res.status(500).send("Error generating the file.");
    }
  });
};

sendProductRecommendation = async (req, res) => {
  const { email, imgUrl, buyUrl } = req.body;

  if (!email || !imgUrl || !buyUrl) {
    return res.status(400).json({ error: "Email and imgUrl are required." });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `Your Perfect Tea `,
      html: `
        <div style="text-align: center;">
        <a
          href="${buyUrl}">
          <img 
            src="${imgUrl}" 
            alt="Matching Tea" 
            style="width: 100%; height: auto; display: block; margin: 0 auto;" 
          />
          </a>
        </div>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
};

module.exports = {
  contactUs,
  saveEmail,
  downloadEmails,
  sendProductRecommendation,
};
