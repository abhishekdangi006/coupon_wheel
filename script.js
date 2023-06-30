/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 0, maxDegree: 30, value: "Try Again" },
  { minDegree: 331, maxDegree: 360, value: 100 },
  { minDegree: 301, maxDegree: 330, value: 200 },
  { minDegree: 271, maxDegree: 300, value: 300 },
  { minDegree: 241, maxDegree: 270, value: 400 },
  { minDegree: 211, maxDegree: 240, value: 500 },
  { minDegree: 181, maxDegree: 210, value: 600 },
  { minDegree: 151, maxDegree: 180, value: 700 },
  { minDegree: 121, maxDegree: 150, value: 800 },
  { minDegree: 91, maxDegree: 120, value: 900},
  { minDegree: 61, maxDegree: 90, value: 1000 },
  { minDegree: 31, maxDegree: 60, value: 1100 },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "gold",
  "coral",
  "black",
  "tan",
  "teal",
  "purple",
  "pink",
  "yellow",
  "blue",
  "orange",
  "green",
  "red",
  
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [10, 11, 0,1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {

    if (angleValue >= 0 && angleValue <= 30) {
      text.innerHTML = `<p> Oops, Try Again! </p>`;
      spinBtn.disabled = false;
      break;
    }
    else if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Congratulations, You Have Won $${i.value} ! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
let isFirstSpin = true;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Best Of Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    }else if(count > 15 && isFirstSpin){
      generateValue(20);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
      isFirstSpin = false;
    }
    
    else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */