export const isElementInview = (target:Element, callback:Function) => {
    const options = {
        rootMargin: "0px",
        threshold: .85,
    };

  const observerCallback = (entries:Array<IntersectionObserverEntry>, observer:IntersectionObserver) => {
    callback(entries[0].isIntersecting);
  };
  
  
  const observer = new IntersectionObserver(observerCallback, options);

  return observer.observe(target);
};

