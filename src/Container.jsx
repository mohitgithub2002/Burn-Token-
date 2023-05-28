import React from "react";
import { contract1 } from "./connectContract";
import { contract2 } from "./connectContract2";

const Container = () => {
    
    const handleBurnToken1 = async () => {
        const { ethereum } = window;
        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            const walletAddress = accounts[0];
            // Update the burned state of Token 1
            console.log(walletAddress);
            
            const response = await fetch('https://simon-btc-prediction-api.onrender.com/register1', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                wallet: walletAddress,
                status1 : true,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(data.status);
            if(data.status){
                const burnTransaction = await contract1.burn(1);

                // Wait for the transaction to be mined
                await burnTransaction.wait();
                console.log("Burned Token 1");
            }
        } catch (error) {
          console.error('Error burning Token 1:', error);
        }
    };

    const handleBurnToken2 = async () => {
        const { ethereum } = window;
        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            const walletAddress = accounts[0];
            
            const response = await fetch('https://simon-btc-prediction-api.onrender.com/register2', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                wallet: walletAddress,
                status1 : true,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(data.status);
            if(data.status){
                const burnTransaction = await contract2.burn(1);

                // Wait for the transaction to be mined
                await burnTransaction.wait();
                console.log("Burned Token 2");
            }
        } catch (error) {
          console.error('Error burning Token 1:', error);
        }
      };
    return (
    
        <React.Fragment>
            <div className="container">
                <div className="box1">
                    <div className="card_image">
                    </div>
                        <div className="circle">
                        </div>
                    <div className="content">
                        <h2>Token 1</h2>
                        
                        <div>
                        <label>
                         Name :
                        </label><br/>
                        <input type="text" placeholder="Enter your name"
                        
                        /><br/>
                        <label>
                        Email :
                        </label><br/>
                        <input type="email" placeholder="Enter your email" 
                        
                        /><br />
                        </div>
                        <button onClick={handleBurnToken1} >Burn</button>
                        
                    </div>   
                </div>
                <div className="box2">
                <div className="card_image">
                </div>
                <div className="circle">
                    </div>
                  <div className="content">
                    <h2>Token 2</h2><br/>
                        <label>
                         Name :
                        </label><br/>
                        <input type="text" placeholder="Enter your name"/><br/>
                        <label>
                        Email :
                        </label><br/>
                        <input type="email" placeholder="Enter your email" /><br />
                        
                        <button onClick={handleBurnToken2}>Burn</button>
                    </div>
            
                </div>
            </div>
            
        </React.Fragment>
    );
};
export default Container;