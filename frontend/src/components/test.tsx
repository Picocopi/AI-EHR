import React, { use, useEffect } from 'react'




interface WelcomeCardProps {
    patientName: string,
    age : number,
    showAge : boolean

}

const WelcomeCard: React.FC<WelcomeCardProps> =({patientName, age, showAge}) => {
    
    const [displayName, setDisplayName] = React.useState(patientName);
    const [visitCount, setVisitCount] = React.useState(0);

    useEffect(() => {
        console.log('WelcomeCard component loaded!');
        setVisitCount(1)

    },[])

    const changeName = () => {
        setDisplayName(displayName === patientName ? "Jane Smith" :  patientName)
    }
    
    
    
    return(
        <div>
        
           <p>
            Welcome {displayName}!
            {showAge && `Your age is ${age}.`}
           </p>

           <button 
           onClick={changeName}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" 
           >
             Change Name 
           </button>
        
        </div>
    )

}




export default WelcomeCard;