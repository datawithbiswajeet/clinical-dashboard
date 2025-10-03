# backend/routers/sitenalysis.py
from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor
from database import get_connection

router = APIRouter(prefix="/siteanalysis", tags=["Site Analysis"])

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

# 1) Total Active Sites
@router.get("/total_active")
def total_active_sites():
    try:
        rows = run_query("SELECT * FROM v_site_total_active;")
        if not rows:
            return {"total_active_sites": 0}
        return rows[0]   # returns {"total_active_sites": N}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 2) Avg Patients per Site
@router.get("/avg_patients")
def avg_patients_per_site():
    try:
        rows = run_query("SELECT * FROM v_site_avg_patients;")
        if not rows:
            return {"avg_patients_per_site": 0}
        # view returns one row — return the value with a clear key
        key = list(rows[0].keys())[0]
        return {"avg_patients_per_site": float(rows[0][key])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 3) Top Performer
@router.get("/top_performer")
def top_performer():
    try:
        rows = run_query("SELECT * FROM v_site_top_performer;")
        if not rows:
            return {}
        return rows[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 4) Least Performer
@router.get("/least_performer")
def least_performer():
    try:
        rows = run_query("SELECT * FROM v_site_least_performer;")
        if not rows:
            return {}
        return rows[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 5) Patients per Site (bar chart)
@router.get("/patients_bar")
def patients_bar():
    try:
        rows = run_query("SELECT * FROM v_site_patients_bar;")
        return rows  # list of { s_sitename, patients_enrolled }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6) Missed visits by site (heatmap/bubble)
@router.get("/missed_visits")
def missed_visits():
    try:
        rows = run_query("SELECT * FROM v_site_missed_visits;")
        return rows  # list of { s_sitename, missed_visits }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 7) Rescheduled visits by site (line / trend)
@router.get("/rescheduled_visits")
def rescheduled_visits():
    try:
        rows = run_query("SELECT * FROM v_site_Rescheduled_visits;")
        return rows  # list of { s_sitename, rescheduled_visits }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 8) Gender Distribution by Site
@router.get("/gender_distribution")
def gender_distribution():
    try:
        rows = run_query("SELECT * FROM pa_site_gender_distribution;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 9) Age Distribution (Active Patients by Bucket)
@router.get("/age_distribution")
def age_distribution():
    try:
        rows = run_query("SELECT * FROM v_pa_bucket_active_patients;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 10) Site Adherence Distribution
@router.get("/adherence_distribution")
def adherence_distribution():
    try:
        rows = run_query("SELECT * FROM v_pa_site_adherence_distribution;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 11) Combined KPIs endpoint (useful for single API call for top scorecards)
@router.get("/kpis")
def get_all_kpis():
    """
    Returns a combined JSON with the main KPIs to populate the top scorecards.
    """
    try:
        total_active = run_query("SELECT * FROM v_site_total_active;")
        avg_patients = run_query("SELECT * FROM v_site_avg_patients;")
        top_performer = run_query("SELECT * FROM v_site_top_performer;")
        least_performer = run_query("SELECT * FROM v_site_least_performer;")
        
        return {
            "total_active_sites": total_active[0] if total_active else {"total_active_sites": 0},
            "avg_patients_per_site": avg_patients[0] if avg_patients else {"avg_patients_per_site": 0},
            "top_performer": top_performer[0] if top_performer else {},
            "least_performer": least_performer[0] if least_performer else {}
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 12) Combined Charts endpoint (for second and third row charts)
@router.get("/charts")
def get_all_charts():
    """
    Returns a combined JSON with all chart data for better performance.
    """
    try:
        patients_bar = run_query("SELECT * FROM v_site_patients_bar;")
        missed_visits = run_query("SELECT * FROM v_site_missed_visits;")
        rescheduled_visits = run_query("SELECT * FROM v_site_Rescheduled_visits;")
        gender_distribution = run_query("SELECT * FROM pa_site_gender_distribution;")
        age_distribution = run_query("SELECT * FROM v_pa_bucket_active_patients;")
        adherence_distribution = run_query("SELECT * FROM v_pa_site_adherence_distribution;")
        
        return {
            "patients_bar": patients_bar,
            "missed_visits": missed_visits,
            "rescheduled_visits": rescheduled_visits,
            "gender_distribution": gender_distribution,
            "age_distribution": age_distribution,
            "adherence_distribution": adherence_distribution
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))