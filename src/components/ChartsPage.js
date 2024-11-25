import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../api/api';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {Chart, ArcElement} from 'chart.js'
import "./ChartsPage.css";
Chart.register(ArcElement);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartsPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers();
      console.log('Fetched users:', data); // Kiểm tra danh sách trả về
      setUsers(data); // Cập nhật state `users` với mảng kết quả
    };
    fetchData();
  }, []);

  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [{
      data: [
        users.filter(user => user.gender === 'male').length,
        users.filter(user => user.gender === 'female').length
      ],
      backgroundColor: ['#36A2EB', '#FF6384']
    }]
  };

  const ageData = {
    labels: ['Teen', '20s', '30s', '40s', '50+'],
    datasets: [{
      data: [
        users.filter(user => user.age < 20).length,
        users.filter(user => user.age >= 20 && user.age < 30).length,
        users.filter(user => user.age >= 30 && user.age < 40).length,
        users.filter(user => user.age >= 40 && user.age < 50).length,
        users.filter(user => user.age >= 50).length
      ],
      backgroundColor: ['#FFCE56', '#FF6384', '#36A2EB', '#4BC0C0', '#FF9F40']
    }]
  };

  const regionData = {
    labels: [...new Set(users.map(user => user.region))],
    datasets: [{
      data: users.reduce((acc, user) => {
        const index = acc.findIndex(item => item.region === user.region);
        if (index === -1) {
          acc.push({ region: user.region, count: 1 });
        } else {
          acc[index].count += 1;
        }
        return acc;
      }, []).map(item => item.count),
      backgroundColor: ['#FF9F40', '#4BC0C0', '#36A2EB', '#FF6384']
    }]
  };

  return (
    <div>
      <h1>User Analytics</h1>
      <div>
        <h2>Gender Distribution</h2>
        <Pie data={genderData} />
      </div>
      <div>
        <h2>Age Distribution</h2>
        <Bar data={ageData} />
      </div>
      <div>
        <h2>Region Distribution</h2>
        <Bar data={regionData} />
      </div>
    </div>
  );
}

export default ChartsPage;