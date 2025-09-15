import { EMAIL_CONFIG } from "./email-config";

export class EmailTemplates {
	static getWelcomeEmail(userData: any, options: any = {}) {
		return {
			subject: `Welcome to ${options.appName || 'Our App'}, ${userData.name}!`,
			templatePath: EMAIL_CONFIG.TEMPLATES.WELCOME,
			templateVariables: {
				userName: userData.name,
				userEmail: userData.email,
				registrationDate: new Date().toLocaleDateString(),
				activationLink: options.activationLink,
				appName: options.appName || 'Our App',
				supportEmail: options.supportEmail || 'support@yourapp.com',
				unsubscribeLink: options.unsubscribeLink
			}
		};
	}

	static getPasswordResetEmail(userData: any, resetToken: string, options: any = {}) {
		return {
			subject: 'Password Reset Request',
			html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>Hello ${userData.name},</p>
                    <p>We received a request to reset your password. Click the button below to create a new password:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${options.resetUrl}?token=${resetToken}"
                           style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px;
                                  text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Reset Password
                        </a>
                    </div>
                    <p>This link will expire in 24 hours for security reasons.</p>
                    <p>If you didn't request this password reset, please ignore this email.</p>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px;">
                        If the button doesn't work, copy and paste this link into your browser:<br>
                        <a href="${options.resetUrl}?token=${resetToken}">${options.resetUrl}?token=${resetToken}</a>
                    </p>
                </div>
            `
		};
	}

	static getOrderConfirmationEmail(orderData: any, options: any = {}) {
		const items = orderData.items.map((item: any) => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.price}</td>
            </tr>
        `).join('');

		return {
			subject: `Order Confirmation - #${orderData.orderNumber}`,
			html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333;">Order Confirmation</h2>
                    <p>Hello ${orderData.customerName},</p>
                    <p>Thank you for your order! Here are the details:</p>

                    <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3>Order #${orderData.orderNumber}</h3>
                        <p><strong>Date:</strong> ${new Date(orderData.orderDate).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> ${orderData.status}</p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <thead>
                            <tr style="background-color: #f5f5f5;">
                                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items}
                            <tr style="background-color: #f9f9f9; font-weight: bold;">
                                <td colspan="2" style="padding: 15px; text-align: right;">Total:</td>
                                <td style="padding: 15px; text-align: right;">${orderData.total}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style="background: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h4>Shipping Information:</h4>
                        <p>${orderData.shippingAddress}</p>
                        <p><strong>Estimated Delivery:</strong> ${orderData.estimatedDelivery}</p>
                    </div>

                    <p>We'll send you another email when your order ships.</p>
                    <p>Questions? Contact us at ${options.supportEmail || 'support@yourapp.com'}</p>
                </div>
            `
		};
	}

	static getInvoiceEmail(invoiceData: any) {
		return {
			subject: `Invoice #${invoiceData.invoiceNumber}`,
			templatePath: EMAIL_CONFIG.TEMPLATES.INVOICE,
			templateVariables: invoiceData,
			attachments: invoiceData.pdfPath ? [{
				filename: `invoice-${invoiceData.invoiceNumber}.pdf`,
				path: invoiceData.pdfPath,
				contentType: 'application/pdf'
			}] : []
		};
	}
}