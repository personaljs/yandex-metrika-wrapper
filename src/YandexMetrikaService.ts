import {
    CallbackOptions,
    CounterConfig,
    ExtLinkOptions,
    FileOptions,
    GoalParams,
    HitOptions,
    NotBounceOptions,
    UserParameters,
    VisitParameters,
} from './types';

/**
 * Class for interacting with the Yandex Metrika API.
 * Provides methods for tracking events, goals, and user interactions.
 */
export class YandexMetrikaService<G extends string, P extends GoalParams> {
    static insertMetrika(alternativeUrl?: string) {
        window.ym =
            window.ym ||
            function () {
                // eslint-disable-next-line prefer-rest-params
                (window.ym.a = window.ym.a || []).push(arguments);
            };
        window.ym.l = new Date().getTime();

        const lastScript = document.getElementsByTagName('script')[0];
        const metrikaScript = document.createElement('script');
        metrikaScript.type = 'text/javascript';
        metrikaScript.src = alternativeUrl ?? 'https://mc.yandex.ru/metrika/tag.js';
        metrikaScript.async = true;
        lastScript.parentNode!.insertBefore(metrikaScript, lastScript);
    }

    /**
     * Initializes the Yandex Metrika counter with the provided configurations.
     */
    static initMetrika(counterConfigs: CounterConfig[]) {
        for (const {id, ...counterConfig} of counterConfigs) {
            window.ym(id, 'init', counterConfig);
        }
    }

    private readonly defaultCounterId: number;

    /**
     * Constructs a new MetrikaService instance.
     * @param counterId - The default counter ID to use.
     */
    constructor(counterId: number) {
        this.defaultCounterId = counterId;
    }

    /**
     * Adds file extensions to track as downloadable files.
     * @param extensions - A string or array of strings representing file extensions.
     * @param counterId - Optional counter ID. Defaults to the default counter ID.
     * @see https://yandex.ru/support/metrica/objects/addfileextension.html
     */
    addFileExtension(extensions: string | string[], counterId?: number) {
        window.ym(counterId ?? this.defaultCounterId, 'addFileExtension', extensions);
    }

    /**
     * Tracks an external link click.
     * @param url - The URL of the external link.
     * @param options - Options for the external link tracking.
     * @param counterId - Optional counter ID. Defaults to the default counter ID.
     * @returns A promise that resolves when the link is tracked.
     * @see https://yandex.ru/support/metrica/objects/extlink.html
     */
    extLink<CTX>(url: string, options: ExtLinkOptions<CTX> = {}, counterId?: number) {
        const promise = this.getCallbackPromise(options);
        window.ym(counterId ?? this.defaultCounterId, 'extLink', url, options);
        return promise;
    }

    /**
     * Tracks a file download.
     * @param url - The URL of the file.
     * @param options - Options for the file download tracking.
     * @param counterId - Optional counter ID. Defaults to the default counter ID.
     * @returns A promise that resolves when the file is tracked.
     * @see https://yandex.ru/support/metrica/objects/file.html
     */
    file<CTX>(url: string, options: FileOptions<CTX> = {}, counterId?: number) {
        const promise = this.getCallbackPromise(options);
        window.ym(counterId ?? this.defaultCounterId, 'file', url, options);
        return promise;
    }

    /**
     * Retrieves the client ID.
     * @param counterId - Optional counter ID. Defaults to the default counter ID.
     * @returns A promise that resolves with the client ID.
     * @see https://yandex.ru/support/metrica/objects/get-client-id.html
     */
    getClientID(counterId?: number) {
        return new Promise((resolve) => {
            window.ym(counterId ?? this.defaultCounterId, 'getClientID', resolve);
        });
    }

    /**
     * Sets the user ID.
     * @param userId - The user ID to set.
     * @param counterId - Optional counter ID. Defaults to the default counter ID.
     * @see https://yandex.ru/support/metrica/objects/set-user-id.html
     */
    setUserID(userId: string, counterId?: number) {
        window.ym(counterId ?? this.defaultCounterId, 'setUserID', userId);
    }

    /**
     * Sets user parameters.
     * @param parameters - The user parameters to set.
     * @param counterId - Optional counter ID. Defaults to the default counter ID.
     * @see https://yandex.ru/support/metrica/objects/user-params.html
     */
    userParams(parameters: UserParameters, counterId?: number) {
        window.ym(counterId ?? this.defaultCounterId, 'userParams', parameters);
    }

    /**
     * Sets visit parameters.
     * @param parameters - The visit parameters to set.
     * @param counterId - Optional counter ID. Defaults to the default counter ID.
     * @see https://yandex.ru/support/metrica/objects/params-method.html
     */
    params(parameters: VisitParameters | VisitParameters[], counterId?: number) {
        window.ym(counterId ?? this.defaultCounterId, 'params', parameters);
    }

    /**
     * Marks the user interaction as not a bounce.
     * @param options - Options for the not bounce event.
     * @param counterId - Optional counter ID. Defaults to the default counter ID.
     * @returns A promise that resolves when the event is tracked.
     */
    async notBounce<CTX>(options: NotBounceOptions<CTX>, counterId?: number) {
        const promise = this.getCallbackPromise(options);
        window.ym(counterId ?? this.defaultCounterId, 'notBounce', options);
        return promise;
    }

    /**
     * Tracks a goal achievement.
     * @param target - The name of the goal.
     * @param params - Optional parameters associated with the goal.
     * @param callback - Optional callback to execute when the event is tracked.
     * @param ctx - Optional context for the callback.
     * @param counterId - Optional counter ID. Defaults to the default counter ID.
     * @returns A promise that resolves when the goal is tracked.
     * @see https://yandex.ru/support/metrica/objects/reachgoal.html
     */
    reachGoal<CTX, T extends G>(
        target: T,
        params?: P[T],
        callback?: (this: CTX) => void,
        ctx?: CTX,
        counterId?: number,
    ) {
        const options = {callback, ctx};
        const promise = this.getCallbackPromise(options);

        window.ym(
            counterId ?? this.defaultCounterId,
            'reachGoal',
            target,
            params,
            options.callback,
            options.ctx,
        );

        return promise;
    }

    /**
     * Tracks a page view (hit).
     * @param url - The URL of the page.
     * @param options - Options for the page view tracking.
     * @param counterId - Optional counter ID. Defaults to the default counter ID.
     * @returns A promise that resolves when the hit is tracked.
     * @see https://yandex.ru/support/metrica/objects/hit.html
     */
    hit<CTX>(url: string, options: HitOptions<CTX> = {}, counterId?: number) {
        const promise = this.getCallbackPromise(options);
        window.ym(counterId ?? this.defaultCounterId, 'hit', url, options);
        return promise;
    }

    /**
     * Helper method to create a promise for callback-based events.
     * @param options - Options containing a callback function.
     * @returns A promise that resolves when the callback is executed.
     */
    private getCallbackPromise<CTX>(options: CallbackOptions<CTX>) {
        return new Promise((resolve) => {
            const optionsCallback = options.callback;
            options.callback = function () {
                if (optionsCallback) {
                    optionsCallback.call(this);
                }
                resolve(this);
            };
        });
    }
}
