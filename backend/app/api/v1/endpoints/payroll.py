from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.payroll import Payroll

router = APIRouter()


@router.get("/")
def list_payroll(db: Session = Depends(get_db)):
    return db.query(Payroll).all()


@router.post("/")
def create_payroll(payload: dict, db: Session = Depends(get_db)):
    payroll = Payroll(**payload)
    db.add(payroll)
    db.commit()
    db.refresh(payroll)
    return payroll


@router.get("/summary")
def payroll_summary(db: Session = Depends(get_db)):
    records = db.query(Payroll).all()
    total = sum(item.net_salary for item in records)
    return {"total_payroll": total, "records": len(records)}
