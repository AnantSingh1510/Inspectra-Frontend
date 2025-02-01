'use client';

import { Card, Text } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const LineChartComponent = ( {reviewData} ) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={reviewData}
        margin={{
          top: 40,
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="PRs" stroke="#3b82f6" />
        {/* <Line type="monotone" dataKey="Reviews" stroke="#8b5cf6" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Card.Root bg='rgba(61, 61, 61, 0.4)'>
        <Card.Body>
          <Text>{label}</Text>
          <Text>
            Code Review Requests: {payload[0].value}
          </Text>
          {/* <p className="text-sm text-indigo-400">
            Review requests:
            <span className="ml-2">{payload[1].value}</span>
          </p> */}
        </Card.Body>
      </Card.Root>

    );
  }
};