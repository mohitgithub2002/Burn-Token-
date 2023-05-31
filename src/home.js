import React, {useState,useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
// import data from './data.json'
import { address } from './Nevbar';
const Home = () => {
  console.log("imported address"+address)
  const[graphData, setGraphData] = useState([]); // 
  const[predictData,setPredictData]= useState([]);
  const[dataDate, setDataDate] = useState([]);
  useEffect(() => {
    const apiendpoint = "https://simon-btc-prediction-api.onrender.com/graph-list";
    console.log(apiendpoint);
    const getData =  async() => {
      try {
        const response = await fetch(apiendpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
        if(response.ok){
          const data = await response.json();
          console.log(data)
          setGraphData(data.Actual);
          setPredictData(data.Train);
          setDataDate(data.Date);
          console.log(graphData);
        } else {
          console.log("Error in fetching data");
        }
        
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    getData(); 

    return () => {
    };
  }, []);
  const series = [
    {
      name: 'Actual',
      data: graphData,
      // color: 'green'
    },
    {
      name: 'Prediction',
      data: predictData,
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
      categories: dataDate
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

