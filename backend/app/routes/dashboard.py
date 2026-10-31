
from fastapi import APIRouter, HTTPException
from backend.app.database import supabase

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats")
def get_dashboard_stats():
    try:
        # Fetch database records
        customers = supabase.table("customers").select("id").execute()

        plans = (
            supabase.table("plans")
            .select("id")
            .eq("is_active", True)
            .execute()
        )

        subscriptions = (
            supabase.table("subscriptions")
            .select("status")
            .execute()
        )

        payments = (
            supabase.table("payments")
            .select("amount, status")
            .execute()
        )

        # Calculate subscription statistics
        active_subscriptions = sum(
            1 for s in subscriptions.data
            if s["status"] == "active"
        )

        cancelled_subscriptions = sum(
            1 for s in subscriptions.data
            if s["status"] == "cancelled"
        )

        expired_subscriptions = sum(
            1 for s in subscriptions.data
            if s["status"] == "expired"
        )

        # Calculate payment statistics
        successful_payments = [
            p for p in payments.data
            if p["status"] == "successful"
        ]

        pending_payments = sum(
            1 for p in payments.data
            if p["status"] == "pending"
        )

        failed_payments = sum(
            1 for p in payments.data
            if p["status"] == "failed"
        )

        total_revenue = sum(
            float(p["amount"]) for p in successful_payments
        )

        return {
            "success": True,
            "total_customers": len(customers.data),
            "total_active_plans": len(plans.data),
            "total_subscriptions": len(subscriptions.data),
            "active_subscriptions": active_subscriptions,
            "cancelled_subscriptions": cancelled_subscriptions,
            "expired_subscriptions": expired_subscriptions,
            "successful_payments": len(successful_payments),
            "pending_payments": pending_payments,
            "failed_payments": failed_payments,
            "total_revenue": round(total_revenue, 2)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
