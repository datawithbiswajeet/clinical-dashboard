# backend/routers/trialjourney.py
from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor
from database import get_connection

router = APIRouter()

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

# 1) Main KPIs for Trial Journey
@router.get("/trialjourney/kpis")
def trial_journey_kpis():
    try:
        rows = run_query("SELECT * FROM v_kpi1;")
        if not rows:
            return {
                "total_visits": 0,
                "screening_passed": 0,
                "randomized": 0,
                "total_ae_reported": 0,
                "avg_medicationtakenpct": 0
            }
        return rows[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 2) Screening Results Distribution
@router.get("/trialjourney/screening_results")
def screening_results():
    try:
        rows = run_query("SELECT * FROM tj_screenresult;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 3) Screening Failure Reasons
@router.get("/trialjourney/screening_failure_reasons")
def screening_failure_reasons():
    try:
        rows = run_query("SELECT * FROM tj_screenfailurreason;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 4) Screening Sources
@router.get("/trialjourney/screening_sources")
def screening_sources():
    try:
        rows = run_query("SELECT * FROM tj_screensource;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 5) eDiary Submission by Site
@router.get("/trialjourney/ediary_submission")
def ediary_submission():
    try:
        rows = run_query("SELECT * FROM tj_ediary_submission;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6) Weekly Site Visits
@router.get("/trialjourney/weekly_visits")
def weekly_visits():
    try:
        rows = run_query("SELECT * FROM tj_weekly_site_visits;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 7) AE Category Distribution by Site
@router.get("/trialjourney/ae_category_distribution")
def ae_category_distribution():
    try:
        rows = run_query("SELECT * FROM tj_category_distribution_site;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 8) AE Count Summary
@router.get("/trialjourney/ae_count_summary")
def ae_count_summary():
    try:
        rows = run_query("SELECT * FROM tj_ae_count;")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 9) Combined endpoint for all Trial Journey data
@router.get("/trialjourney/dashboard_data")
def get_all_trial_journey_data():
    """
    Returns combined JSON with all Trial Journey data for dashboard performance.
    """
    try:
        kpis = run_query("SELECT * FROM v_kpi1;")
        screen_results = run_query("SELECT * FROM tj_screenresult;")
        failure_reasons = run_query("SELECT * FROM tj_screenfailurreason;")
        screen_sources = run_query("SELECT * FROM tj_screensource;")
        ediary_submission = run_query("SELECT * FROM tj_ediary_submission;")
        weekly_visits = run_query("SELECT * FROM tj_weekly_site_visits;")
        ae_distribution = run_query("SELECT * FROM tj_category_distribution_site;")
        ae_count = run_query("SELECT * FROM tj_ae_count;")
        
        return {
            "kpis": kpis[0] if kpis else {},
            "screening_results": screen_results,
            "screening_failure_reasons": failure_reasons,
            "screening_sources": screen_sources,
            "ediary_submission": ediary_submission,
            "weekly_visits": weekly_visits,
            "ae_category_distribution": ae_distribution,
            "ae_count_summary": ae_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))