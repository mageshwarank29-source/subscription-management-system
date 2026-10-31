
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timezone
from backend.app.database import supabase

router = APIRouter(
    prefix="/subscriptions",
    tags=["Subscriptions"]
)


class SubscriptionCreate(BaseModel):
    customer_id: str
    plan_id: str


@router.post("/")
def create_subscription(subscription: SubscriptionCreate):
    try:
        data = {
            "customer_id": subscription.customer_id,
            "plan_id": subscription.plan_id,
            "status": "active",
            "start_date": datetime.now(timezone.utc).isoformat()
        }

        response = (
            supabase.table("subscriptions")
            .insert(data)
            .execute()
        )

        return {
            "success": True,
            "subscription": response.data[0]
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/")
def get_subscriptions():
    try:
        response = (
            supabase.table("subscriptions")
            .select("*")
            .execute()
        )

        return {
            "success": True,
            "subscriptions": response.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/{subscription_id}/cancel")
def cancel_subscription(subscription_id: str):
    try:
        existing = (
            supabase.table("subscriptions")
            .select("*")
            .eq("id", subscription_id)
            .execute()
        )

        if not existing.data:
            raise HTTPException(
                status_code=404,
                detail="Subscription not found"
            )

        if existing.data[0]["status"] == "cancelled":
            raise HTTPException(
                status_code=400,
                detail="Subscription is already cancelled"
            )

        response = (
            supabase.table("subscriptions")
            .update({
                "status": "cancelled",
                "end_date": datetime.now(timezone.utc).isoformat()
            })
            .eq("id", subscription_id)
            .execute()
        )

        return {
            "success": True,
            "message": "Subscription cancelled successfully",
            "subscription": response.data[0]
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
