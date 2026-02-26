import { useEffect, useRef } from 'react';

interface AdSenseSlotProps {
  variant: 'banner' | 'sidebar' | 'in-content' | 'mobile' | 'social';
  className?: string;
}

export function AdSenseSlot({ variant, className = '' }: AdSenseSlotProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const inContentRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  // Function to load script
  const loadScript = (
    ref: React.RefObject<HTMLDivElement>, 
    key: string, 
    width: number, 
    height: number
  ) => {
    // Check if ref.current exists
    if (!ref || !ref.current) return;

    // Clear any existing content
    ref.current.innerHTML = '';

    // Create and set atOptions
    const atOptions = document.createElement('script');
    atOptions.type = 'text/javascript';
    atOptions.innerHTML = `
      atOptions = {
        'key' : '${key}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;
    ref.current.appendChild(atOptions);

    // Create and load the invoke script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
    script.async = true;
    ref.current.appendChild(script);
  };

  // Load banner ad
  useEffect(() => {
    if (variant === 'banner') {
      loadScript(bannerRef, '9ef143c745dfa101b368366a0caa0ed5', 468, 60);
    }
  }, [variant]);

  // Load sidebar ad
  useEffect(() => {
    if (variant === 'sidebar') {
      loadScript(sidebarRef, 'e39630edcccbea70e7a41b946a5561b2', 300, 250);
    }
  }, [variant]);

  // Load in-content ad
  useEffect(() => {
    if (variant === 'in-content') {
      loadScript(inContentRef, 'e39630edcccbea70e7a41b946a5561b2', 300, 250);
    }
  }, [variant]);

  // Load mobile ad
  useEffect(() => {
    if (variant === 'mobile') {
      loadScript(mobileRef, 'b181a800e7a3653e842707340db9c66a', 320, 50);
    }
  }, [variant]);

  // Load social bar
  useEffect(() => {
    if (variant === 'social') {
      if (!socialRef.current) return;
      socialRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://pl28801175.effectivegatecpm.com/41/ff/9b/41ff9bb96eb2b1e8796b79f11ffdaef1.js';
      script.async = true;
      socialRef.current.appendChild(script);
    }
  }, [variant]);

  // Render based on variant
  if (variant === 'banner') {
    return (
      <div className={`flex justify-center my-4 ${className}`}>
        <div className="hidden md:block">
          <div ref={bannerRef}></div>
        </div>
        <div className="md:hidden text-xs text-gray-400">Ad Space</div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`my-4 flex justify-center ${className}`}>
        <div className="w-[300px] h-[250px]">
          <div ref={sidebarRef}></div>
        </div>
      </div>
    );
  }

  if (variant === 'in-content') {
    return (
      <div className={`my-6 flex justify-center ${className}`}>
        <div className="w-[300px] h-[250px]">
          <div ref={inContentRef}></div>
        </div>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className={`my-2 flex justify-center md:hidden ${className}`}>
        <div className="w-[320px] h-[50px]">
          <div ref={mobileRef}></div>
        </div>
      </div>
    );
  }

  if (variant === 'social') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div ref={socialRef}></div>
      </div>
    );
  }

  return null;
}