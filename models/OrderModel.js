import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    {

        user_detail: {
            type: String,
        },
        purchase_item: [{

        }],
        order_id: {
            type: String
        },

        order_status: {
            type: String,
            default: 'pending',
        },
        total_item: {
            type: String,
            default: 0
        },
        total_price: {
            type: String,
            default: 0
        },
        payment_details: {
            payment_id:{
                type:String,
            },
            payment_status:{
                type:String,
                default: 'pending', 
            }
        }
    },

    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
