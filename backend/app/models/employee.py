from datetime import date

from sqlalchemy import Column, Date, Integer, String

from app.db.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    department = Column(String, nullable=False)
    designation = Column(String, nullable=False)
    employment_type = Column(String, default="full_time", nullable=False)
    status = Column(String, default="active", nullable=False)
    joining_date = Column(Date, default=date.today)
