from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.attendance import Attendance
from app.models.employee import Employee
from app.models.leave_request import LeaveRequest
from app.models.payroll import Payroll

router = APIRouter()


@router.get("/")
def dashboard_summary(db: Session = Depends(get_db)):
    employee_count = db.query(Employee).count()
    attendance_count = db.query(Attendance).count()
    leave_count = db.query(LeaveRequest).count()
    payroll_count = db.query(Payroll).count()

    return {
        "employee_count": employee_count,
        "attendance_count": attendance_count,
        "leave_count": leave_count,
        "payroll_count": payroll_count,
        "summary": "HRSphere dashboard ready",
    }
