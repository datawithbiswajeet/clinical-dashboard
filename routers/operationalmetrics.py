# backend/routers/operationalmetrics.py
from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor
from database import get_connection

router = APIRouter(prefix="/operationalmetrics", tags=["Operational Metrics"])

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

# 1) Main KPIs for scorecards
@router.get("/main_kpis")
def main_kpis():
    try:
        rows = run_query("SELECT * FROM om_kpi2;")
        if not rows:
            return {
                "total_queries": 0,
                "closed_queries": 0,
                "open_queries": 0,
                "avg_query_completeness": 0,
                "avg_resolution_time": 0
            }
        return rows[0]  # returns all KPIs in one object
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 2) Query Completeness by Site
@router.get("/query_completeness")
def query_completeness():
    try:
        rows = run_query("SELECT * FROM om_querycompleteness;")
        return rows  # list of { s_sitename, avg_querycompleteness }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 3) Medication Take Percent by Site
@router.get("/medication_take_percent")
def medication_take_percent():
    try:
        rows = run_query("SELECT * FROM om_medicationtakepercent;")
        return rows  # list of { s_sitename, avg_medication_take_percent }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 4) Timeliness by Site
@router.get("/timeliness")
def timeliness():
    try:
        rows = run_query("SELECT * FROM tj_timeliness;")
        return rows  # list of { s_sitename, avg_timeliness }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 5) Randomized Flag Statistics by Site
@router.get("/randomized_stats")
def randomized_stats():
    try:
        rows = run_query("SELECT * FROM tj_randomizedflag;")
        return rows  # list of { s_sitename, randomized, no_randomized }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6) Comprehensive Table Data by Site
@router.get("/comprehensive_table")
def comprehensive_table():
    try:
        rows = run_query("SELECT * FROM tj_table;")
        return rows  # list of { s_sitename, randomized, no_randomized, avg_medication_take_percent, avg_querycompleteness, avg_timeliness }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 7) Combined KPIs endpoint (for top scorecards)
@router.get("/kpis")
def get_all_kpis():
    """
    Returns a combined JSON with the main KPIs to populate the top scorecards.
    """
    try:
        main_kpis_data = run_query("SELECT * FROM om_kpi2;")
        
        if main_kpis_data:
            kpis = main_kpis_data[0]
            return {
                "total_queries": kpis.get("total_queries", 0),
                "closed_queries": kpis.get("closed_queries", 0),
                "open_queries": kpis.get("open_queries", 0),
                "avg_query_completeness": float(kpis.get("avg_query_completeness", 0)),
                "avg_resolution_time": float(kpis.get("avg_resolutontime", 0))
            }
        else:
            return {
                "total_queries": 0,
                "closed_queries": 0,
                "open_queries": 0,
                "avg_query_completeness": 0,
                "avg_resolution_time": 0
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 8) Combined Charts endpoint (for all chart data in one call)
@router.get("/charts")
def get_all_charts():
    """
    Returns a combined JSON with all chart data for better performance.
    """
    try:
        query_completeness = run_query("SELECT * FROM om_querycompleteness;")
        medication_take_percent = run_query("SELECT * FROM om_medicationtakepercent;")
        timeliness = run_query("SELECT * FROM tj_timeliness;")
        randomized_stats = run_query("SELECT * FROM tj_randomizedflag;")
        
        return {
            "query_completeness": query_completeness,
            "medication_take_percent": medication_take_percent,
            "timeliness": timeliness,
            "randomized_stats": randomized_stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 9) Complete Data endpoint (everything in one call)
@router.get("/complete_data")
def get_complete_data():
    """
    Returns all operational metrics data in a single API call.
    """
    try:
        main_kpis = run_query("SELECT * FROM om_kpi2;")
        query_completeness = run_query("SELECT * FROM om_querycompleteness;")
        medication_take_percent = run_query("SELECT * FROM om_medicationtakepercent;")
        timeliness = run_query("SELECT * FROM tj_timeliness;")
        randomized_stats = run_query("SELECT * FROM tj_randomizedflag;")
        comprehensive_table = run_query("SELECT * FROM tj_table;")
        
        return {
            "main_kpis": main_kpis[0] if main_kpis else {},
            "query_completeness": query_completeness,
            "medication_take_percent": medication_take_percent,
            "timeliness": timeliness,
            "randomized_stats": randomized_stats,
            "comprehensive_table": comprehensive_table
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))