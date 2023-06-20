import React from 'react'
import Button from '@mui/material/Button'
import "../User/payments/success.css"
import { Link } from 'react-router-dom'

export default function OrderEmpty() {
  return <><body id='successbody'>
  <div className="card successorder">
  <div style={{borderRadius: 200, height: 200, width: 200, background: '#F8FAF5', margin: '0 auto'}}>
  <i id='icon' className="fa-sharp fa-solid fa-bag-shopping"></i>
  </div>
  <h1 id="osp">No Order Found</h1> 
  <p></p>
  <Button
        variant="contained"
        color="success"
        startIcon={<i className="fa fa-shopping-bag" aria-hidden="true"></i>}
         className='mt-5'
      ><Link to={"/"} id='link'>Continue Shoping</Link>
      </Button>
      <div className='mt-5'></div>
</div>

</body>
        </>
        }
        