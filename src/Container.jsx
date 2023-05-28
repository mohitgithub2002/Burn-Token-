import React, {useEffect} from "react";
import { contract1 } from "./connectContract";
import { contract2 } from "./connectContract2";
import { useNavigate } from 'react-router-dom'
const Container = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [status1, setStatus1] = React.useState();
    const [status2, setStatus2] = React.useState();
    const [dom, setDom] = React.useState();
    useEffect(() => {
        const checkUser = async () => {
            const { ethereum } = window;
            try {
                const accounts = await ethereum.request({method: 'eth_requestAccounts'});
                const walletAddress = accounts[0];
                const apiendpoint = "https://simon-btc-prediction-api.onrender.com/check_user/"+walletAddress;
                const response = await fetch(apiendpoint, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    
                });
                const data = await response.json();
                setStatus1(data.data.status1);
                setStatus2(data.data.status2);
                if (data.data.status1&&data.data.status2) {
                    // User is registered, redirect to next page
                    navigate('/home');
                } else {
                    navigate('/');
                }
            } catch (error) {
              console.error( error);
            }
        }

        checkUser();
    }, [email,dom]);
    
    const handleBurnToken1 = async () => {
        const { ethereum } = window;
        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            const walletAddress = accounts[0];
            // Update the burned state of Token 1
            console.log(walletAddress);
            const apiendpoint = "https://simon-btc-prediction-api.onrender.com/check_user/"+walletAddress;
            const response = await fetch(apiendpoint, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                
            });
            const data = await response.json();
            console.log(data);
            console.log(data.data.status1);
            if(!data.data.status1){
                const burnTransaction = await contract1.burn(1);

                // Wait for the transaction to be mined
                await burnTransaction.wait();
                setDom(true);
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
                await response.json();
                console.log("Burned Token 1");
            }
        } catch (error) {
            alert(error.reason)
          console.error('Error burning Token 1:', error);
        }
    };

    const handleBurnToken2 = async () => {
        const { ethereum } = window;
        try {

            //getting wallet address
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            const walletAddress = accounts[0];
            console.log(walletAddress);

            //check if user is registered
            const apiendpoint = "https://simon-btc-prediction-api.onrender.com/check_user/"+walletAddress;
            const response = await fetch(apiendpoint, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                
            });
            const data = await response.json();
            console.log(data);
            console.log(data.data.status2);
            if(!data.data.status2){
                //burn token and call register api
                const burnTransaction = await contract2.burn(1);
                await burnTransaction.wait();
                setDom(true);
                const response = await fetch('https://simon-btc-prediction-api.onrender.com/register2', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                    wallet: walletAddress,
                    status2 : true,
                    }),
                });
                await response.json();
                console.log("Burned Token 2");
            }
        } catch (error) {
            alert(error.reason)
          console.error('Error burning Token 2:', error);
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
                        <h2>Matrix (MTX)</h2>
                        
                        <div>
                        <label>
                         Email :
                        </label><br/>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                        <label>
                        Matrix Contract Address :
                        </label><br/>
                        <input  type="text" placeholder= "" value={contract1.address} readOnly={true}
                        
                        /><br />
                        </div>
                        <button disabled={status1?true:false} onClick={handleBurnToken1} >Burn</button>
                        
                    </div>   
                </div>
                <div className="box2">
                <div className="card_image">
                </div>
                <div className="circle">
                    </div>
                  <div className="content">
                    <h2>AiPE Matrix Ai (AiPE)</h2><br/>
                        <label>
                        Email :
                        </label><br/>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
                        <label>
                        Contract Address :
                        </label><br/>
                        <input type="text" placeholder="" value={contract2.address} readOnly={true} /><br />
                        
                        <button disabled={status1?false:true} onClick={handleBurnToken2}>Burn</button>
                    </div>
            
                </div>
            </div>
            
        </React.Fragment>
    );
};
export default Container;