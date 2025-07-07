
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Calculator, ChevronDown, Moon, Sun, Share2, Twitter, Instagram, Youtube, Heart } from 'lucide-react';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import { SocialShare } from '@/components/SocialShare';
import { FameResult } from '@/components/FameResult';

export function Dashboard() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}

function DashboardContent() {
  const { theme, toggleTheme } = useTheme();
  const [platform, setPlatform] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [engagement, setEngagement] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; tier: string; description: string } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!platform) newErrors.platform = 'Please select a platform';
    if (!followers) newErrors.followers = 'Followers count is required';
    if (!following) newErrors.following = 'Following count is required';
    
    const followersNum = parseInt(followers);
    const followingNum = parseInt(following);
    
    if (followersNum < 0) newErrors.followers = 'Followers must be positive';
    if (followingNum < 0) newErrors.following = 'Following must be positive';
    if (followersNum && followingNum && followingNum > followersNum * 10) {
      newErrors.following = 'Following count seems unusually high';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateFame = async () => {
    if (!validateInputs()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const followersNum = parseInt(followers);
    const engagementNum = engagement ? parseInt(engagement) : followersNum * 0.05;
    
    // Fame calculation algorithm
    let score = 0;
    
    // Base score from followers
    if (followersNum >= 10000000) score += 40;
    else if (followersNum >= 1000000) score += 30;
    else if (followersNum >= 100000) score += 20;
    else if (followersNum >= 10000) score += 10;
    else score += 5;
    
    // Engagement rate bonus
    const engagementRate = engagementNum / followersNum;
    if (engagementRate > 0.1) score += 30;
    else if (engagementRate > 0.05) score += 20;
    else if (engagementRate > 0.02) score += 10;
    else score += 5;
    
    // Platform multiplier
    const platformMultiplier = {
      'instagram': 1.2,
      'youtube': 1.3,
      'twitter': 1.0,
      'tiktok': 1.1
    }[platform] || 1.0;
    
    score = Math.min(100, Math.round(score * platformMultiplier));
    
    // Determine tier
    let tier = '';
    let description = '';
    
    if (score >= 90) {
      tier = 'Global Icon';
      description = 'You are among the most famous people on the planet!';
    } else if (score >= 75) {
      tier = 'Celebrity';
      description = 'You have achieved celebrity status with massive influence!';
    } else if (score >= 60) {
      tier = 'Influencer';
      description = 'You are a recognized influencer in your field!';
    } else if (score >= 40) {
      tier = 'Rising Star';
      description = 'You are on your way to fame with growing influence!';
    } else if (score >= 20) {
      tier = 'Content Creator';
      description = 'You are building a solid online presence!';
    } else {
      tier = 'Getting Started';
      description = 'Keep creating content to grow your fame!';
    }
    
    setResult({ score, tier, description });
    setIsLoading(false);
  };

  const resetForm = () => {
    setPlatform('');
    setFollowers('');
    setFollowing('');
    setEngagement('');
    setResult(null);
    setErrors({});
    setIsAdvancedOpen(false);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl gradient-bg">
              <Calculator className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Fame Calculator</h1>
              <p className="text-muted-foreground">Discover your social media fame score</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Sun className="w-4 h-4" />
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            <Moon className="w-4 h-4" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shimmer">
            <CardHeader>
              <CardTitle>Calculate Your Fame</CardTitle>
              <CardDescription>
                Enter your social media statistics to get your fame score
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Platform Selection */}
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className={errors.platform ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border">
                    <SelectItem value="instagram">
                      <div className="flex items-center space-x-2">
                        <Instagram className="w-4 h-4 text-pink-500" />
                        <span>Instagram</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="twitter">
                      <div className="flex items-center space-x-2">
                        <Twitter className="w-4 h-4 text-blue-400" />
                        <span>Twitter</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="youtube">
                      <div className="flex items-center space-x-2">
                        <Youtube className="w-4 h-4 text-red-500" />
                        <span>YouTube</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="tiktok">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full" />
                        <span>TikTok</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.platform && <p className="text-sm text-destructive">{errors.platform}</p>}
              </div>

              {/* Basic Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="followers">Followers</Label>
                  <Input
                    id="followers"
                    type="number"
                    placeholder="0"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    className={errors.followers ? 'border-destructive' : ''}
                  />
                  {errors.followers && <p className="text-sm text-destructive">{errors.followers}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="following">Following</Label>
                  <Input
                    id="following"
                    type="number"
                    placeholder="0"
                    value={following}
                    onChange={(e) => setFollowing(e.target.value)}
                    className={errors.following ? 'border-destructive' : ''}
                  />
                  {errors.following && <p className="text-sm text-destructive">{errors.following}</p>}
                </div>
              </div>

              {/* Advanced Section */}
              <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    Advanced Settings
                    <ChevronDown className={`w-4 h-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="engagement">Monthly Engagement</Label>
                    <Input
                      id="engagement"
                      type="number"
                      placeholder="Likes, comments, shares per month"
                      value={engagement}
                      onChange={(e) => setEngagement(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional: Total likes, comments, and shares in the last month
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Separator />

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  onClick={calculateFame}
                  disabled={isLoading}
                  className="flex-1 gradient-bg hover:opacity-90 transition-opacity"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Calculating...</span>
                    </div>
                  ) : (
                    'Calculate Fame'
                  )}
                </Button>
                
                <Button variant="outline" onClick={resetForm}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <FameResult result={result} />
            ) : (
              <Card className="float-animation">
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full gradient-bg flex items-center justify-center">
                      <Calculator className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Ready to Calculate</h3>
                      <p className="text-muted-foreground">
                        Fill in your details to see your fame score
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {result && <SocialShare score={result.score} tier={result.tier} />}
          </div>
        </div>

        {/* Footer Attribution */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by</span>
            <a 
              href="https://instagram.com/nischal_sir" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Nischal
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
