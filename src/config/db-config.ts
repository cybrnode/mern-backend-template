import jsYaml from 'js-yaml';


export default class DatabaseConfig{
    public readonly databaseURL: string;

    private static instance: DatabaseConfig;
    private constructor(url:string){
        this.databaseURL = url;
    }

    public static getConfig(): DatabaseConfig{
        if (this.instance){
            return this.instance;
        }

        const applicationConfigYaml = jsYaml.load('application-config.yaml');

        console.log(applicationConfigYaml);
        
        this.instance = new this('mongourl');
        return this.instance;
    }
};