import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // ✅ Make sure /api is included

// Existing endpoints
export const fetchKPIs = () => axios.get(`${API_BASE_URL}/exec/kpis`);
export const fetchGaugeData = () => axios.get(`${API_BASE_URL}/exec/enrollment-gauge`);
export const fetchVisitStatus = () => axios.get(`${API_BASE_URL}/exec/visit-status`);
export const fetchEnrollmentTrend = () => axios.get(`${API_BASE_URL}/exec/enrollment-trend`);

// Site Analysis API functions
export const fetchTotalActiveSites = () => axios.get(`${API_BASE_URL}/siteanalysis/total_active`);
export const fetchAvgPatientsPerSite = () => axios.get(`${API_BASE_URL}/siteanalysis/avg_patients`);
export const fetchTopPerformer = () => axios.get(`${API_BASE_URL}/siteanalysis/top_performer`);
export const fetchLeastPerformer = () => axios.get(`${API_BASE_URL}/siteanalysis/least_performer`);
export const fetchPatientsBar = () => axios.get(`${API_BASE_URL}/siteanalysis/patients_bar`);
export const fetchMissedVisits = () => axios.get(`${API_BASE_URL}/siteanalysis/missed_visits`);
export const fetchRescheduledVisits = () => axios.get(`${API_BASE_URL}/siteanalysis/rescheduled_visits`);
export const fetchGenderDistribution = () => axios.get(`${API_BASE_URL}/siteanalysis/gender_distribution`);
export const fetchAgeDistribution = () => axios.get(`${API_BASE_URL}/siteanalysis/age_distribution`);
export const fetchAdherenceDistribution = () => axios.get(`${API_BASE_URL}/siteanalysis/adherence_distribution`);

// Patient Adherence Endpoints
export const fetchAdherenceKPIs = () => axios.get(`${API_BASE_URL}/adherence/kpis`);
export const fetchAdherenceCategories = () => axios.get(`${API_BASE_URL}/adherence/categories`);
export const fetchDropoutTrend = () => axios.get(`${API_BASE_URL}/adherence/dropout-trend`);
export const fetchPatientDetails = (page = 1, pageSize = 50) => 
  axios.get(`${API_BASE_URL}/adherence/patient-details?page=${page}&page_size=${pageSize}`);

export const fetchSiteGenderDistribution = () => axios.get(`${API_BASE_URL}/adherence/site-gender-distribution`);
export const fetchSiteAdherenceDistribution = () => axios.get(`${API_BASE_URL}/adherence/site-adherence-distribution`);

// Trial Journey API functions
export const fetchTrialJourneyKPIs = () => axios.get(`${API_BASE_URL}/trialjourney/kpis`);
export const fetchScreeningProgress = () => axios.get(`${API_BASE_URL}/trialjourney/screening_progress`);
export const fetchWeeklyVisits = () => axios.get(`${API_BASE_URL}/trialjourney/weekly_visits`);
export const fetchEdiaryCompletion = () => axios.get(`${API_BASE_URL}/trialjourney/ediary_completion`);
export const fetchAEDistribution = () => axios.get(`${API_BASE_URL}/trialjourney/ae_distribution`);
export const fetchAECategoryDistribution = () => axios.get(`${API_BASE_URL}/trialjourney/ae_category_distribution`);

// Operational Metrics API functions - CLEANED AND OPTIMIZED
export const fetchOperationalKPIs = () => axios.get(`${API_BASE_URL}/operationalmetrics/kpis`);
export const fetchOperationalMainKPIs = () => axios.get(`${API_BASE_URL}/operationalmetrics/main_kpis`);
export const fetchOperationalCharts = () => axios.get(`${API_BASE_URL}/operationalmetrics/charts`);
export const fetchOperationalCompleteData = () => axios.get(`${API_BASE_URL}/operationalmetrics/complete_data`);

// Individual Operational Metrics Endpoints (No duplicates)
export const fetchQueryCompleteness = () => axios.get(`${API_BASE_URL}/operationalmetrics/query_completeness`);
export const fetchMedicationTakePercent = () => axios.get(`${API_BASE_URL}/operationalmetrics/medication_take_percent`);
export const fetchTimeliness = () => axios.get(`${API_BASE_URL}/operationalmetrics/timeliness`);
export const fetchRandomizedStats = () => axios.get(`${API_BASE_URL}/operationalmetrics/randomized_stats`);
export const fetchComprehensiveTable = () => axios.get(`${API_BASE_URL}/operationalmetrics/comprehensive_table`);

// ✅ REMOVED: Duplicate functions and alias exports to avoid conflicts