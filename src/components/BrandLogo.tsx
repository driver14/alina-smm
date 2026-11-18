import React from 'react'
import { motion } from 'framer-motion'

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  theme?: 'navy' | 'blush' | 'light' | 'glass'
  className?: string
  showSparkle?: boolean
  showShimmer?: boolean
  isHovered?: boolean
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  theme = 'navy',
  className = '',
  showSparkle = true,
  showShimmer = true,
}) => {
  // Dimension mapping with precise proportions
  const sizeConfig = {
    sm: { box: 'w-9 h-9', img: 'w-[22px] h-[27px]', sparkle: 'w-2.5 h-2.5', rounded: 'rounded-lg' },
    md: { box: 'w-11 h-11', img: 'w-[27px] h-[33px]', sparkle: 'w-3 h-3', rounded: 'rounded-xl' },
    lg: { box: 'w-14 h-14', img: 'w-[36px] h-[44px]', sparkle: 'w-4 h-4', rounded: 'rounded-2xl' },
    xl: { box: 'w-20 h-20', img: 'w-[52px] h-[63px]', sparkle: 'w-5 h-5', rounded: 'rounded-2xl' },
  }[size]

  // Theme styling
  // 'navy' = dark navy box with blush pink monogram (used in Navbar)
  // 'blush' = blush pink box with navy monogram (used in Footer or light accents)
  // 'light' = white/cream box with navy monogram
  // 'glass' = translucent glass box for dark hero/footer
  const themeStyles = {
    navy: {
      bg: 'bg-[#141937] border border-[#141937]/20 text-[#F3C3CF]',
      logoSrc: '/brand/logo-blush.png',
      sparkleColor: 'text-[#F3C3CF]',
      sparkleGlow: 'drop-shadow-[0_0_6px_rgba(243,195,207,0.9)]',
      shimmerGrad: 'from-transparent via-[#F3C3CF]/20 to-transparent',
    },
    blush: {
      bg: 'bg-[#F3C3CF] border border-[#F3C3CF]/40 text-[#141937]',
      logoSrc: '/brand/logo-navy.png',
      sparkleColor: 'text-[#141937]',
      sparkleGlow: 'drop-shadow-[0_0_4px_rgba(20,25,55,0.4)]',
      shimmerGrad: 'from-transparent via-white/40 to-transparent',
    },
    light: {
      bg: 'bg-white/95 border border-[#141937]/10 text-[#141937]',
      logoSrc: '/brand/logo-navy.png',
      sparkleColor: 'text-[#141937]',
      sparkleGlow: 'drop-shadow-[0_0_4px_rgba(20,25,55,0.3)]',
      shimmerGrad: 'from-transparent via-[#F3C3CF]/30 to-transparent',
    },
    glass: {
      bg: 'bg-white/10 hover:bg-white/15 border border-white/15 text-[#EEEBDA]',
      logoSrc: '/brand/logo-cream.png',
      sparkleColor: 'text-[#F3C3CF]',
      sparkleGlow: 'drop-shadow-[0_0_6px_rgba(243,195,207,0.9)]',
      shimmerGrad: 'from-transparent via-white/20 to-transparent',
    },
  }[theme]

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${sizeConfig.box} ${sizeConfig.rounded} ${themeStyles.bg} ${className}`}
    >
      {/* Luxury Shimmer Sweep Animation */}
      {showShimmer && (
        <motion.div
          className={`absolute inset-0 pointer-events-none bg-gradient-to-tr ${themeStyles.shimmerGrad} -skew-x-12`}
          initial={{ x: '-160%' }}
          animate={{ x: ['160%', '-160%', '-160%'] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.45, 1],
          }}
        />
      )}

      {/* Monogram Image Container */}
      <div className={`relative ${sizeConfig.img} flex items-center justify-center`}>
        <motion.img
          src={themeStyles.logoSrc}
          alt="Alina Voloshyna Monogram"
          className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-102"
          initial={{ opacity: 0.95 }}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.25 }}
        />

        {/* Animated Celestial Sparkle Flare on the 4-Point Star Tip */}
        {showSparkle && (
          <motion.div
            className={`absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 ${sizeConfig.sparkle} ${themeStyles.sparkleColor} ${themeStyles.sparkleGlow}`}
            style={{
              left: '19.6%',
              top: '20.8%',
            }}
            animate={{
              scale: [0.65, 1.25, 0.65],
              opacity: [0.35, 1, 0.35],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* 4-pointed sparkle diamond SVG */}
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full"
              fill="currentColor"
            >
              <path d="M12 0 C12 6.6 6.6 12 0 12 C6.6 12 12 17.4 12 24 C12 17.4 17.4 12 24 12 C17.4 12 12 6.6 12 0 Z" />
              {/* Central glowing core */}
              <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" opacity="0.9" />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  )
}
