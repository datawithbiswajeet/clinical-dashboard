from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import executive, siteanalysis, adherence, trialjourney, operationalmetrics  # ✅ ADD operationalmetrics

app = FastAPI(title="Clinical Dashboard API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(executive.router, prefix="/api", tags=["Executive Summary"])
app.include_router(siteanalysis.router, prefix="/api", tags=["Site Analysis"])
app.include_router(adherence.router, prefix="/api", tags=["Patient Adherence"])
app.include_router(trialjourney.router, prefix="/api", tags=["Trial Journey"])
app.include_router(operationalmetrics.router, prefix="/api", tags=["Operational Metrics"])  # ✅ ADD THIS LINE

@app.get("/")
def read_root():
    return {"message": "Clinical Dashboard API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}