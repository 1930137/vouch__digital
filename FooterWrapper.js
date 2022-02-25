
import React from 'react';

const FooterWrapper = (Footer) => {
     const footer = () => {
         return ( 
            <footer className="pt-4 my-md-5 pt-md-5 border-top"> 
                
                < Footer />

             </footer>
          );
     }
      
     return footer;
}
 
export default FooterWrapper;
