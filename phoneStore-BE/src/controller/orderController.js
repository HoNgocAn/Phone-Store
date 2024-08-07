
import { logPlugin } from "@babel/preset-env/lib/debug";
import db from "../models/index";

// Tạo đơn hàng mới
const handleCreateOrder = async (req, res) => {
    const { userId, cartItems, totalAmount } = req.body;

    // Bắt đầu giao dịch
    const transaction = await db.sequelize.transaction();

    try {
        // Tạo một đơn hàng mới trong giao dịch
        const newOrder = await db.Order.create({
            userId,
            totalAmount,
            status: "pending"
        }, { transaction });

        // Tạo chi tiết đơn hàng cho từng sản phẩm trong giao dịch
        await db.OrderDetail.bulkCreate(
            cartItems.map(item => ({
                orderId: newOrder.id,
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.quantity * item.price
            })),
            { transaction }
        );
        // Cập nhật số lượng tồn kho của sản phẩm trong giao dịch
        for (const item of cartItems) {
            await db.Product.update(
                { quantity: db.sequelize.literal(`quantity - ${item.quantity}`) },
                { where: { id: item.id }, transaction }
            );
        }

        // // Commit giao dịch nếu tất cả thao tác thành công
        await transaction.commit();
        res.status(201).json(newOrder);
    } catch (error) {
        // Rollback giao dịch nếu có lỗi xảy ra
        await transaction.rollback();
        res.status(500).json({ error: 'Failed to create order' });
    }
};

module.exports = {
    handleCreateOrder,
};