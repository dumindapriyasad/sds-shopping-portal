// Admin dashboard

import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Initialize chart js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Config chart
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

// Functionalities
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  // Get sales summary
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  // Customize sales data
  const data = {
    labels: summary.salesData.map((x) => x._id), // Month view. Ex: 2023/01, 2023/03
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(162, 222, 208, 1)',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="grid  md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard" className="font-bold">
                Dashboard
              </Link>
            </li>

            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>

            <li>
              <Link href="/admin/products">Products</Link>
            </li>

            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h1 className="mb-4 text-xl">Admin Dashboard</h1>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="card m-5 p-5">
                  <p className="text-3xl">LKR {Math.round(summary.ordersPrice)}</p>
                  <p>Sales</p>
                  <Link href="/admin/orders">View sales</Link>
                </div>

                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.ordersCount} </p>
                  <p>Orders</p>
                  <Link href="/admin/orders">View orders</Link>
                </div>

                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.productsCount} </p>
                  <p>Products</p>
                  <Link href="/admin/products">View products</Link>
                </div>

                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.usersCount} </p>
                  <p>Users</p>
                  <Link href="/admin/users">View users</Link>
                </div>
              </div>

              <h2 className="text-xl">Sales Report</h2>

              <Bar
                options={{
                  legend: { display: true, position: 'right' },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboardScreen;

// Protected page (admin login required)
AdminDashboardScreen.auth = { adminOnly: true };
