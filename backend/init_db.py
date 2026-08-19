#!/usr/bin/env python3
"""Initialize the database with tables and sample data."""

from app.db.database import Base, engine
from app.models.user import User
from app.models.employee import Employee
from app.models.attendance import Attendance
from app.models.leave_request import LeaveRequest
from app.models.payroll import Payroll
from app.models.onboarding import Onboarding

def init_db():
    """Create all tables in the database."""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("[OK] Database tables created successfully!")

if __name__ == "__main__":
    init_db()
