
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
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-black mb-2 text-white drop-shadow-lg">
          {festivalData.festival}
        </h1>
        <p className="text-lg font-medium opacity-95 mb-4 text-white drop-shadow-md">
          {festivalData.year} • {festivalData.edition_theme} • Weekend {festivalData.weekend}
        </p>
        <div className="flex flex-wrap gap-2">
          {['Wonder', 'Love', 'Anger', 'Joy', 'Desire', 'Sadness'].map((emotion, i) => (
            <span key={i} className="bg-white/25 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide text-white">
              {emotion}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};
