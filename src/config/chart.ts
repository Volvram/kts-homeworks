export type ChartDataType = {
  labels: string[];
  datasets: [
    {
      label: string;
      spanGaps: boolean;
      backgroundColor: string;
      borderColor: string;
      pointRadius: number;
      borderWidth?: number;
      pointBorderWidth?: number;
      data: number[];
    }
  ];
};

const dataset = {
  label: "",
  spanGaps: false,
  backgroundColor: "#0063F5",
  borderColor: "#0063F5",
  pointRadius: 1,
  data: [0],
};

export const createChart = (
  labels: string[],
  label: string,
  data: number[],
  backgroundColor: string = "#0063F5",
  borderColor: string = "#0063F5",
  borderWidth: number = 3,
  pointBorderWidth: number = 1
): ChartDataType => {
  return {
    labels,
    datasets: [
      {
        ...dataset, // Спереди, чтобы свойства label и data не перезаписывались дефолтными значениями
        label,
        backgroundColor,
        borderColor,
        borderWidth,
        pointBorderWidth,
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

export const MINICHARTOPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
      ticks: {
        display: true,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    y: {
      display: false,
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
