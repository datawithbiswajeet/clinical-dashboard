# backend/routers/executive.py
from fastapi import APIRouter
from database import get_connection

router = APIRouter(prefix="/exec", tags=["Executive Dashboard"])

# --- 1. Executive KPIs ---
# --- Executive KPIs (Main 4 metrics) ---
@router.get("/kpis")
def get_exec_kpis():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM public.v_exec_kpis;")
        result = cur.fetchone()
        cur.close()
        conn.close()

        if result is None:
            return {"error": "No data found in v_exec_kpis"}

        return {
            "total_unique_patients": result[0],
            "total_visits": result[1],
            "visit_completion_pct": float(result[2]) if result[2] is not None else 0,
            "visit_missed": result[3]
        }

    except Exception as e:
        return {"error": str(e)}


# --- 2. Enrollment Gauge ---
@router.get("/enrollment-gauge")
def get_exec_enrollment_gauge():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM v_exec_enrollment_gauge;")
    result = cur.fetchone()
    cur.close()
    conn.close()
    return {
        "total_enrolled": result[0],
        "total_target": result[1]
    }

# --- 3. Visit Status Donut ---
@router.get("/visit-status")
def get_exec_visit_status():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM v_exec_visitstatus_donut;")
    result = cur.fetchone()
    cur.close()
    conn.close()
    return {
        "completed": result[0],
        "missed": result[1],
        "rescheduled": result[2]
    }

# --- 4. Enrollment Trend ---
@router.get("/enrollment-trend")
def get_exec_enrollment_trend():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT month_name, monthly_enrollment FROM v_exec_enrollment_trend;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [{"month": r[0], "enrollment": r[1]} for r in rows]
