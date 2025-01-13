const emailTemplate = ({ name, email, phone, comment }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: auto; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://themantra.ca/cdn/shop/files/Logo_website.png?v=1727770096&width=140" alt="Mantra Logo" style="width: 150px; margin-bottom: 10px;" />
      <h2 style="color: #2B2C2D; font-size: 24px; margin-bottom: 0;">Welcome to Mantra</h2>
    </div>
    <p style="font-size: 16px;">Hi <strong>${
      name || "Valued Customer"
    }</strong>,</p>
    <p style="font-size: 16px;">
      Thank you for reaching out to us at <strong>Mantra</strong>. We're excited to connect with you and have received your query. Here are the details you shared:
    </p>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; border: 1px solid #eaeaea;"><strong>Name</strong></td>
        <td style="padding: 10px; border: 1px solid #eaeaea;">${
          name || "N/A"
        }</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #eaeaea;"><strong>Email</strong></td>
        <td style="padding: 10px; border: 1px solid #eaeaea;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #eaeaea;"><strong>Phone</strong></td>
        <td style="padding: 10px; border: 1px solid #eaeaea;">${
          phone || "N/A"
        }</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #eaeaea;"><strong>Comment</strong></td>
        <td style="padding: 10px; border: 1px solid #eaeaea;">${comment}</td>
      </tr>
    </table>
    <p style="font-size: 16px;">
      Your query has been successfully saved in our system. A member of our team will review your request and get back to you as soon as possible. 
    </p>
    <p style="font-size: 16px;">
      If you have any urgent concerns, feel free to reply to this email or contact us directly at <a href="mailto:support@mantra.com" style="color: #007BFF;">support@mantra.com</a>.
    </p>
    <p style="font-size: 16px;">We look forward to assisting you!</p>
    <p style="font-size: 16px; margin-top: 20px;">Best Regards,</p>
    <p style="font-size: 16px; font-weight: bold; color: #2B2C2D;">The Mantra Team</p>
    <hr style="border-top: 1px solid #eaeaea; margin: 20px 0;">
    <p style="font-size: 12px; color: #777; text-align: center;">
      You are receiving this email because you submitted a query to Mantra. If you did not do this, please contact us immediately.
    </p>
  </div>
`;

module.exports = emailTemplate;
