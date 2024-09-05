import React, { createContext, useState, ReactNode } from 'react';

export interface Hackathon {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
  level: 'Easy' | 'Medium' | 'Hard';
}

interface HackathonContextProps {
  hackathons: Hackathon[];
  addHackathon: (hackathon: Hackathon) => void;
  updateHackathon: (updatedHackathon: Hackathon) => void;
  deleteHackathon: (id: number) => void;
}

export const HackathonContext = createContext<HackathonContextProps | undefined>(undefined);

export const HackathonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);

  const addHackathon = (hackathon: Hackathon) => {
    setHackathons([...hackathons, hackathon]);
  };

  const updateHackathon = (updatedHackathon: Hackathon) => {
    setHackathons(
      hackathons.map((hack) => (hack.id === updatedHackathon.id ? updatedHackathon : hack))
    );
  };

  const deleteHackathon = (id: number) => {
    setHackathons(hackathons.filter((hack) => hack.id !== id));
  };

  return (
    <HackathonContext.Provider
      value={{ hackathons, addHackathon, updateHackathon, deleteHackathon }}
    >
      {children}
    </HackathonContext.Provider>
  );
};
