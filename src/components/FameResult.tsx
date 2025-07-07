
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, TrendingUp, Users } from 'lucide-react';

interface FameResultProps {
  result: {
    score: number;
    tier: string;
    description: string;
  };
}

export function FameResult({ result }: FameResultProps) {
  const { score, tier, description } = result;

  const getTierIcon = () => {
    if (score >= 90) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (score >= 75) return <Star className="w-6 h-6 text-purple-500" />;
    if (score >= 60) return <TrendingUp className="w-6 h-6 text-blue-500" />;
    if (score >= 40) return <TrendingUp className="w-6 h-6 text-green-500" />;
    return <Users className="w-6 h-6 text-gray-500" />;
  };

  const getTierColor = () => {
    if (score >= 90) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    if (score >= 75) return 'bg-gradient-to-r from-purple-400 to-pink-500';
    if (score >= 60) return 'bg-gradient-to-r from-blue-400 to-indigo-500';
    if (score >= 40) return 'bg-gradient-to-r from-green-400 to-emerald-500';
    return 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const getScoreColor = () => {
    if (score >= 90) return 'text-yellow-500';
    if (score >= 75) return 'text-purple-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-green-500';
    return 'text-gray-500';
  };

  return (
    <Card className="pulse-glow">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          {getTierIcon()}
          <span>Your Fame Score</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Display */}
        <div className="text-center space-y-4">
          <div className={`text-6xl font-bold ${getScoreColor()}`}>
            {score}
          </div>
          <div className="space-y-2">
            <Badge className={`${getTierColor()} text-white px-4 py-2 text-lg`}>
              {tier}
            </Badge>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Fame Level</span>
            <span>{score}/100</span>
          </div>
          <Progress value={score} className="h-3" />
        </div>

        {/* Fame Levels */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <span className={score >= 0 ? 'font-medium' : 'text-muted-foreground'}>Getting Started (0-19)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className={score >= 20 ? 'font-medium' : 'text-muted-foreground'}>Content Creator (20-39)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className={score >= 40 ? 'font-medium' : 'text-muted-foreground'}>Rising Star (40-59)</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-indigo-400" />
              <span className={score >= 60 ? 'font-medium' : 'text-muted-foreground'}>Influencer (60-74)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className={score >= 75 ? 'font-medium' : 'text-muted-foreground'}>Celebrity (75-89)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className={score >= 90 ? 'font-medium' : 'text-muted-foreground'}>Global Icon (90-100)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
