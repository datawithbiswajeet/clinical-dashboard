from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import executive, siteanalysis, adherence, trialjourney, operationalmetrics

app = FastAPI(title="Clinical Dashboard API", version="1.0.0")

# CORS middleware - UPDATE THIS FOR PRODUCTION
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to "*" for now, we'll fix later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(executive.router, prefix="/api", tags=["Executive Summary"])
app.include_router(siteanalysis.router, prefix="/api", tags=["Site Analysis"])
app.include_router(adherence.router, prefix="/api", tags=["Patient Adherence"])
app.include_router(trialjourney.router, prefix="/api", tags=["Trial Journey"])
app.include_router(operationalmetrics.router, prefix="/api", tags=["Operational Metrics"])

@app.get("/")
def read_root():
    return {"message": "Clinical Dashboard API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# ADD THIS FOR RAILWAY DEPLOYMENT
import os

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)