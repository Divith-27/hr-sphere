from fastapi import APIRouter

from app.api.v1.endpoints import auth, employees, attendance, leaves, payroll, onboarding, dashboard, ai_assistant

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(employees.router, prefix="/employees", tags=["employees"])
api_router.include_router(attendance.router, prefix="/attendance", tags=["attendance"])
api_router.include_router(leaves.router, prefix="/leaves", tags=["leaves"])
api_router.include_router(payroll.router, prefix="/payroll", tags=["payroll"])
api_router.include_router(onboarding.router, prefix="/onboarding", tags=["onboarding"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(ai_assistant.router, prefix="/ai", tags=["ai"])
