import React from 'react'
import '../App.css'




export default function Message({user,message,classs}) {

if(user){
    return (
                          <div className={classs}>

                                  {`${user}: ${message}`}

                            </div>  
    )
}else{ 
    return(
                    <div className={classs}>

                    {`You: ${message}`}

                    </div>
    )
                          
}
    
}
