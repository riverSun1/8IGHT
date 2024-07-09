"use client";

import React from 'react';

const TeamList = ({ teams }) => {
  return (
    <div>
      {teams.map((team, index) => (
        <div key={index} className="flex items-center mb-4">
          <img src={team.profileImage} alt="팀 프로필" className="w-10 h-10 rounded-full mr-2" />
          <span className="text-sm font-semibold">{team.teamName}</span>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
