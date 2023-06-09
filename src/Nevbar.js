import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'
var address="0x000000";
const Nevbar=()=>{
  const [account, setAccount] = useState(false);
  const label = account ? account.substring(0, 6) + "..." + account.substring(account.length - 4) : "Connect";
  const { ethereum } = window;
  useEffect(()=>{
    const checkChain = async () => {
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log(chainId);
      if (chainId !== '0x13881') {
        alert('Please connect to the Mumbai Test network');
      }
    }
    if (window.ethereum && window.ethereum.isMetaMask) {
      checkChain();
      window.ethereum.on('accountsChanged', ([newAccount]) => {
        setAccount(newAccount);
      });
      window.ethereum.on('chainChanged', (chainId) => {
        checkChain();
      });
      
    } else {
      alert('MetaMask is not installed');
      return;
    }
    

    
  },[])
    const connectMetamask = async () => {
      if(window.ethereum !== undefined){
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        setAccount(accounts[0]);
      }
    }
    address = account;
    

    return (
    <React.Fragment>
    <div className="nevbar">
    <img src="logo.png" alt="Logo" border="0" width="70" height="70" />
    <h1>Matrix Token</h1>
                <button onClick={connectMetamask}>{label}</button>
                
    </div>
    <CheckUser account={account} />
    </React.Fragment>
    
    );
};

const CheckUser = ({ account }) => {
  
  const navigate = useNavigate();
  useEffect(() => {
    const apiendpoint = "https://simon-btc-prediction-api.onrender.com/check_user/"+account;
    console.log(apiendpoint); 
    const checkUserRegistration = async () => {
      try {
        const response = await fetch(apiendpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.data.status1);
          if (data.data.status1&&data.data.status2) {
            // User is registered, redirect to next page
            navigate('/home');
            console.log("user is registered");
          } else {
            navigate('/');
            console.log("user is not registered");
          }
        } else {
          console.error('API request failed');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    checkUserRegistration(); // Call the function when the component mounts
    // You can also add additional logic to trigger the API call based on certain conditions or events in the DOM
    // For example, you can use an event listener or setInterval to periodically check for user registration updates

    return () => {
      // Clean up any necessary resources
      // For example, remove event listeners or cancel any ongoing API requests
    };
  }, [account]); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      {/* Render your component JSX here */}
    </div>
  );
};

export default Nevbar;
export {address};