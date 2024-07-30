import axios from 'axios';
import './print.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PrintPreview({ Auth }) {
  const navigate = useNavigate();
  const [Item, setItem] = useState({});
  const { id } = useParams();

  const fetchBill = async () => {
    try {
      const item = await axios.get(`http://ec2-16-171-133-93.eu-north-1.compute.amazonaws.com:5000/getBillItem/${id}`);
      console.log(item.data);
      setItem(item.data);
    } catch (err) {
      console.error("Error fetching bill item:", err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchBill();
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [Auth, navigate]);

  if (!Item) {
    return <h1 className='text-danger text-center'>Loading...</h1>;
  }

  return (
    // <h1 className='text-dark'>Invoice</h1>
    <div className="container-fluid mt-4 justify-content-center text-center  "><h3>Invoices</h3>
      <div className="row">
        <div className="col-12 p-2"><h2 style={{ fontFamily: 'initial' }}>Billing</h2>
          <table border={'1'} width={'100%'}>
            <tr>
              {/* <th>Bill_id</th>
              <th>User_id</th> */}
              {/* <th>Customer_name</th> */}
              {/* <th>Email</th> */}
              {/* <th>Mode</th> */}
              {/* <th>Table_number</th>
              <th>Table_category</th> */}

              {/* <th>Items_ordered</th> */}
              <th>Item</th>
              <th>Unit Price</th>
              {/* <th>Date and Time</th> */}
              {/* <th>Status</th> */}
              <th>Quantity</th>
              <th>SubTotal</th>
            </tr>
          </table>

        </div>



        {/* <div className="col-3 bg-info">hello</div> */}
      </div>
    </div>





  )
}

export default PrintPreview;
