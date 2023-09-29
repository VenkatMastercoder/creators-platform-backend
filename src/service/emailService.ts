import nodemailer from "nodemailer";
import prisma from "../utils/prismaClient";

const EMAIL = process.env.TEST_EMAIL;
const PASSWORD = process.env.TEST_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    }
});

export const sendEmailService = async (email: string, productId: string) => {

    try {
        const attachment = await prisma.attachment.findUnique({
            where: {
                id: Number(productId),
            }
        });

        if (attachment != null) {
            const parsedData = JSON.parse(attachment.fileUrl);

            const attachmentUrl = parsedData[0].url as string;
            console.log(attachmentUrl);

            const info = await transporter.sendMail({
                from: '"Tharun Balaji" <tharunbalaji31@gmail.com>', 
                to: email, 
                subject: "CreatorCard.io - Your purchased digital product!", 
                html: `<div><h2>Thank you for purchasing!</h2><a href=${attachmentUrl}>Download here</a></div>`,
              });
        
            const response = { message: "Email sent successfully", attachmentUrl: attachmentUrl };
            return response;
        } else {
            throw new Error("Attachment not found");
        }
        
    } catch(error: any) {
        throw error;
    }
    
}
