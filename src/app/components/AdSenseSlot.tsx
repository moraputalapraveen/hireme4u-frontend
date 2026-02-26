interface AdSenseSlotProps {
  variant: 'banner' | 'sidebar' | 'in-content' | 'mobile' | 'social';
  className?: string;
}

export function AdSenseSlot({ variant, className = '' }: AdSenseSlotProps) {
  
  // 468x60 Banner - Top of pages
  if (variant === 'banner') {
    return (
      <div className={`flex justify-center my-4 ${className}`}>
        <div className="hidden md:block">
          <script
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : '9ef143c745dfa101b368366a0caa0ed5',
                  'format' : 'iframe',
                  'height' : 60,
                  'width' : 468,
                  'params' : {}
                };
              `
            }}
          />
          <script src="https://www.highperformanceformat.com/9ef143c745dfa101b368366a0caa0ed5/invoke.js" />
        </div>
      </div>
    );
  }

  // 300x250 - Sidebar or In-content
  if (variant === 'sidebar' || variant === 'in-content') {
    return (
      <div className={`my-4 flex justify-center ${className}`}>
        <div className="w-[300px] h-[250px]">
          <script
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : 'e39630edcccbea70e7a41b946a5561b2',
                  'format' : 'iframe',
                  'height' : 250,
                  'width' : 300,
                  'params' : {}
                };
              `
            }}
          />
          <script src="https://www.highperformanceformat.com/e39630edcccbea70e7a41b946a5561b2/invoke.js" />
        </div>
      </div>
    );
  }

  // 160x600 - Tall Skyscraper (for side panels)
  if (variant === 'skyscraper') {
    return (
      <div className={`my-4 flex justify-center ${className}`}>
        <div className="w-[160px] h-[600px]">
          <script
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : '253522eb73b2ee61720be806349f52ba',
                  'format' : 'iframe',
                  'height' : 600,
                  'width' : 160,
                  'params' : {}
                };
              `
            }}
          />
          <script src="https://www.highperformanceformat.com/253522eb73b2ee61720be806349f52ba/invoke.js" />
        </div>
      </div>
    );
  }

  // 320x50 - Mobile Banner
  if (variant === 'mobile') {
    return (
      <div className={`my-2 flex justify-center md:hidden ${className}`}>
        <div className="w-[320px] h-[50px]">
          <script
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : 'b181a800e7a3653e842707340db9c66a',
                  'format' : 'iframe',
                  'height' : 50,
                  'width' : 320,
                  'params' : {}
                };
              `
            }}
          />
          <script src="https://www.highperformanceformat.com/b181a800e7a3653e842707340db9c66a/invoke.js" />
        </div>
      </div>
    );
  }

  // Social Bar - Sticky at bottom
  if (variant === 'social') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <script src="https://pl28801175.effectivegatecpm.com/41/ff/9b/41ff9bb96eb2b1e8796b79f11ffdaef1.js" />
      </div>
    );
  }

  return null;
}