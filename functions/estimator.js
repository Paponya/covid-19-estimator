/* eslint-disable */

function futureImpactEstimate(reportedCases, estimateFactor, timeToElapse, periodType, totalHospitalBeds, avgDailyIncomeInUSD, avgDailyIncomePopulation) {
    const period = convertTimeToElapse(timeToElapse, periodType);
    const currentlyInfected = reportedCases * estimateFactor;
    const infectionsByRequestedTime = currentlyInfected * (Math.pow(2, Math.trunc(period / 3)))
    const severeCasesByRequestedTime = Math.trunc(0.15 * infectionsByRequestedTime)
    const hospitalBedsByRequestedTime = (Math.trunc(0.35 * totalHospitalBeds)) - severeCasesByRequestedTime;
    const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime)
    const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime)
    const dollarsInFlight = Math.trunc((infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / period);
    const impact = {
        currentlyInfected: currentlyInfected,
        infectionsByRequestedTime: infectionsByRequestedTime,
        severeCasesByRequestedTime: severeCasesByRequestedTime,
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTime,
        casesForICUByRequestedTime: casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime,
        dollarsInFlight: dollarsInFlight
    }
    return impact;
}
function convertTimeToElapse(timeToElapse, periodType) {
    let period
    switch (periodType) {
        case 'days':
            period = timeToElapse
            break;
        case 'weeks':
            period = timeToElapse * 7
            break;
        case 'months':
            period = timeToElapse * 30
            break;
        default:
    }
    return period
}
const covid19ImpactEstimator = (data) => {
    const { region, periodType, timeToElapse, reportedCases, totalHospitalBeds } = data
    const { avgDailyIncomeInUSD, avgDailyIncomePopulation} = region;
    const response = {
        data: data, //input data
        impact: futureImpactEstimate(reportedCases, 10, timeToElapse, periodType, totalHospitalBeds, avgDailyIncomeInUSD, avgDailyIncomePopulation), // best case estimates
        severeImpact: futureImpactEstimate(reportedCases, 50, timeToElapse, periodType, totalHospitalBeds, avgDailyIncomeInUSD, avgDailyIncomePopulation) // worst case estimates
    }
    return response;
};

module.exports  = covid19ImpactEstimator;
