from fastapi import FastAPI
from backend.app.routes.plans import router as plans_router
from backend.app.routes.customers import router as customers_router
from backend.app.routes.subscriptions import router as subscriptions_router
from backend.app.routes.payments import router as payments_router

app = FastAPI(
    title="Brightloop API",
    description="Subscription Management Platform",
    version="1.0.0"
    )
app.include_router(plans_router)
app.include_router(customers_router)
app.include_router(subscriptions_router)
app.include_router(payments_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Brightloop!",
        "status": "Backend running successfully"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
