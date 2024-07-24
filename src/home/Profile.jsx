import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
// import {} from 'react-router-dom'

function Profile({ setAuth, Auth }) {
    const [Placed, setPlaced] = useState(0);
    const [Orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const getCurrent = async () => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            try {
                const user = (await axios.get(`http://localhost:5000/getOriginal/${localStorage.getItem('token')}`)).data.u_id;
                const res = await axios.get(`http://localhost:5000/getBills/${user}`);
                setOrders(res.data);
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching current user data:", error);
            }
        }
    };

    useEffect(() => {
        getCurrent();
    }, []);

    const printNow = () => {
        console.log("Print Now")
    }

    const payNow = async (e) => {
        console.log("Pay Now")
        try {
            const res = await axios.get(`http://localhost:5000/payNow/${e}`);
            console.log(res.data);
            // Optionally alert the user
            alert(res.data.Status);

            // Fetch updated orders list
            getCurrent();
        } catch (error) {
            console.error("Error during payment:", error);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [Auth, navigate]);

    return (
        <>
            <div className="container p-5 my-5">
                <div className="row my-5">
                    <div className="col-md-12 text-center">
                        <h2 className='fw-bold'>{"Sarthak Misal" || Orders[0]?.customer_name}</h2>
                    </div>
                    <div className="col-md-12 d-flex justify-content-between">
                        <h4>Ordered Date</h4>
                        <h4>Status</h4>
                        <h4>Price</h4>
                        <h4>Action</h4>
                    </div>

                    {Orders.length > 0 ? (
                        Orders.map((ele, index) => (
                            <div className="col-md-12 d-flex justify-content-between" key={ele.id}>
                                <h6>{ele.date_modified.substring(0, 10)}</h6>
                                <h6>{ele.status}</h6>
                                <h6>{ele.price_paid}</h6>
                                {ele.status === "unpaid" ? (
                                    <span onClick={() => payNow(ele.bill_id)} className='cursor-pointer text-info p-1 rounded-pill'>Pay</span>
                                ) : (
                                    <NavLink to={`/print/${ele.bill_id}`}><span onClick={printNow} className='cursor-pointer text-info p-0'><i className='h4 fa-solid fa-print'></i></span></NavLink>
                                )}
                            </div>
                        ))
                    ) : (
                        <h1 className='text-danger text-center'>Loading</h1>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;
