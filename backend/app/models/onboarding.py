from datetime import date

from sqlalchemy import Boolean, Column, Date, Integer, String, Text

from app.db.database import Base


class Onboarding(Base):
    __tablename__ = "onboarding"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    onboarding_stage = Column(String, nullable=False)
    documents_submitted = Column(Boolean, default=False)
    joining_date = Column(Date, default=date.today)
    notes = Column(Text, nullable=True)
    status = Column(String, default="in_progress", nullable=False)
