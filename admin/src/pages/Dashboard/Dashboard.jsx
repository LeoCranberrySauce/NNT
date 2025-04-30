import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ url }) => {
  const [stats, setStats] = useState({
    totalFoods: 0,
    totalCategories: 0,
    totalManagers: 0,
    totalCustomers: 0,
    totalSales: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url + "/api/admin/stats");
        if (response.data.success) {
          setStats(response.data.data);
        } else {
          setError('Failed to fetch dashboard statistics');
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Error fetching dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [url]);


  const formatCurrency2 = (value) => {
    return `PHP ${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const statCardsRole = [
    {
      title: 'Total Managers',
      value: stats.totalManagers,
      icon: '👨‍💼',
      color: 'blue'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: '👥',
      color: 'green'
    }
  ];

  const statCardsEconomy = [
    {
      title: 'Orders',
      value: stats.totalSales,
      icon: '💰',
      color: 'yellow'
    },
    {
      title: 'Revenue',
      value: formatCurrency2(stats.totalRevenue || 0),
      icon: '💵',
      color: 'purple'
    },
    {
      title: 'Orders Delivered',
      value: stats.totalSalesDelivered,
      icon: '💰',
      color: 'yellow'
    },
    {
      title: 'Revenue Received',
      value: formatCurrency2(stats.totalRevenueDelivered || 0),
      icon: '💵',
      color: 'purple'
    }
  ];

  const statCardsFoods = [
    {
      title: 'Total Number of Foods',
      value: stats.totalFoods,
      icon: '🥡',
      color: 'red'
    },
    {
      title: 'Total Number of Categories',
      value: stats.totalCategories,
      icon: '🥡',
      color: 'orange'
    }
  ];

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard Overview</h1>
        </div>
        <div className="dashboard-grid">
          {[1, 2].map((index) => (
            <div key={index} className="loading-skeleton">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        <div className="dashboard-grid">
          {[3, 4, 5, 6].map((index) => (
            <div key={index} className="loading-skeleton">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        <div className="dashboard-grid">
          {[7, 8].map((index) => (
            <div key={index} className="loading-skeleton">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard Overview</h1>
        </div>
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
      </div>

      <h2 className="stat-card-header">Admins and Customers</h2>
      <div className="dashboard-grid">
        {statCardsRole.map((card, index) => (
          <div
            key={index}
            className={`stat-card stat-card-${card.color}`}
          >
            <div className="stat-card-content">
              <div className="stat-card-text">
                <p className="stat-card-title">{card.title}</p>
                <p className="stat-card-value">{card.value}</p>
              </div>
              <span className="stat-card-icon">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="stat-card-header">Sales and Revenue</h2>
      <div className="dashboard-grid">
        {statCardsEconomy.map((card, index) => (
          <div
            key={index}
            className={`stat-card stat-card-${card.color}`}
          >
            <div className="stat-card-content">
              <div className="stat-card-text">
                <p className="stat-card-title">{card.title}</p>
                <p className="stat-card-value">{card.value}</p>
              </div>
              <span className="stat-card-icon">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="stat-card-header">Foods and Categories</h2>
      <div className="dashboard-grid">
        {statCardsFoods.map((card, index) => (
          <div
            key={index}
            className={`stat-card stat-card-${card.color}`}
          >
            <div className="stat-card-content">
              <div className="stat-card-text">
                <p className="stat-card-title">{card.title}</p>
                <p className="stat-card-value">{card.value}</p>
              </div>
              <span className="stat-card-icon">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;