import rootStore from "store/RootStore/instance";

// export const CHARTDATA = {
//   labels: [""],
//   datasets: [
//     {
//       label: `${rootStore.coinFeature.currency.symbol}`,
//       spanGaps: false,
//       backgroundColor: "#0063F5",
//       borderColor: "#0063F5",
//       pointRadius: 1,
//       data: [0],
//     },
//   ],
// };

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
