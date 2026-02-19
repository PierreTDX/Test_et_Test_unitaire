/**
 * @file reportWebVitals.js
 * @description Utility to measure and report web vitals performance metrics.
 */

/**
 * Reports web vitals metrics to a provided callback.
 * @param {Function} [onPerfEntry] - Callback function to handle performance entries.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
