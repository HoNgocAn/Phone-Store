import paypal from '@paypal/checkout-server-sdk';
import db from "../models/index";

const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);

const handlePayPal = async (req, res) => {
    const { userId, cart, totalAmount } = req.body;

    // Kiểm tra tổng số tiền
    if (!totalAmount) {
        return res.status(400).json({ message: 'Total amount is required' });
    }

    const transaction = await db.sequelize.transaction();

    try {

        // Tạo đơn hàng
        const newOrder = await db.Order.create({
            userId,
            totalAmount,
            status: "successfully"
        }, { transaction });

        // Tạo chi tiết đơn hàng
        await db.OrderDetail.bulkCreate(
            cart.map(item => ({
                orderId: newOrder.id,
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.quantity * item.price
            })),
            { transaction }
        );

        // Cập nhật số lượng tồn kho
        for (const item of cart) {
            await db.Product.update(
                { quantity: db.sequelize.literal(`quantity - ${item.quantity}`) },
                { where: { id: item.id }, transaction }
            );
        }

        await transaction.commit();

        // Tạo đơn hàng PayPal
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: totalAmount
                }
            }],
            application_context: {
                return_url: "http://localhost:3000/",
                cancel_url: "http://localhost:3000/check-out"
            }
        });

        const order = await client.execute(request);
        console.log('PayPal payment created successfully:', order);

        // Trả về ID của đơn hàng PayPal
        res.json({
            id: order.result.id,
            totalAmount: totalAmount
        });
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        res.status(500).json({
            message: 'Error creating PayPal payment',
            error: error.message
        });
    }
};

const handleCaptureOrder = async (req, res) => {
    const { orderID } = req.body;
    // Kiểm tra orderID
    if (!orderID) {
        return res.status(400).json({ message: 'Order ID is required' });
    }

    try {
        // Tạo một request để capture order với PayPal
        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});

        const capture = await client.execute(request);

        // Trả về kết quả sau khi thanh toán thành công
        res.json(capture.result);
    } catch (error) {
        console.error('Capture Order Error:', error);
        res.status(500).json({
            message: 'Error capturing order',
            error: error.message
        });
    }
};

module.exports = {
    handlePayPal, handleCaptureOrder
};