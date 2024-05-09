import React from "react";
import "./Card.css"

const Card = ({face,img}) => {

    return ( 
       <div className="Card-area">
          <img
        className="Card"
        src={img}
        alt={face}
        />
       </div>
      
        
       
    )
}

export default Card;