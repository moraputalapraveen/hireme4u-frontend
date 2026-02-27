// config.ts - Central configuration for your app

const local='http://localhost:5000/api'
  const prod ='https://13.51.197.202.nip.io/api'


const config = {
  // Change this ONE line when deploying
 
  apiUrl: prod,
  
  // You can add more config here later
  appName: 'HireMe4U',
  version: '1.0.0'
};

export default config;