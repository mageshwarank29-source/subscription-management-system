
from fastapi import APIRouter, HTTPException
from backend.app.database import supabase

router = APIRouter(prefix="/plans", tags=["Plans"])


@router.get("/")
def get_plans():
    try:
        response = supabase.table("plans").select("*").execute()

        return {
            "success": True,
            "count": len(response.data),
            "plans": response.data
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
