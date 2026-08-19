from fastapi import APIRouter
import os
import httpx
from pydantic import BaseModel
from typing import Optional, List
from app.core.config import settings

router = APIRouter()

HR_KNOWLEDGE_BASE = """
You are the intelligent HR AI Assistant for HRSphere, a comprehensive workforce management platform.
You assist HR Managers, Administrators, and Employees with HR queries, policies, drafts, and guidance.

Company Policies & Handbook Summary:
1. Work Hours & Attendance:
   - Standard work hours: 9:00 AM to 6:00 PM, Monday to Friday.
   - Attendance tracking: Mark check-in/check-out daily via the HRSphere Attendance portal.
   - Grace period: 15 minutes. Late arrivals after 9:15 AM must be logged.
   - Work From Home (WFH): Allowed with prior manager approval (up to 2 days/week depending on role).
   - Shift changes: Must be requested at least 48 hours in advance.

2. Leave Policy:
   - Annual/Earned Leave: 20 days per calendar year (accrued monthly).
   - Casual Leave: 8 days per year for personal/urgent matters.
   - Sick Leave: 10 days per year (medical certificate required for >2 consecutive days).
   - Maternity Leave: 180 days (paid) for eligible female employees.
   - Paternity Leave: 15 days (paid).
   - Emergency Leave: Available for unforeseen critical family emergencies.
   - Application: Submit via the HRSphere Leave tab at least 7 days in advance for planned leave.

3. Compensation & Payroll:
   - Pay cycle: Monthly; credited on the last business day of every month.
   - Deductions: Income tax (TDS), Provident Fund (PF - 12%), and applicable health insurance contributions.
   - Performance Bonus: Reviewed annually and paid out in Q1.
   - Payslips: Available for download on the Payroll module.

4. Onboarding Process:
   - Day 1: HR orientation, IT asset handover, and document verification.
   - Days 2-3: Department introductions and initial setup.
   - Week 1: Core system access, buddy assignment, process walk-through.
   - Weeks 2-4: Role-specific training, mentor check-ins.
   - Probation period: 90 days with monthly milestone reviews before confirmation.

5. Benefits & Wellness:
   - Comprehensive health insurance covering employee, spouse, and dependent children.
   - Dental and vision coverage.
   - Gym & wellness reimbursement up to 3,000 INR / month.
   - Employee Assistance Program (EAP) for mental health & counseling.
   - Annual learning & development allowance.

6. Performance Management:
   - Quarterly check-ins with reporting managers.
   - Annual 360-degree feedback reviews.
   - Promotions evaluated on merit and minimum 1 year in current role.

Instructions for your responses:
- Be professional, empathetic, clear, and concise.
- Structure answers nicely using bullet points, bold headings, and clear formatting.
- If asked to draft a message (such as a leave application, resignation email, appraisal response, or welcome note), produce a polished, ready-to-use template.
- If a query is outside HRSphere HR scope, provide standard HR best-practice guidance.
"""

class ChatMessage(BaseModel):
    role: str
    content: str

class AskRequest(BaseModel):
    question: str
    history: Optional[List[ChatMessage]] = None
    category: Optional[str] = "general"

