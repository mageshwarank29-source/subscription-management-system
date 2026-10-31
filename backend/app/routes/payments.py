
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from backend.app.database import supabase

router = APIRouter(prefix="/payments", tags=["Payments"])


class PaymentCreate(BaseModel):
    subscription_id: str
    amount: float = Field(gt=0)
    payment_reference: str


class PaymentStatusUpdate(BaseModel):
    status: str


@router.post("/")
def create_payment(payment: PaymentCreate):
    try:
        data = {
            "subscription_id": payment.subscription_id,
            "amount": payment.amount,
            "payment_reference": payment.payment_reference,
            "status": "pending"
        }

        response = (
            supabase.table("payments")
            .insert(data)
            .execute()
        )

        return {
            "success": True,
            "payment": response.data[0]
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/")
def get_payments():
    try:
        response = (
            supabase.table("payments")
            .select("*")
            .execute()
        )

        return {
            "success": True,
            "payments": response.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/{payment_id}/status")
def update_payment_status(
    payment_id: str,
    update: PaymentStatusUpdate
):
    allowed_statuses = [
        "pending",
        "successful",
        "failed",
        "refunded"
    ]

    if update.status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid payment status"
        )

    try:
        response = (
            supabase.table("payments")
            .update({"status": update.status})
            .eq("id", payment_id)
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=404,
                detail="Payment not found"
            )

        return {
            "success": True,
            "payment": response.data[0]
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
