"use client";

import { useState } from 'react';
import { Share2, Linkedin, Twitter, Mail, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { SOCIAL_SHARE_PLATFORMS } from '@/lib/constants';
import type { SocialShareData } from '@/types/blog';

interface SocialShareProps {
  data: SocialShareData;
  variant?: 'default' | 'compact';
  className?: string;
}

export function SocialShare({ data, variant = 'default', className }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShare = (platform: typeof SOCIAL_SHARE_PLATFORMS[number]) => {
    const shareUrl = platform.getShareUrl(data);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'Twitter':
        return <Twitter className="h-4 w-4" />;
      case 'Mail':
        return <Mail className="h-4 w-4" />;
      default:
        return <Share2 className="h-4 w-4" />;
    }
  };

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={className}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {SOCIAL_SHARE_PLATFORMS.map((platform) => (
            <DropdownMenuItem
              key={platform.name}
              onClick={() => handleShare(platform)}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {getIcon(platform.icon)}
                <span>Share on {platform.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
            <div className="flex items-center gap-2">
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <div className="flex items-center gap-2">
        {SOCIAL_SHARE_PLATFORMS.map((platform) => (
          <Button
            key={platform.name}
            variant="outline"
            size="sm"
            onClick={() => handleShare(platform)}
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            title={`Share on ${platform.name}`}
          >
            {getIcon(platform.icon)}
            <span className="sr-only">Share on {platform.name}</span>
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          title="Copy link"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
          <span className="sr-only">{copied ? 'Copied!' : 'Copy link'}</span>
        </Button>
      </div>
    </div>
  );
}

// Alternative inline share buttons for blog posts
export function InlineSocialShare({ data, className }: { data: SocialShareData; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShare = (platform: typeof SOCIAL_SHARE_PLATFORMS[number]) => {
    const shareUrl = platform.getShareUrl(data);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'Twitter':
        return <Twitter className="h-5 w-5" />;
      case 'Mail':
        return <Mail className="h-5 w-5" />;
      default:
        return <Share2 className="h-5 w-5" />;
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="text-sm font-medium text-muted-foreground">
        Share this article
      </div>
      <div className="flex flex-col gap-2">
        {SOCIAL_SHARE_PLATFORMS.map((platform) => (
          <Button
            key={platform.name}
            variant="ghost"
            size="sm"
            onClick={() => handleShare(platform)}
            className="justify-start gap-3 h-auto p-3 hover:bg-muted"
          >
            <div 
              className="p-2 rounded-full"
              style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
            >
              {getIcon(platform.icon)}
            </div>
            <span>Share on {platform.name}</span>
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="justify-start gap-3 h-auto p-3 hover:bg-muted"
        >
          <div className="p-2 rounded-full bg-muted">
            {copied ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Link2 className="h-5 w-5" />
            )}
          </div>
          <span>{copied ? 'Link copied!' : 'Copy link'}</span>
        </Button>
      </div>
    </div>
  );
}

// Floating share buttons for blog posts
export function FloatingSocialShare({ data }: { data: SocialShareData }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShare = (platform: typeof SOCIAL_SHARE_PLATFORMS[number]) => {
    const shareUrl = platform.getShareUrl(data);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'Twitter':
        return <Twitter className="h-4 w-4" />;
      case 'Mail':
        return <Mail className="h-4 w-4" />;
      default:
        return <Share2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
      {SOCIAL_SHARE_PLATFORMS.map((platform) => (
        <Button
          key={platform.name}
          variant="outline"
          size="sm"
          onClick={() => handleShare(platform)}
          className="w-10 h-10 p-0 rounded-full shadow-lg hover:shadow-xl transition-all"
          title={`Share on ${platform.name}`}
        >
          {getIcon(platform.icon)}
          <span className="sr-only">Share on {platform.name}</span>
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="w-10 h-10 p-0 rounded-full shadow-lg hover:shadow-xl transition-all"
        title="Copy link"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
        <span className="sr-only">{copied ? 'Copied!' : 'Copy link'}</span>
      </Button>
    </div>
  );
}