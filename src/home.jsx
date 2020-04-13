import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Formik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { getEstimatesSuccess, getEstimatesFailure} from './redux/estimates.actions';
const Home = ({ history, getEstimatesSuccess, getEstimatesFailure}) => {
    const schema = yup.object().shape({
        population: yup.number().min(1, 'Population of the country/region required').required('Population of the country/region required'),
        timeToElapse: yup.number().min(1, 'Estimate period required').required('Estimate period required'),
        reportedCases: yup.number().min(1, 'Number of reported cases in the country/region required').required('Number of reported cases in the country/region required'),
        totalHospitalBeds: yup.number().min(1, 'Total number of hospital beds required').required('Total number of hospital beds required'),
        periodType: yup.string().required('Period type required'),
    });
    return (
        <Container>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Navbar.Brand to="/">Covid-19 Estimator</Navbar.Brand>
                <Link to="/"> Home </Link>
            </Navbar>
            <Card className="mx-auto" style={{ maxWidth: '620px', marginTop: '10px' }}>
                <Card.Header as="h5">Covid-19 Impact Estimation</Card.Header>
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            population: '',
                            timeToElapse: '',
                            reportedCases: '',
                            totalHospitalBeds: '',
                            periodType: '',
                        }}
                        onSubmit={async (values) => {
                            // signUpStart(values, fromRoute, history);
                            const region = {
                                name: "Africa",
                                avgAge: 19.7,
                                avgDailyIncomeInUSD: 1,
                                avgDailyIncomePopulation: 0.75
                            }
                            const data = { region, ...values }
                            axios.post('https://us-central1-andela-eb65f.cloudfunctions.net/app/api/v1/on-covid-19', data)
                                .then(function (response) {
                                    getEstimatesSuccess(response.data)
                                    history.push('/estimates')
                                })
                                .catch(function (error) {
                                    getEstimatesFailure (error)
                                });
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            errors,
                        }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group as={Row} controlId="controlIdPopulation">
                                        <Form.Label column sm={3}> Population size </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                placeholder="population size"
                                                name="population"
                                                value={values.population}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.population && !errors.population}
                                                isInvalid={touched.population && !!errors.population}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {touched.population && errors.population}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="controlIdTimeToElapse">
                                        <Form.Label column sm={3}> Time to elapse </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                placeholder="time to elapse"
                                                name="timeToElapse"
                                                value={values.timeToElapse}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.timeToElapse && !errors.timeToElapse}
                                                isInvalid={touched.timeToElapse && !!errors.timeToElapse}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {touched.timeToElapse && errors.timeToElapse}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="controlIdReportedCases">
                                        <Form.Label column sm={3}> Reported Cases </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                placeholder="reported cases"
                                                name="reportedCases"
                                                value={values.reportedCases}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.reportedCases && !errors.reportedCases}
                                                isInvalid={touched.reportedCases && !!errors.reportedCases}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {touched.reportedCases && errors.reportedCases}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="controlIdTotalHospitalBeds">
                                        <Form.Label column sm={3}> Hospital beds</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                placeholder="total hospital beds"
                                                name="totalHospitalBeds"
                                                value={values.totalHospitalBeds}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.totalHospitalBeds && !errors.totalHospitalBeds}
                                                isInvalid={touched.totalHospitalBeds && !!errors.totalHospitalBeds}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {touched.totalHospitalBeds && errors.totalHospitalBeds}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="controlIdPeriodType">
                                        <Form.Label column sm={3}> Period type</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                as="select"
                                                placeholder="Period type"
                                                name="periodType"
                                                value={values.periodType}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.periodType && !errors.periodType}
                                                isInvalid={touched.periodType && !!errors.periodType}
                                            >
                                                <option></option>
                                                <option>days</option>
                                                <option>weeks</option>
                                                <option>months</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {touched.periodType && errors.periodType}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Button type="submit" className="btn btn-primary btn-block">
                                        Estimate impact
                  </Button>
                                </Form>
                            )}
                    </Formik>
                </Card.Body>
            </Card>
        </Container>
    );
}
const mapDispatchToProps = dispatch => ({
    getEstimatesSuccess: estimates => dispatch(getEstimatesSuccess(estimates)),
    getEstimatesFailure: errorMessage => dispatch(getEstimatesFailure(errorMessage)),
})
export default connect(null, mapDispatchToProps) (Home);