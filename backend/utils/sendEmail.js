const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOrderStatusEmail = async (email, orderId, status) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order ${orderId} ${status}`,
    text: `Your order ${orderId} has been ${status}. Thank you for your purchase!`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order status email sent successfully');
  } catch (error) {
    console.error('Error sending order status email:', error);
    throw error;
  }
};
