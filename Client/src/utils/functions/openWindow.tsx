export const openWindow = ({
    url,
    target = "_blank",
    features = "noopener,noreferrer",
  }: {
    url: string;
    target?: string;
    features?: string;
  }): void => {
    window.open(url, target, features);
  };
  