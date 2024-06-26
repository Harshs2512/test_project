// import node module libraries
import { Card, Row, Col } from 'react-bootstrap';

// import custom components
import ApexCharts from 'widgets/charts/ApexCharts';

// import data files
import {
	UserChartSeries,
	UserChartOptions,
	VisitorChartOptions,
	BounceChartSeries,
	BounceChartOptions,
	AverageVisitTimeChartSeries,
	AverageVisitTimeChartOptions
} from 'data/charts/ChartData';

function ShowChart(chartName, chartSeries) {
	switch (chartName) {
		case 'CourseCountChart':
			return (
				<ApexCharts
					options={UserChartOptions}
					series={UserChartSeries}
					height={60}
					type="area"
				/>
			);
		case 'RevenueChart':
			return (
				<ApexCharts
					options={VisitorChartOptions}
					series={chartSeries}
					height={60}
					type="area"
				/>
			);
		case 'StudentChart':
			return (
				<ApexCharts
					options={BounceChartOptions}
					series={chartSeries}
					height={60}
					type="line"
				/>
			);
		case 'AverageVisitTimeChart':
			return (
				<ApexCharts
					options={AverageVisitTimeChartOptions}
					series={AverageVisitTimeChartSeries}
					height={60}
					type="area"
				/>
			);
		default:
			return chartName + ' chart is undefiend';
	}
}

const StatRightChart = (props) => {
	const {
		title,
		value,
		summaryValue,
		summaryIcon,
		showSummaryIcon,
		classValue,
		chartSeries,
		chartName
	} = props;
	return (
		<Card border="light" className={`${classValue}`}>
			<Card.Body>
				<Row>
					<Col md={12} lg={12} xl={12} sm={12}>
						<span className="fw-semi-bold text-uppercase fs-6">{title}</span>
					</Col>
					<Col md={6} lg={6} xl={6} sm={6}>
						<h1 className="fw-bold mt-2 mb-0 h2">{value}</h1>
						<p
							className={`text-${summaryIcon === 'up' ? 'success' : 'danger'
								} fw-semi-bold mb-0`}
						>
							{showSummaryIcon ? (
								<i className={`fe fe-trending-${summaryIcon} me-1`}></i>
							) : (
								''
							)}{' '}
							{summaryValue}
						</p>
					</Col>
					<Col
						md={6}
						lg={6}
						xl={6}
						sm={6}
						className="d-flex align-items-center"
					>
						{ShowChart(chartName, chartSeries)}
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default StatRightChart;
