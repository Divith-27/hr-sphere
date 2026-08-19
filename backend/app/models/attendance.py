from datetime import date, datetime

from sqlalchemy import Column, Date, DateTime, Float, Integer, String

from app.db.database import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    attendance_date = Column(Date, default=date.today, nullable=False)
    check_in = Column(DateTime, nullable=True)
    check_out = Column(DateTime, nullable=True)
    status = Column(String, default="present", nullable=False)
    hours_worked = Column(Float, default=0.0)
