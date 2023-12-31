import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './index.css';

const Invoices = () => {
  const transactions = [
    { name: 'Christopher Barton', amount: 50, date: '2023-03-15', status: 'paid' },
    { name: 'Christopher Barton', amount: 30, date: '2023-03-18', status: 'active' },
    { name: 'Christopher Barton', amount: 20, date: '2023-03-22', status: 'unpaid' },
    { name: 'Christopher Barton', amount: 60, date: '2023-03-25', status: 'active' },
    { name: 'Christopher Barton', amount: 40, date: '2023-03-28', status: 'paidLate' },
    { name: 'Christopher Barton', amount: 35, date: '2023-04-01', status: 'paidEarly' },
  ];

  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filterStatus === 'all') return true;
    return (
      transaction.status === filterStatus ||
      (filterStatus === 'paid' && transaction.status === 'paidEarly') ||
      (filterStatus === 'paid' && transaction.status === 'paidLate')
    );
  });

  const renderTransactions = (transactions) => {
    return (
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className={`status-${transaction.status}`}>
            <div className="transaction-header">
              <span className="transaction-name">{transaction.name}</span>
              <span className="transaction-amount">${transaction.amount}</span>
            </div>
            <div className="transaction-details">
              <span className="transaction-date">{transaction.date}</span>
              <span
                className="transaction-status"
                style={{
                  color: getStatusColor(transaction.status),
                  border: `1px solid ${getStatusColor(transaction.status)}`,
                  borderRadius: '30px',
                  backgroundColor: `${getStatusColor(transaction.status)}10`, 
                  padding: '0px 5px', 
                  display: 'inline-block',
                }}
              >
                {transaction.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return '#20C375';
      case 'active':
        return '#1677FF';
      case 'unpaid':
        return '#C52CEE';
      case 'paidEarly':
        return '#FA8C16';
      case 'paidLate':
        return '#F5222D';
      default:
        return '#1677FF';
    }
  };

  return (
    <div className="outer-container">
         <div className="Invoiceheading">
            <h2>Invoices</h2>
        </div>
      <div className="tabs-container">
        <Link to="/create-invoice" variant="contained" color="primary"><Button>Create Invoice</Button></Link>
        <Link to="/delete-invoice" variant="contained" color="primary"><Button>Delete Invoice</Button></Link>
        <Link to="/pay-invoice" variant="contained" color="primary"><Button>Pay Invoice</Button></Link>
      </div>

      <div className="filter-dropdown">
        <select id="statusFilter" value={filterStatus} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="active">Active</option>
          <option value="paidLate">Paid Late</option>
          <option value="paidEarly">Paid Early</option>
        </select>
      </div>

      <div className="transaction-list">
        <h2>Transaction List</h2>
        {renderTransactions(filteredTransactions)}
        {renderTransactions(transactions)}
      </div>
    </div>
    
  );
};

export default Invoices;
