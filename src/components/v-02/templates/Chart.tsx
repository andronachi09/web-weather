import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TooltipOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Button from '../atoms/Button';
import { CurrentWeather } from '@/types/geocoding.types';
import { useState } from 'react';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

type ChartProps = {
	currentWeather: CurrentWeather | null;
};

type ChartData = {
	labels: string[] | undefined;
	datasets: {
		label: string;
		data: number[] | undefined;
		fill: boolean;
		backgroundColor: string;
		borderColor: string;
	}[];
};

enum Metrics {
	Humidity = 'humidity',
	UVIndex = 'uvi',
	Rainfall = 'rainfall',
	Pressure = 'pressure',
}

export default function LineChart({ currentWeather }: ChartProps) {
	const [selectedMetrics, setSelectedMetrics] = useState<Metrics>(
		Metrics.Humidity,
	);

	const handleButtonClick = (metric: Metrics) => {
		setSelectedMetrics(metric);
	};

	const representData: ChartData = {
		labels: currentWeather?.daily.map((day) =>
			new Date(day.dt * 1000).toDateString(),
		),
		datasets: [
			{
				label:
					selectedMetrics.charAt(0).toUpperCase() +
					selectedMetrics.slice(1),
				data: currentWeather?.daily.map(
					(day) => day[selectedMetrics] as number,
				),
				fill: false,
				backgroundColor: 'rgb(75, 192, 192)',
				borderColor: 'rgba(75, 192, 192, 0.2)',
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			tooltip: {
				mode: 'index',
				intersect: false,
			} as Partial<TooltipOptions>,
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<>
			<div className='p-6 rounded-xl bg-[#2E2E38]'>
				<div className='flex flex-col justify-between gap-2'>
					<div>
						<h1 className='text-3xl text-gray-200 flex justify-center'>
							Overview
						</h1>
					</div>
					<div className='flex flex-row justify-center gap-4 text-gray-200 py-3'>
						<Button
							onClick={() => handleButtonClick(Metrics.Humidity)}
						>
							Humidity
						</Button>
						<Button
							onClick={() => handleButtonClick(Metrics.UVIndex)}
						>
							UV Index
						</Button>
						<Button
							onClick={() => handleButtonClick(Metrics.Rainfall)}
						>
							Rainfall
						</Button>
						<Button
							onClick={() => handleButtonClick(Metrics.Pressure)}
						>
							Pressure
						</Button>
					</div>
				</div>
				<Line data={representData} options={options} />
			</div>
		</>
	);
}
