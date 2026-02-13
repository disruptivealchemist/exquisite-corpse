'use client';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
}

export default function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150',
        'cursor-pointer active:translate-y-[1px] font-body border',
        selected
          ? 'bg-[#c71f2d] text-[#f4f4f4] border-[#c71f2d] shadow-sm'
          : 'bg-white text-[#292928] border-[#292928]/25 hover:bg-[#292928]/8 hover:border-[#292928]/45',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
