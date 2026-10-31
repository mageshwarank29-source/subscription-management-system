
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from backend.app.database import supabase

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


class CustomerCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None


@router.post("/")
def create_customer(customer: CustomerCreate):
    try:
        response = supabase.table("customers").insert(
            customer.model_dump(mode="json")
        ).execute()

        return {
            "success": True,
            "customer": response.data[0]
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/")
def get_customers():
    try:
        response = supabase.table("customers").select("*").execute()

        return {
            "success": True,
            "customers": response.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
