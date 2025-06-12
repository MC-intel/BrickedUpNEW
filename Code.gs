function doGet(e) {
  // Set the recipient email address
  var recipientEmail = "contact@brickedupmasonrydemo.com";
  var subject = "New Message from Website Contact Form";
  var emailBody = e.parameter.body;

  // Check if emailBody parameter is provided
  if (!emailBody) {
    return ContentService.createTextOutput("Error: Email body is missing.")
                         .setMimeType(ContentService.MimeType.TEXT);
  }

  try {
    // Send the email
    MailApp.sendEmail(recipientEmail, subject, emailBody);

    // Return a success message
    return ContentService.createTextOutput("Email sent successfully to: " + recipientEmail)
                         .setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    // Return an error message if sending fails
    return ContentService.createTextOutput("Error: Could not send email. Details: " + error.message)
                         .setMimeType(ContentService.MimeType.TEXT);
  }
}
