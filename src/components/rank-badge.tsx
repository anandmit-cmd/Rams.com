
import { Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Rank = 'gold' | 'silver' | 'bronze';

const rankConfig = {
    gold: {
        label: 'Gold',
        className: 'bg-yellow-400 text-yellow-900 border-yellow-500',
        icon: <Award className="w-3 h-3" />
    },
    silver: {
        label: 'Silver',
        className: 'bg-slate-300 text-slate-800 border-slate-400',
        icon: <Award className="w-3 h-3" />
    },
    bronze: {
        label: 'Bronze',
        className: 'bg-amber-600 text-white border-amber-700',
        icon: <Award className="w-3 h-3" />
    }
};

export function RankBadge({ rank, className }: { rank: Rank, className?: string }) {
    const { label, className: rankClassName, icon } = rankConfig[rank];
    return (
        <Badge className={`text-xs z-10 ${rankClassName} ${className}`}>
            {icon}
            {label}
        </Badge>
    );
};
