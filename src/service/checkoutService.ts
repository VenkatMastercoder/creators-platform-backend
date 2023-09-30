import nodemailer from "nodemailer";
import prisma from "../utils/prismaClient";
import { Prisma } from "@prisma/client";

const EMAIL = process.env.TEST_EMAIL;
const PASSWORD = process.env.TEST_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    }
});

export const sendEmailService = async (name: string, email: string, productId: string) => {

    try {
        
        const digitalProduct = await prisma.digitProducts.findUnique({
            where: {
                id: Number(productId)
            },
            select: {
                attachments: true
            }
        });

        if (digitalProduct != null) {
            const attachment = digitalProduct.attachments;

            const parsedData = JSON.parse(attachment[0].fileUrl);

            const attachmentUrl = parsedData[0].url as string;
            console.log(attachmentUrl);

            const info = await transporter.sendMail({
                from: '"Tharun Balaji" <tharunbalaji31@gmail.com>', 
                to: email, 
                subject: "CreatorCard.io - Thank you for purachasing!", 
                html: `<div><p>Hello ${name},</p><p>Get your purchased digital product here: <a href=${attachmentUrl}>Download here</a></p></div>`,
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
