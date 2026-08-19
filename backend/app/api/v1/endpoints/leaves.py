from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.leave_request import LeaveRequest

router = APIRouter()


@router.get("/")
def list_leaves(db: Session = Depends(get_db)):
    return db.query(LeaveRequest).all()


@router.post("/")
def submit_leave(payload: dict, db: Session = Depends(get_db)):
    leave_request = LeaveRequest(**payload)
    db.add(leave_request)
    db.commit()
    db.refresh(leave_request)
    return leave_request


@router.put("/{leave_id}/status")
def update_leave_status(leave_id: int, payload: dict, db: Session = Depends(get_db)):
    leave_request = db.query(LeaveRequest).filter(LeaveRequest.id == leave_id).first()
    if not leave_request:
        raise HTTPException(status_code=404, detail="Leave request not found")
    leave_request.status = payload.get("status", leave_request.status)
    db.commit()
    return leave_request
