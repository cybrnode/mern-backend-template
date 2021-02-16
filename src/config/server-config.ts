const configTypes = {
    production: {
        name: "Production template",
        host: "0.0.0.0",
        port: 3000,
        JWT_SECRET: "*&CTQ@'SJagtDVY'!!@#y'!@opasodf7b_(*SA)F!CBGT'&*)!@OTEG'^@RCO"
    },
    development: {
        name: "Develpoment template",
        host : "0.0.0.0",
        PORT: 3001,
        JWT_SECRET: "*&CTQ@'SJagtDVY'!!@#y'!@o&'i#**&@!CBGT'&*)!@OTEG'^@RCO"
    },
    test: {
        name: "Test",
        host: "0.0.0.0",
        PORT: 5000,
        JWT_SECRET: "*&CTQ12p943hn124'!!@#y'!@o&'i#**&@!CBGT'&*)!@OTEG'^@RCO",
    },
};

export default class ServerConfig{
    public readonly name: string;
    public readonly host: string;
    public readonly port: number;
    public readonly jwtSecret: string;

    public static getConfig(){
        if (this.instace)
            return this.instace;
        
        this.instace = new this(
            configTypes.development.name,
            configTypes.development.host,
            configTypes.development.PORT,
            configTypes.development.JWT_SECRET
        );
        return this.instace;
    }

    private static instace: ServerConfig;
    private constructor(name: string, host: string, port: number, jwtSecret: string){
        this.name = name;
        this.host = host;
        this.port = port;
        this.jwtSecret = jwtSecret;
    }
};