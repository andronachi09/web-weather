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
			legend: {
				display: false,
			},
			tooltip: {
				mode: 'index',
				intersect: false,
			} as Partial<TooltipOptions>,
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					color: '#C6E6E8',
				},
			},
			x: {
				ticks: {
					color: '#C6E6E8',
				},
			},
		},
	};

	return (
		<div className='w-full'>
			<div className='p-2 rounded-xl bg-[#2E2E38] lg:p-6'>
				<div className='flex flex-col justify-between items-center gap-2 sm:flex sm:flex-row'>
					<div>
						<h1 className='text-3xl text-gray-200 flex justify-center'>
							Overview
						</h1>
					</div>
					<div className='flex flex-row w-64 justify-center py-1 mb-2 bg-[#1e1f24] rounded-3xl sm:px-2'>
						<Button
							onClick={() => handleButtonClick(Metrics.Humidity)}
							className='text-[#C6E6E8] p-2 rounded-3xl hover:bg-[#C6E6E8] hover:text-black hover:rounded-3xl transition duration-500 ease-in-out'
						>
							Humidity
						</Button>
						<Button
							onClick={() => handleButtonClick(Metrics.UVIndex)}
							className='text-[#C6E6E8] p-2 rounded-3xl hover:bg-[#C6E6E8] hover:text-black hover:rounded-3xl transition duration-500 ease-in-out'
						>
							UV Index
						</Button>
						<Button
							onClick={() => handleButtonClick(Metrics.Pressure)}
							className='text-[#C6E6E8] p-2 rounded-3xl hover:bg-[#C6E6E8] hover:text-black hover:rounded-3xl transition duration-500 ease-in-out'
						>
							Pressure
						</Button>
					</div>
				</div>
				<Line data={representData} options={options} />
			</div>
		</div>
	);
}
