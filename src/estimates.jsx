import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
const Estimates = (estimates, checkEstimates) => {

    console.log(JSON.stringify(estimates));
    const { impact, severeImpact } = estimates?.estimates || null;
    const { currentlyInfected, infectionsByRequestedTime, severeCasesByRequestedTime, hospitalBedsByRequestedTime,
        casesForICUByRequestedTime, casesForVentilatorsByRequestedTime, dollarsInFlight
    } = impact
    return (
        <Container>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Navbar.Brand to="/">Covid-19 Estimator</Navbar.Brand>
                <Link to="/"> Home </Link>
            </Navbar>
            <Card className="mx-auto" style={{ maxWidth: '620px', marginTop: '10px' }}>
                <Card.Header as="h5">Covid-19 Impact Estimation</Card.Header>
                <Card.Body>
                    <Card.Title>Best Case Estimates</Card.Title>
                    <p>Currently Infected: {currentlyInfected}</p>
                    <p>Infections By Requested Time: {infectionsByRequestedTime}</p>
                    <p>Severe Cases By Requested Time: {severeCasesByRequestedTime}</p>
                    <p>Hospital Beds By Requested Time: {hospitalBedsByRequestedTime}</p>
                    <p>CasesFor ICU By Requested Time: {casesForICUByRequestedTime}</p>
                    <p>Cases For Ventilators By Requested Time: {casesForVentilatorsByRequestedTime}</p>
                    <p>Cases For Ventilators By Requested Time: {casesForVentilatorsByRequestedTime}</p>
                    <p>Dollars In Flight: {dollarsInFlight}</p>
                    <hr />
                    <Card.Title>Severe Case Estimates</Card.Title>
                    <p>Currently Infected: {severeImpact.currentlyInfected}</p>
                    <p>Infections By Requested Time: {severeImpact.infectionsByRequestedTime}</p>
                    <p>Severe Cases By Requested Time: {severeImpact.severeCasesByRequestedTime}</p>
                    <p>Hospital Beds By Requested Time: {severeImpact.hospitalBedsByRequestedTime}</p>
                    <p>Cases For ICU By Requested Time: {severeImpact.casesForICUByRequestedTime}</p>
                    <p>Cases For Ventilators By Requested Time: {severeImpact.casesForVentilatorsByRequestedTime}</p>
                    <p>Cases For Ventilators By Requested Time: {severeImpact.casesForVentilatorsByRequestedTime}</p>
                    <p>Dollars In Flight: {dollarsInFlight}</p>
                    <hr />
                </Card.Body>
            </Card>
        </Container>
    );
}
const mapStateToProps = state => ({
    estimates: state?.estimates.estimates
});
export default connect(mapStateToProps)(Estimates);