import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export class NodeMailer {
    async sendEmailToNewUsers(email: string, password: string) {

        const transporter = nodemailer.createTransport({
            host: "smtp.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            },
            tls: { ciphers: "SSLv3" }
        });

        await transporter.sendMail({
            text: `Usuário Cadastro Com Sucesso ✔`,
            subject: "Credenciais",
            from: "ENVIO DE CREDENCIAIS <viniciusPensadorREST@outlook.com>",
            html: `<p>-EQUIPE PENSADOR. Segue ao lado seus dados para login na plataforma:<strong> email: ${email} e senha: ${password}</strong></p>`,
            to: [`${email}`]
        });
    }
}