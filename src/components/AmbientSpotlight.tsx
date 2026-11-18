import React from 'react'

export const AmbientSpotlight: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {/* Soft, calm breathing aura orbs in deep background without any cursor-following haze */}
      <div className="absolute top-1/4 -left-32 w-[420px] h-[420px] bg-[#F3C3CF]/10 rounded-full blur-3xl animate-orb-1 pointer-events-none" />
      <div className="absolute top-2/3 -right-32 w-[450px] h-[450px] bg-[#141937]/5 rounded-full blur-3xl animate-orb-2 pointer-events-none" />
    </div>
  )
}
