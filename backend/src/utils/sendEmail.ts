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
            <p>${client_url}/activation-step-two/${token}</p> `
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

export const passwordLostEmail = (receiver: string, token: string) => {
    sgMail.send({
        to: receiver,
        from: adminEmail,
        subject: 'Password Recovery',
        html: `
            <h2>Please click on this link to reset your password: </h2>
            <p>${client_url}/password-recovery/${token}</p> `
    })
}

export const passwordChangedEmail = (receiver: string) => {
    sgMail.send({
        to: receiver,
        from: adminEmail,
        subject: 'Password Changed',
        html: `
            <h2>Your password has been recently changed</h2>`
    })
}