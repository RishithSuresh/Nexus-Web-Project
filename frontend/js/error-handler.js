/**
 * Error Handler Module
 * Centralized error handling and logging
 */

class ErrorHandler {
    constructor() {
        this.errors = [];
        this.setupGlobalErrorHandlers();
    }

    // Setup global error handlers
    setupGlobalErrorHandlers() {
        // Handle uncaught errors
        window.addEventListener('error', (event) => {
            this.logError('Uncaught Error', event.error);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled Promise Rejection', event.reason);
        });
    }

    // Log error
    logError(title, error, context = {}) {
        const errorLog = {
            title,
            message: error?.message || String(error),
            stack: error?.stack || '',
            context,
            timestamp: new Date().toISOString()
        };

        this.errors.push(errorLog);

        // Keep only last 50 errors
        if (this.errors.length > 50) {
            this.errors.shift();
        }

        // Log to console in development
        console.error(`[${title}]`, error, context);

        // Store in localStorage for debugging
        try {
            localStorage.setItem('errorLogs', JSON.stringify(this.errors));
        } catch (e) {
            console.warn('Could not store error logs');
        }
    }

    // Get error logs
    getErrorLogs() {
        return this.errors;
    }

    // Clear error logs
    clearErrorLogs() {
        this.errors = [];
        localStorage.removeItem('errorLogs');
    }

    // Safe function execution
    safeExecute(fn, context = {}) {
        try {
            return fn();
        } catch (error) {
            this.logError('Function Execution Error', error, context);
            return null;
        }
    }

    // Safe async function execution
    async safeExecuteAsync(fn, context = {}) {
        try {
            return await fn();
        } catch (error) {
            this.logError('Async Function Execution Error', error, context);
            return null;
        }
    }

    // Validate data
    validateData(data, schema) {
        const errors = [];

        for (const [key, rules] of Object.entries(schema)) {
            const value = data[key];

            if (rules.required && !value) {
                errors.push(`${key} is required`);
            }

            if (rules.type && value && typeof value !== rules.type) {
                errors.push(`${key} must be of type ${rules.type}`);
            }

            if (rules.minLength && value && value.length < rules.minLength) {
                errors.push(`${key} must be at least ${rules.minLength} characters`);
            }

            if (rules.maxLength && value && value.length > rules.maxLength) {
                errors.push(`${key} must be at most ${rules.maxLength} characters`);
            }

            if (rules.pattern && value && !rules.pattern.test(value)) {
                errors.push(`${key} format is invalid`);
            }
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }
}

// Initialize global error handler
const errorHandler = new ErrorHandler();

// Wrap common operations with error handling
function safeLocalStorageGet(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        errorHandler.logError('LocalStorage Get Error', error, { key });
        return defaultValue;
    }
}

function safeLocalStorageSet(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        errorHandler.logError('LocalStorage Set Error', error, { key });
        return false;
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }

    // Start measuring
    start(label) {
        this.metrics[label] = performance.now();
    }

    // End measuring
    end(label) {
        if (!this.metrics[label]) return null;

        const duration = performance.now() - this.metrics[label];
        delete this.metrics[label];

        // Log slow operations (> 1000ms)
        if (duration > 1000) {
            console.warn(`Slow operation: ${label} took ${duration.toFixed(2)}ms`);
        }

        return duration;
    }

    // Get all metrics
    getMetrics() {
        return this.metrics;
    }
}

// Initialize performance monitor
const perfMonitor = new PerformanceMonitor();

// Debounce function for performance
function debounce(fn, delay = 300) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Throttle function for performance
function throttle(fn, delay = 300) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn.apply(this, args);
        }
    };
}

