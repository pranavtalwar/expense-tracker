import sgMail from "@sendgrid/mail"

const sendGridKey: string = process.env.SENDGRID_KEY as string
const adminEmail: string = process.env.ADMIN_EMAIL as string
const client_url: string = process.env.CLIENT_URL as string

sgMail.setApiKey(sendGridKey)

export const accountActivationEmail = (receiver: string, token: string) => {
    sgMail.send({
        to: receiver,
        from: adminEmail,
        subject: 'Thanks for registering with Expense-Tracker',
        html: `
            <h2>Please click on this link to activate your account: </h2>
            <p>${client_url}/activate/${token}</p> `
    })
}

export const welcomeEmail = (receiver: string, name: string) => {
    sgMail.send({
        to: receiver,
        from: 'talwar.pranav123@gmail.com',
        subject: 'Congratulations, you are a member of Expense-Tracker',
        text: `Welcome to the app, ${name}. Let me know how you find it.`
    })
}