var util = require("util");
import RuleFailure = require("../src/ruleFailure");

export class LogInterceptor {
    private static _instance: LogInterceptor = null;
    private _log: string[] = [];
    private _write = process.stdout.write.bind(process.stdout);
    private _clog = console.log;

    constructor() {
        if (LogInterceptor._instance) {
            throw new Error("Error: Instantiation failed.  Singleton class already instantiated.");
        }
        LogInterceptor._instance = this;

        process.stdout.write = (str: any): any => {
            this._log.push(str);
        };

        console.log = (...args: string[]) => {
            this._write(util.format.apply(null, args) + "\n");
        };
    }

    public getLog(): Array<string> {
        return this._log;
    }

    public clearLog(): void {
        this._log = [];
    }

    public destroy(): void {
        process.stdout.write = this._write;
        console.log = this._clog;
        LogInterceptor._instance = null;
    }
}

export class TestConstants {
    static LINTEDFILE = {
        path: process.cwd() + "/specs/fixtures/TestSrc.ts"
    };
    static PALANTIRLINTOUTPUT: Stylish.IPalantirRuleFailureObject[] = [
        {
            "fileName": "NOFILE",
            "failure": "file should end with a newline",
            "startPosition": {
                "position": 442,
                "lineAndCharacter": {
                    "line": 18,
                    "character": 27
                }
            },
            "endPosition": {
                "position": 442,
                "lineAndCharacter": {
                    "line": 18,
                    "character": 27
                }
            },
            "ruleName": "eofline"
        }, {
            "fileName": "NOFILE",
            "failure": "\' should be \"",
            "startPosition": {
                "position": 391,
                "lineAndCharacter": {
                    "line": 16,
                    "character": 23
                }
            },
            "endPosition": {
                "position": 397,
                "lineAndCharacter": {
                    "line": 16,
                    "character": 29
                }
            },
            "ruleName": "quotemark"
        }
    ];
    static LINTOUTPUT: Stylish.IRuleFailureObject[] = [
        {
            "fileName": "NOFILE",
            "failure": "file should end with a newline",
            "startPosition": {
                "position": 442,
                "line": 18,
                "character": 27
            },
            "endPosition": {
                "position": 442,
                "line": 18,
                "character": 27
            },
            "ruleName": "eofline"
        }, {
            "fileName": "NOFILE",
            "failure": "\' should be \"",
            "startPosition": {
                "position": 391,
                "line": 16,
                "character": 23
            },
            "endPosition": {
                "position": 397,
                "line": 16,
                "character": 29
            },
            "ruleName": "quotemark"
        }
    ];
    static FORMATTEDOUTPUT = {
        title: "\n\u001b[4mTestSrc.ts\u001b[24m\n",
        titleNoFile: "\n\u001b[4mNOFILE\u001b[24m\n",
        contentSorted: "      \u001b[90mline 17\u001b[39m  \u001b[90mcol 24\u001b[39m" +
        "  \u001b[31m\' should be \"\u001b[39m\n      \u001b[90mline 19\u001b[39m  " +
        "\u001b[90mcol 28\u001b[39m  \u001b[31mfile should end with a " +
        "newline\u001b[39m",
        contentUnsorted: "      \u001b[90mline 19\u001b[39m  \u001b[90mcol 28\u001b[39m  " +
        "\u001b[31mfile should end with a newline\u001b[39m\n      \u001b[90mline " +
        "17\u001b[39m  \u001b[90mcol 24\u001b[39m  \u001b[31m\' should be \"\u001b[39m",
        count: "\n\n    \u001b[31m\u001b[31m✖\u001b[31m\u001b[39m 2 errors\n\n",
        bell: "\u0007"
    };
}
export function clone(object: Object): Object {
    return JSON.parse(JSON.stringify(object));
}
