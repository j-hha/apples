type ObserverCallbackFunction = (inView: boolean) => void;

export const isElementInview = (target:Element, callback:ObserverCallbackFunction) => {
    const options = {
        rootMargin: "0px",
        threshold: .5,
    };

  const observerCallback = (entries:Array<IntersectionObserverEntry>) => {
    callback(entries[0].isIntersecting);
  };
  
  
  const observer = new IntersectionObserver(observerCallback, options);

  return observer.observe(target);
};

