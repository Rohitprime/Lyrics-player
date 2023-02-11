import axios from "axios";

const options = {
    method: 'GET',
    url: 'search/',
    params: {q: 'hip hop', type: 'multi', offset: '0', limit: '50'},
  
  };
  
  export const fetchFromApi = async(url)=>{
      
  const res = await axios.request({
        url:`https://shazam.p.rapidapi.com/${url}`,
        headers: {
            // 'X-RapidAPI-Key': '367f38ce05msh777f92199050892p12ca96jsn02f4dd95b9e6',
             'x-RapidAPI-Key':'da86058e20msh814230fe9450babp1a4ae7jsnc29f22e99551',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
          }
    })
    
    return res.data

  }