import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
const Home = () => {
     const [actual, setActualData] = useState([]); //
     const [predictTrain, setPredictTrain] = useState([]);
     const [predictTest, setPredictTest] = useState([]);
     const [dataDate, setDataDate] = useState([]);
     //const [last5Data, setLast5Data] = useState([]);
     const [predictData, setPredictData] = useState();
     var values = [];
     useEffect(() => {
          const url = "https://simon-btc-prediction-api.onrender.com/next/";

          const get5DaysData = async () => {
            
               try {
                    const data5day = await fetch(url, {
                        
                         method: "GET",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         
                    });
                    console.log("data5day : ", data5day);
                    if (data5day.ok) {
                         const data5 = await data5day.json();
                         setPredictData(data5.data);
                         console.log("data5: ", data5.data);
                    } else {
                         console.log("Error in fetching data");
                    }
               } catch (error) {
                    console.error("An error occurred in api call", error);
               }
          };
          get5DaysData();
          
          const apiendpoint =
               "https://simon-btc-prediction-api.onrender.com/graph-list";
          
          const getData = async () => {
               try {
                    const response = await fetch(apiendpoint, {
                         method: "GET",
                         headers: {
                              "Content-Type": "application/json",
                         },
                    });
                    if (response.ok) {
                         const data = await response.json();
                         setActualData(data.Actual);
                         setPredictTrain(data.Train);
                         setPredictTest(data.Test);
                         setDataDate(data.Date);
                         
                    } else {
                         console.log("Error in fetching data");
                    }
               } catch (error) {
                    console.error("An error occurred", error);
               }
          };

          getData();
          

          return () => {};
     }, []);
     const series = [
          {
               name: "Actual",
               data: actual,
               //  data: [1, 2, 5, 3, 2],
               // color: 'green'
          },
          {
               name: "Train Prediction",
               data: predictTrain,
               //  data: [1, 2, 2, 3, 1],
               // color: 'orange'
          },
          {
               name: "Test Prediction",
               data: predictTest,
               // color: 'orange'
          },
     ];

     const options = {
          chart: {
               height: 350,
               type: "area",
          },
          dataLabels: {
               enabled: false,
          },
          stroke: {
               curve: "smooth",
          },
          xaxis: {
               type: "datetime",
               categories: dataDate,
               //  categories: [1, 2, 3, 4, 5],
          },
          tooltip: {
               x: {
                    format: "dd/MM/yy HH:mm",
               },
          },
     };

     return (
          <>
               <div
                    id="chart"
                    style={{
                         margin: "50px 100px",
                         backgroundColor: "white",
                    }}
               >
                    <ReactApexChart
                         options={options}
                         series={series}
                         type="area"
                         height={350}
                    />
               </div>
               <div
                    style={{
                         margin: "50px 100px",
                         backgroundColor: "white",
                    }}
               >
                    <h1
                         style={{
                              display: "flex",
                              justifyContent: "center",
                              color: "orange",
                         }}
                    >
                         Today's Prediction (High) : {predictData}
                    </h1>
               </div>
          </>
     );
};
export default Home;
