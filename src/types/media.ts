export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  mobile?: {
    src: string;
    width: number;
    height: number;
  };
  caption?: string;
}

export interface SocialImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  type: string;
}
