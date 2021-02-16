enum LoggingOptions {
    All = 'all',
    Info = 'info',
    Debug = 'debug',
    Warn = 'warn',
    Error = 'error',
    Fatal = 'fatal',
    OFF = 'off',
};


class LoggerConfig {
    public readonly loggingLevel: LoggingOptions;

    public readonly combined: boolean;
    public readonly combinedFileName: string;
    
    public readonly dedicated: boolean;

    public readonly networked: boolean;
    public readonly serverURL: string[] | null;
    
    private static instance: LoggerConfig;
    private constructor(
        loggingLevel: LoggingOptions,
        combined: boolean,
        combinedFileName: string,
        dedicated: boolean,
        networked: boolean,
        serverURL: string[] | null 
        ){
            this.loggingLevel = loggingLevel;
            this.combined = combined;
            this.combinedFileName = combinedFileName;
            this.dedicated = dedicated;
            this.networked = networked;
            this.serverURL = serverURL;
    }

    public static getConfig(){
        if (this.instance)
            return this.instance;
        
        this.instance = new this(
            LoggingOptions.All,
            true,
            'logs/combined.log',
            true,
            false,
            null
        );

        return this.instance;
    }
};


export {
    LoggingOptions,
    LoggerConfig
};