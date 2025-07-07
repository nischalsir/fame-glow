
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Instagram, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  score: number;
  tier: string;
}

export function SocialShare({ score, tier }: SocialShareProps) {
  const { toast } = useToast();

  const shareText = `I just calculated my Fame Score and got ${score}/100 as a ${tier}! 🌟 Calculate yours at Fame Calculator`;

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so we copy to clipboard
        navigator.clipboard.writeText(`${shareText} ${url}`);
        toast({
          title: "Copied to clipboard!",
          description: "Text copied for Instagram sharing",
        });
        return;
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${url}`);
        toast({
          title: "Copied to clipboard!",
          description: "Share text copied successfully",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Share2 className="w-5 h-5" />
          <span>Share Your Results</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Show off your fame score to your followers!
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleShare('twitter')}
            className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950"
          >
            <Twitter className="w-4 h-4 text-blue-400" />
            <span>Twitter</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleShare('instagram')}
            className="flex items-center space-x-2 hover:bg-pink-50 hover:border-pink-300 dark:hover:bg-pink-950"
          >
            <Instagram className="w-4 h-4 text-pink-500" />
            <span>Instagram</span>
          </Button>
        </div>
        
        <Button
          variant="outline"
          onClick={() => handleShare('copy')}
          className="w-full flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Copy Share Text</span>
        </Button>
      </CardContent>
    </Card>
  );
}
