import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import mongoose from 'mongoose';
import catalogueRoutes from './routes/catalogueSubmissions.js';
import contactRoutes from './routes/contactSubmissions.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jeil_catalogue', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/catalogue', catalogueRoutes);
app.use('/api/contact-submissions', contactRoutes);

// Create global transporter for sending emails (reuse connection)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Gmail SMTP host
  port: 587, // Gmail SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'marcom.jeil@gmail.com', // Gmail address
    pass: 'tfyz nuej mhbf hmpd'  // Gmail app password
  },
  // Add timeout and connection settings for better performance
  connectionTimeout: 120000, // 120 seconds for large attachments
  greetingTimeout: 30000,   // 30 seconds
  socketTimeout: 120000,     // 120 seconds for large attachments
  pool: true,               // Use connection pooling
  maxConnections: 5,        // Maximum number of connections
  maxMessages: 100,         // Maximum messages per connection
  rateLimit: 5,             // Reduced rate limit for large attachments
  // Additional settings for large attachments
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter on startup
transporter.verify((error) => {
  if (error) {
    console.error('❌ SMTP transporter verification failed:', error);
  } else {
    console.log('✅ SMTP transporter is ready to send emails');
  }
});

// Contact form email endpoint
app.post('/api/contact', async (req, res) => {
  const startTime = Date.now();
  console.log('📧 Contact form submission started at:', new Date().toISOString());

  try {
    const { name, email, company, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    console.log('✅ Form validation completed in:', Date.now() - startTime, 'ms');

    // Get visitor IP
    const visitorIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'Unknown';

    // Prepare email content while saving to database
    const emailContent = {
      from: 'marcom.jeil@gmail.com',
      to: ["info@jeil.in", "nilesh@pelwrap.com"], // Send notifications to both your emails
      subject: `New Contact Form Submission: ${subject || 'Contact Request'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Name:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Email:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${email}</span>
            </div>
            
            ${company ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Company:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${company}</span>
            </div>
            ` : ''}
            
            ${subject ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Subject/Address:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${subject}</span>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Message:</strong>
              <div style="color: #6b7280; margin-top: 10px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          
          <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
            <p style="margin: 0; color: #991b1b; font-size: 14px;">
              <strong>Note:</strong> This email was sent from your website's contact form. 
              Please respond directly to ${email} to get in touch with the sender.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
            Sent from your website contact form on ${new Date().toLocaleString()}
          </div>
        </div>
      `
    };

    // Save submission to database and prepare email in parallel
    const dbStartTime = Date.now();
    const ContactSubmission = mongoose.model('ContactSubmission');
    const submission = new ContactSubmission({
      name,
      email,
      company,
      subject,
      message,
      visitorIP
    });

    await submission.save();
    console.log('💾 Database save completed in:', Date.now() - dbStartTime, 'ms');

    // Use global transporter (no need to create/verify each time)
    console.log('🔧 Using global transporter (connection already verified)');

    // Email content
    const mailOptions = emailContent;

    // Send email
    const emailStartTime = Date.now();
    console.log('📤 Starting email send...');

    await transporter.sendMail(mailOptions);

    console.log('📨 Email sent successfully in:', Date.now() - emailStartTime, 'ms');
    console.log('⏱️ Total request time:', Date.now() - startTime, 'ms');

    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    console.error('⏱️ Request failed after:', Date.now() - startTime, 'ms');
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response
    });

    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Download catalogue endpoint
app.post('/api/download-catalogue', async (req, res) => {
  const startTime = Date.now();
  console.log('📦 Catalogue download request started at:', new Date().toISOString());

  try {
    const { name, companyName, email, contactNumber, city, state, country, productName, url } = req.body;

    // Validate required fields
    if (!name || !companyName || !email || !contactNumber || !city || !state || !country) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    console.log('✅ Catalogue form validation completed in:', Date.now() - startTime, 'ms');

    // Get visitor IP
    const visitorIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'Unknown';

    // Save submission to database
    const dbStartTime = Date.now();
    const CatalogueSubmission = mongoose.model('CatalogueSubmission');
    const submission = new CatalogueSubmission({
      name,
      companyName,
      email,
      contactNumber,
      city,
      state,
      country,
      productName,
      url,
      visitorIP
    });

    await submission.save();
    console.log('💾 Catalogue database save completed in:', Date.now() - dbStartTime, 'ms');

    // Use global transporter
    console.log('🔧 Using global transporter for catalogue email');

    // Note: Using download link instead of attachment for faster email sending
    console.log('📎 Using download link instead of attachment for better performance');

    // Define the email content for the owner
    const ownerMailOptions = {
      from: 'marcom.jeil@gmail.com', // Use Gmail as sender
      to: ["info@jeil.in", "nilesh@pelwrap.com"], // Send notifications to both your emails
      subject: `Download Catalogue Request - ${productName} | J P Extrusiontech Private Limited`,
      html: `
        <div style="font-family: Arial, sans-serif; border: 2px dashed #000; padding: 20px; max-width: 600px; margin: auto; background-color: #F7F7F7;">
          
          <!-- Form Content -->
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Company Name:</td>
              <td style="padding: 8px;">${companyName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Contact No:</td>
              <td style="padding: 8px;">${contactNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">City:</td>
              <td style="padding: 8px;">${city}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">State:</td>
              <td style="padding: 8px;">${state}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Country:</td>
              <td style="padding: 8px;">${country}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">URL:</td>
              <td style="padding: 8px;"><a href="${url}" style="color: #0066cc; text-decoration: none;">${url}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Product:</td>
              <td style="padding: 8px;">${productName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Visitor IP:</td>
              <td style="padding: 8px;">${visitorIP}</td>
            </tr>
          </table>
        </div>
      `,
    };

    // Define the email content for the user (with download link instead of attachment for faster sending)
    const userMailOptions = {
      from: 'marcom.jeil@gmail.com', // Use Gmail as sender for consistency
      to: email, // User's email from the form
      subject: "Thank you for your interest | Jagannath Extrusion India Ltd.",
      html: `
        <div style="font-family: Arial, sans-serif; border: 2px dashed #000; padding: 20px; max-width: 600px; margin: auto;">
          
          <!-- Company Logo -->
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://jeil.in/assets/cropped-jeil-logo.png" 
                 alt="Jagannath Extrusion India Ltd." 
                 style="max-width: 200px; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h2 style="text-align: center; font-size: 24px; margin-bottom: 20px; color: #dc2626;">Thank you!</h2>
          
          <p style="margin-bottom: 15px;">Dear ${name},</p>
          
          <p style="margin-bottom: 5px;">Awesome!</p>
          <p style="margin-bottom: 15px;">Thank you for your interest in our packaging solutions.</p>
          
          <p style="margin-bottom: 15px;">Please click the link below to download your requested catalogue:</p>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="https://jeil.in/assets/Product%20Catalogue-PEPL-JEIL.pdf" 
               style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              📥 Download Product Catalogue
            </a>
          </div>
          
          <p style="margin-bottom: 5px;">Regards,</p>
          <p style="margin-bottom: 5px; font-weight: bold;">Jagannath Extrusion India Ltd.</p>
          
          <p style="margin-top: 30px; font-size: 12px; color: #666;">This is an auto generated email. PLEASE DO NOT REPLY directly to this email.</p>
        </div>
      `
      // Removed attachments to speed up email sending
    };

    // Send email to both the owner and the user
    const emailStartTime = Date.now();
    console.log('📤 Starting catalogue emails send...');

    // Send both emails in parallel (no large attachments now)
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log('📨 All catalogue emails sent successfully in:', Date.now() - emailStartTime, 'ms');
    console.log('⏱️ Total catalogue request time:', Date.now() - startTime, 'ms');

    res.status(200).json({
      success: true,
      message: "Request received. Your catalogue will be emailed shortly.",
      totalTime: Date.now() - startTime
    });

  } catch (error) {
    console.error('❌ Error sending catalogue email:', error);
    console.error('⏱️ Catalogue request failed after:', Date.now() - startTime, 'ms');
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response
    });

    res.status(500).json({
      success: false,
      message: 'Failed to send catalogue. Please try again later.'
    });
  }
});

// Request brochure endpoint (alternative to download-catalogue)
app.post('/api/request-brochure', async (req, res) => {
  const startTime = Date.now();
  console.log('📋 Brochure request started at:', new Date().toISOString());

  try {
    const { name, companyName, email, contactNumber, city, state, country, productName, url } = req.body;

    // Validate required fields
    if (!name || !companyName || !email || !contactNumber || !city || !state || !country) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    console.log('✅ Brochure form validation completed in:', Date.now() - startTime, 'ms');

    // Get visitor IP
    const visitorIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'Unknown';

    // Save submission to database
    const dbStartTime = Date.now();
    const CatalogueSubmission = mongoose.model('CatalogueSubmission');
    const submission = new CatalogueSubmission({
      name,
      companyName,
      email,
      contactNumber,
      city,
      state,
      country,
      productName,
      url,
      visitorIP
    });

    await submission.save();
    console.log('💾 Brochure database save completed in:', Date.now() - dbStartTime, 'ms');

    // Use global transporter
    console.log('🔧 Using global transporter for brochure email');

    // Note: Using download link instead of attachment for faster email sending
    console.log('📎 Using download link instead of attachment for better performance');

    // Define the email content for the owner
    const ownerMailOptions = {
      from: 'marcom.jeil@gmail.com', // Use Gmail as sender
      to: ["info@jeil.in", "nilesh@pelwrap.com"], // Send notifications to both your emails
      subject: `Brochure Request - ${productName} | J P Extrusiontech Private Limited`,
      html: `
        <div style="font-family: Arial, sans-serif; border: 2px dashed #000; padding: 20px; max-width: 600px; margin: auto; background-color: #F7F7F7;">
          
          <!-- Form Content -->
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Company Name:</td>
              <td style="padding: 8px;">${companyName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Contact No:</td>
              <td style="padding: 8px;">${contactNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">City:</td>
              <td style="padding: 8px;">${city}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">State:</td>
              <td style="padding: 8px;">${state}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Country:</td>
              <td style="padding: 8px;">${country}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">URL:</td>
              <td style="padding: 8px;"><a href="${url}" style="color: #0066cc; text-decoration: none;">${url}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Product:</td>
              <td style="padding: 8px;">${productName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Visitor IP:</td>
              <td style="padding: 8px;">${visitorIP}</td>
            </tr>
          </table>
        </div>
      `,
    };

    // Define the email content for the user (with download link instead of attachment for faster sending)
    const userMailOptions = {
      from: 'pelwrap.media@gmail.com', // Use Gmail as sender for consistency
      to: email, // User's email from the form
      subject: "Thank you for your interest | J P Extrusiontech Private Limited",
      html: `
        <div style="font-family: Arial, sans-serif; border: 2px dashed #000; padding: 20px; max-width: 600px; margin: auto;">
          
          <!-- Company Logo -->
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://jeil.in/assets/cropped-PEL-NEW-LOGO-FINAL.png" 
                 alt="J P Extrusiontech Private Limited" 
                 style="max-width: 200px; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h2 style="text-align: center; font-size: 24px; margin-bottom: 20px; color: #1e40af;">Thank you!</h2>
          
          <p style="margin-bottom: 15px;">Dear ${name},</p>
          
          <p style="margin-bottom: 5px;">Excellent!</p>
          <p style="margin-bottom: 15px;">Thank you for your interest in our innovative packaging solutions.</p>
          
          <p style="margin-bottom: 15px;">Please click the link below to download your requested brochure:</p>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="https://jeil.in/assets/Product%20Catalogue-PEPL-JEIL.pdf" 
               style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              📥 Download Product Brochure
            </a>
          </div>
          
          <p style="margin-bottom: 5px;">Best regards,</p>
          <p style="margin-bottom: 5px; font-weight: bold;">J P Extrusiontech Private Limited</p>
          
          <p style="margin-top: 30px; font-size: 12px; color: #666;">This is an auto generated email. PLEASE DO NOT REPLY directly to this email.</p>
        </div>
      `
      // Removed attachments to speed up email sending
    };

    // Send email to both the owner and the user
    const emailStartTime = Date.now();
    console.log('📤 Starting brochure emails send...');

    // Send both emails in parallel (no large attachments now)
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log('📨 All brochure emails sent successfully in:', Date.now() - emailStartTime, 'ms');
    console.log('⏱️ Total brochure request time:', Date.now() - startTime, 'ms');

    res.status(200).json({
      success: true,
      message: "Request received. Your brochure will be emailed shortly.",
      totalTime: Date.now() - startTime
    });

  } catch (error) {
    console.error('❌ Error sending brochure email:', error);
    console.error('⏱️ Brochure request failed after:', Date.now() - startTime, 'ms');
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response
    });

    res.status(500).json({
      success: false,
      message: 'Failed to send brochure. Please try again later.'
    });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: 'This is an API server. Use the React dev server for the frontend.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Contact API available at: http://localhost:${PORT}/api/contact`);
});

