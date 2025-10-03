# backend/routers/adherence.py
from fastapi import APIRouter, HTTPException, Query
from psycopg2.extras import RealDictCursor
from database import get_connection

router = APIRouter(prefix="/adherence", tags=["Patient Adherence"])

def run_query(sql: str, params: tuple = None):
    """Helper to run a SQL query and return list[dict]."""
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(sql, params or ())
            rows = cur.fetchall()
            return rows
    finally:
        conn.close()

# 1) Active patients KPI
@router.get("/active")
def get_active_patients():
    try:
        rows = run_query("SELECT * FROM v_pa_Active_Patient;")
        return rows[0] if rows else {"Total_Active_Patients": 0}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 2) Dropout rate KPI
@router.get("/dropout-rate")
def get_dropout_rate():
    try:
        rows = run_query("SELECT * FROM v_pa_dropout_rate;")
        return rows[0] if rows else {"dropout_rate": 0.0}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 3) Adherence rate (avg across patients)
@router.get("/adherence-rate")
def get_adherence_rate():
    try:
        rows = run_query("SELECT * FROM v_pa_adherence_rate;")
        return rows[0] if rows else {"adherence_rate": 0.0}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 4) Pending (Rescheduled) rate
@router.get("/pending-rate")
def get_pending_rate():
    try:
        rows = run_query("SELECT * FROM v_pa_pending_rate;")
        return rows[0] if rows else {"pending_rate": 0.0}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 5) Non-adherence rate (Missed + Rescheduled)
@router.get("/non-adherence-rate")
def get_non_adherence_rate():
    try:
        rows = run_query("SELECT * FROM v_pa_non_adherence_rate;")
        return rows[0] if rows else {"non_adherence_rate": 0.0}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6) Adherence categories (High/Medium/Low) - returns counts per category
@router.get("/categories")
def get_adherence_categories():
    try:
        rows = run_query("SELECT * FROM v_pa_adherence_category;")
        # view returns rows: {adherence_category, patient_count}
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 7) Dropout trend (month_name, dropout_percentage)
@router.get("/dropout-trend")
def get_dropout_trend():
    try:
        rows = run_query("SELECT * FROM v_pa_dropout_trend ORDER BY month_name;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 8) Patient detail table (paginated)

@router.get("/patient-details")
def get_patient_details(page: int = Query(1, ge=1), page_size: int = Query(50, ge=1, le=1000)):
    """
    Returns paginated patient adherence details.
    page (1-based), page_size (default 50).
    """
    try:
        offset = (page - 1) * page_size
        sql = f"""
            SELECT *
            FROM v_pa_patient_details_table
            ORDER BY adherence_rate DESC NULLS LAST
            LIMIT %s OFFSET %s;
        """
        rows = run_query(sql, (page_size, offset))
        # also return total count (use a separate lightweight query)
        count_row = run_query("SELECT COUNT(*) AS total_rows FROM (SELECT patientpk FROM v_pa_patient_details_table) t;")
        total_rows = count_row[0]["total_rows"] if count_row else 0
        return {
            "page": page,
            "page_size": page_size,
            "total_rows": total_rows,
            "data": rows
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 9) Combined KPIs endpoint (useful for single API call)
@router.get("/kpis")
def get_all_kpis():
    """
    Returns a combined JSON with the main KPIs to populate the top scorecards.
    """
    try:
        active = run_query("SELECT * FROM v_pa_Active_Patient;")
        dropout = run_query("SELECT * FROM v_pa_dropout_rate;")
        adherence = run_query("SELECT * FROM v_pa_adherence_rate;")
        non_ad = run_query("SELECT * FROM v_pa_non_adherence_rate;")
        pending = run_query("SELECT * FROM v_pa_pending_rate;")
        return {
            "active": active[0] if active else {"Total_Active_Patients": 0},
            "dropout_rate": dropout[0] if dropout else {"dropout_rate": 0.0},
            "adherence_rate": adherence[0] if adherence else {"adherence_rate": 0.0},
            "non_adherence_rate": non_ad[0] if non_ad else {"non_adherence_rate": 0.0},
            "pending_rate": pending[0] if pending else {"pending_rate": 0.0}
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 # Add these new endpoints to your existing adherence.py router

# 10) Site Adherence Distribution
@router.get("/site-adherence-distribution")
def site_adherence_distribution():
    try:
        rows = run_query("SELECT * FROM v_pa_site_adherence_distribution;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

