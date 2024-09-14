/**
 * Interface defining goal parameters.
 * Maps each goal name to its specific parameter type.
 */
export interface GoalParams {
    [goalName: string]: any; // Extend this with specific goal names and their parameter types.
}

/**
 * Interface defining parameters for a visit.
 */
export interface VisitParameters {
    order_price?: number;
    currency?: string;

    [key: string]: any;
}

/**
 * Interface defining parameters for a user.
 */
export interface UserParameters {
    UserID?: number;

    [key: string]: any;
}

/**
 * Interface defining initialization parameters for the Metrika counter.
 */
export interface InitParameters {
    accurateTrackBounce?: boolean | number;
    childIframe?: boolean;
    clickmap?: boolean;
    defer?: boolean;
    ecommerce?: boolean | string | any[];
    params?: VisitParameters | VisitParameters[];
    userParams?: UserParameters;
    trackHash?: boolean;
    trackLinks?: boolean;
    trustedDomains?: string[];
    type?: number;
    ut?: 'noindex';
    webvisor?: boolean;
    triggerEvent?: boolean;
    yaDisableGDPR?: boolean;
}

/**
 * Interface for callback options with a generic context.
 */
export interface CallbackOptions<CTX> {
    callback?: (this: CTX) => void;
    ctx?: CTX;
}

/**
 * Interface for external link options with a generic context.
 */
export interface ExtLinkOptions<CTX> extends CallbackOptions<CTX> {
    params?: VisitParameters;
    title?: string;
}

/**
 * Interface for file options with a generic context.
 */
export interface FileOptions<CTX> extends CallbackOptions<CTX> {
    params?: VisitParameters;
    referer?: string;
    title?: string;
}

/**
 * Interface for hit options with a generic context.
 */
export interface HitOptions<CTX> extends CallbackOptions<CTX> {
    params?: VisitParameters;
    referer?: string;
    title?: string;
}

/**
 * Interface for not bounce options with a generic context.
 */
export interface NotBounceOptions<CTX> extends CallbackOptions<CTX> {}

/**
 * Interface for counter configuration extending initialization parameters.
 */
export interface CounterConfig extends InitParameters {
    id: number;
}
