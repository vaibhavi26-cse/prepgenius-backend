const sendEmail = async ({ to, subject, html }) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "PrepGenius",
        email: "prepgenius.noreply@gmail.com",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Brevo email error:", data);
    throw new Error(data.message || "Failed to send email");
  }

  return data;
};

export default sendEmail;