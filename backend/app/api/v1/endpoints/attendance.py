from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.attendance import Attendance

router = APIRouter()


@router.get("/")
def list_attendance(db: Session = Depends(get_db)):
    return db.query(Attendance).all()


@router.post("/")
def create_attendance(entry: dict, db: Session = Depends(get_db)):
    attendance = Attendance(**entry)
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance


@router.get("/summary")
def attendance_summary(db: Session = Depends(get_db)):
    employees = db.query(Attendance).count()
    return {"total_records": employees, "status": "ok"}
