import React, { useEffect, useState } from 'react';
import { TAhealth } from '../services/healthAPI';

const HealthCheck = () => {
  const [isHealthy, setIsHealthy] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await TAhealth();
        setIsHealthy(response.status === 'UP');
      } catch (error) {
        setIsHealthy(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="health-check-wrapper flex flex-row justify-center items-center text-center pr-3">
      <p className="mr-2">Server Status:</p>
      <div className={`w-3 h-3 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
    </div>
  );
};

export default HealthCheck;
