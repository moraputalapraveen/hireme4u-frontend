interface AdSenseSlotProps {
  variant: 'banner' | 'sidebar' | 'in-content';
  className?: string;
}

export function AdSenseSlot({ variant, className = '' }: AdSenseSlotProps) {
  const getAdDimensions = () => {
    switch (variant) {
      case 'banner':
        return 'h-24 md:h-32';
      case 'sidebar':
        return 'h-64';
      case 'in-content':
        return 'h-48';
      default:
        return 'h-32';
    }
  };

  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${getAdDimensions()} ${className}`}
    >
      <div className="text-center text-gray-500">
        <p className="font-semibold">Advertisement</p>
        <p className="text-sm">
          {variant === 'banner' && 'Banner Ad (728x90)'}
          {variant === 'sidebar' && 'Sidebar Ad (300x250)'}
          {variant === 'in-content' && 'In-Content Ad (336x280)'}
        </p>
        <p className="text-xs mt-1">Google AdSense Placeholder</p>
      </div>
    </div>
  );
}
