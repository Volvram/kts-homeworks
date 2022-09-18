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

export const createChart = (
  labels: string[],
  label: string,
  data: number[]
): ChartDataType => {
  return {
    labels,
    datasets: [
      {
        ...CHARTDATA.datasets[0], // Спереди, чтобы свойства label и data не перезаписывались дефолтными значениями
        label,
        data,
      },
    ],
  };
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
