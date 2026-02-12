// src/components/VitalSignCard.jsx
import React from 'react';

const VitalSignCard = ({ title, value, unit, range, status, icon: Icon, percentage }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon size={20} className="text-accent" />
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        <span className="text-sm text-green-600 font-medium">{status}</span>
      </div>
      
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900">
          {value} <span className="text-lg font-normal text-gray-600">{unit}</span>
        </div>
        <div className="text-sm text-gray-500">Normal range: {range}</div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-accent h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default VitalSignCard;