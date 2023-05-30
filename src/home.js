import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Home = () => {
  const series = [
    {
      name: 'Actual',
      data: [31, 40, 28, 51, 42, 109, 100],
      // color: 'green'
    },
    {
      name: 'Prediction',
      data: [11, 32, 45, 32, 34, 52, 41],
      // color: 'orange'
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'area',
      
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z'
      ]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  };

  return (
    <>
    <div id="chart" style={{
      margin: "50px 100px", backgroundColor: "white"
    }}>
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
      <div style={{
      margin: "50px 100px", backgroundColor: "white"
      }}><h1 style={{
          display: "flex",
          justifyContent: "center",
        color: "orange"
        
      }}>Today's Prediction (High) : 26,510.3</h1></div>
      </>
  );
};
export default Home;