@router.post("/ask")
async def ask_ai(request: AskRequest):
    api_key = settings.OPENAI_API_KEY or os.getenv("OPENAI_API_KEY", "")
    question = request.question.strip()
    
    if not question:
        return {"error": "Question is empty", "answer": "Please provide a question."}

    # Build messages array
    messages = [
        {"role": "system", "content": HR_KNOWLEDGE_BASE}
    ]
    
    if request.history:
        for msg in request.history[-6:]:
            if msg.role in ("user", "assistant"):
                messages.append({"role": msg.role, "content": msg.content})
                
    messages.append({"role": "user", "content": question})

    # Available models to try in order of preference
    models_to_try = [
        "openai/gpt-oss-120b",
        "openai/gpt-oss-20b",
        "qwen/qwen3.6-27b",
        "groq/compound"
    ]
    
    if api_key:
        for model_name in models_to_try:
            try:
                async with httpx.AsyncClient(timeout=30.0) as client:
                    response = await client.post(
                        "https://api.groq.com/openai/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {api_key}",
                            "Content-Type": "application/json"
                        },
                        json={
                            "model": model_name,
                            "messages": messages,
                            "temperature": 0.6,
                            "max_tokens": 800
                        }
                    )
                    
                    if response.status_code == 200:
                        data = response.json()
                        answer = data["choices"][0]["message"]["content"]
                        return {
                            "answer": answer,
                            "source": "HRSphere AI (Groq)",
                            "model": model_name,
                            "status": "success"
                        }
            except Exception:
                continue

    # Intelligent fallback if API is unreachable or key is not set
    q_lower = question.lower()
    fallback_answer = ""
    
    if "leave" in q_lower or "casual" in q_lower or "sick" in q_lower or "vacation" in q_lower:
        fallback_answer = (
            "### 🏖️ HRSphere Leave Policy Summary\n\n"
            "- **Annual Leave:** 20 days per year (accrued monthly)\n"
            "- **Casual Leave:** 8 days per year for personal/urgent matters\n"
            "- **Sick Leave:** 10 days per year (medical certificate required for >2 days)\n"
            "- **Maternity / Paternity:** 180 days paid (Maternity) / 15 days paid (Paternity)\n\n"
            "**How to apply:** Navigate to the **Leave** module in the sidebar, click `+ Apply Leave`, select your leave type, dates, and reason, then submit for manager approval."
        )
    elif "work hours" in q_lower or "time" in q_lower or "attendance" in q_lower or "check in" in q_lower:
        fallback_answer = (
            "### 🕘 Attendance & Work Hours Policy\n\n"
            "- **Standard Hours:** 9:00 AM to 6:00 PM, Monday through Friday.\n"
            "- **Grace Period:** 15 minutes (check-in before 9:15 AM is on time).\n"
            "- **Work From Home:** Up to 2 days/week with manager approval.\n"
            "- **Daily Marking:** Check in and Check out daily on the **Attendance** page."
        )
    elif "pay" in q_lower or "salary" in q_lower or "deduction" in q_lower or "pf" in q_lower:
        fallback_answer = (
            "### 💰 Compensation & Payroll Guidelines\n\n"
            "- **Payout Date:** Salary is credited on the last business day of each month.\n"
            "- **Deductions:** Standard deductions include Provident Fund (PF - 12%), Professional Tax, and Income Tax (TDS).\n"
            "- **Payslips:** Accessible and downloadable anytime from the **Payroll** tab."
        )
    elif "onboard" in q_lower or "new hire" in q_lower or "probation" in q_lower:
        fallback_answer = (
            "### 📋 New Employee Onboarding Roadmap\n\n"
            "- **Day 1:** HR documentation, welcome kit, and IT account setup.\n"
            "- **Days 2-3:** Team orientation and buddy introduction.\n"
            "- **Week 1:** Systems training and access configuration.\n"
            "- **Probation:** 90-day evaluation cycle with monthly progress reviews."
        )
    elif "benefit" in q_lower or "insurance" in q_lower or "health" in q_lower:
        fallback_answer = (
            "### 🏥 Employee Benefits & Wellness\n\n"
            "- **Health Insurance:** Complete medical cover for employee, spouse, and kids.\n"
            "- **Wellness Allowance:** Up to ₹3,000 / month gym & wellness subsidy.\n"
            "- **Mental Health Support:** Free access to 24/7 counseling via EAP.\n"
            "- **Learning Budget:** Annual allowance for professional certifications."
        )
    else:
        fallback_answer = (
            f"### 🤖 HRSphere AI Assistant\n\n"
            f"Here is information regarding your inquiry: **\"{question}\"**\n\n"
            "HRSphere provides centralized tools for:\n"
            "- 👥 **Employee Management:** Directory, profiles, and team hierarchies\n"
            "- 🕘 **Attendance Tracking:** Real-time clock-in/clock-out\n"
            "- 🏖️ **Leave Management:** Applications, approvals, and balance tracking\n"
            "- 💰 **Payroll Management:** Salary slips, tax summaries, and deductions\n"
            "- 📋 **Onboarding:** Checklists and new hire readiness\n\n"
            "Feel free to ask specific questions about company policies, drafting emails, or HR procedures!"
        )

    return {
        "answer": fallback_answer,
        "source": "HRSphere Knowledge Base",
        "model": "rule-based-knowledge",
        "status": "fallback"
    }


@router.get("/insights")
def get_ai_insights():
    return {
        "status": "success",
        "insights": [
            {
                "id": 1,
                "title": "Attendance Health",
                "score": "92%",
                "trend": "positive",
                "summary": "Average monthly on-time arrival rate is strong at 92%. Peak arrival is between 8:50 AM - 9:05 AM."
            },
            {
                "id": 2,
                "title": "Leave Pattern Analysis",
                "score": "Optimal",
                "trend": "neutral",
                "summary": "Friday and Monday leave requests account for 45% of casual leaves. Team coverage remains balanced."
            },
            {
                "id": 3,
                "title": "Onboarding Velocity",
                "score": "95%",
                "trend": "positive",
                "summary": "New hires complete Day 1 checklist within 4.2 hours on average. 100% compliance on document verification."
            },
            {
                "id": 4,
                "title": "Workforce Recommendation",
                "score": "Action",
                "trend": "attention",
                "summary": "IT and Engineering teams have 3 open positions pending final round interviews this week."
            }
        ],
        "recommendation": "Maintain cross-functional staffing coverage on Fridays and review pending Q3 performance evaluations."
    }


@router.get("/suggestions")
def get_prompt_suggestions():
    return {
        "suggestions": [
            "What is the company leave policy and how many sick leaves do I get?",
            "How do I submit an attendance correction or WFH request?",
            "When is monthly payroll processed and how are PF deductions calculated?",
            "What are the steps in the 90-day onboarding probation checklist?",
            "Draft a professional email requesting 2 days of casual leave for personal reasons",
            "What health insurance and wellness benefits are provided to employees?"
        ]
    }

