export type ChartDataType = {
  labels: string[];
  datasets: [
    {
      label: string;
      spanGaps: boolean;
      backgroundColor: string;
      borderColor: string;
      pointRadius: number;
      data: number[];
    }
  ];
};

// Не работает при выносе
export const CHARTDATA: ChartDataType = {
  labels: [""],
  datasets: [
    {
      label: "",
      spanGaps: false,
      backgroundColor: "#0063F5",
      borderColor: "#0063F5",
      pointRadius: 1,
      data: [0],
    },
  ],
};

// Тоже не работает
export const createChart = (
  labels: string[],
  label: string,
  data: number[]
): ChartDataType => {
  const chartData = CHARTDATA;
  chartData.labels = labels;
  chartData.datasets[0].label = label;
  chartData.datasets[0].data = data;

  return chartData;
};

export const CHARTOPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        display: true,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    y: {
      ticks: {
        display: false,
        beginAtZero: true,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
};
