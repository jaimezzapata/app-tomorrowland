
import festivalData from '../utils/dataTransform';

export const Header = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/section-header-theme.webp" 
          alt="Tomorrowland Consciencia Theme"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-14 px-4">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src="/logo.png" 
            alt="Tomorrowland Logo"
            className="h-16 md:h-20 drop-shadow-2xl"
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black mb-2 text-white drop-shadow-lg">
          {festivalData.festival}
        </h1>
        <p className="text-lg font-medium opacity-95 text-white drop-shadow-md">
          {festivalData.year} • {festivalData.edition_theme} • Weekend {festivalData.weekend}
        </p>
      </div>
    </header>
  );
};
