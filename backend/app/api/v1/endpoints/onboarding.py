from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.onboarding import Onboarding

router = APIRouter()


@router.get("/")
def list_onboarding(db: Session = Depends(get_db)):
    return db.query(Onboarding).all()


@router.post("/")
def create_onboarding(payload: dict, db: Session = Depends(get_db)):
    onboarding = Onboarding(**payload)
    db.add(onboarding)
    db.commit()
    db.refresh(onboarding)
    return onboarding


@router.put("/{onboarding_id}/status")
def update_onboarding_status(onboarding_id: int, payload: dict, db: Session = Depends(get_db)):
    item = db.query(Onboarding).filter(Onboarding.id == onboarding_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Onboarding record not found")
    item.status = payload.get("status", item.status)
    db.commit()
    return item
