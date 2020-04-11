/* eslint-disable */
const Joi = require('joi');
function validateRequest(req, res) {
    const periodTypeEnum = ["days", "weeks", "months"];
    var regionSchema = Joi.object().keys({
        name: Joi.string().required('Region name required'),
        avgAge: Joi.number().required('Region average age required'),
        avgDailyIncomeInUSD: Joi.number().required('Average daily income in USD required'),
        avgDailyIncomePopulation: Joi.number().required('Average population income required'),
    }).required();
    const schema = Joi.object().keys({
        region: regionSchema,
        periodType: Joi.string().required('Period type required like days or months').valid(...periodTypeEnum),
        timeToElapse: Joi.number().required('Time to elapase required'),
        reportedCases: Joi.number().required('Number of reported cases required'),
        population: Joi.number().required('Population number required'),
        totalHospitalBeds: Joi.number().required('Total number of hospital beds required')
    });
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details);
        return;
    }
}
module.exports = validateRequest;