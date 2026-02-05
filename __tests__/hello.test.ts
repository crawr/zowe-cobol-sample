process.env.ALLOW_CONFIG_MUTATIONS = "yes"; // value doesn't matter
process.env.NODE_ENV = "development";

import { execSync } from "child_process";
import * as config from "config";
import * as fs from "fs";
import * as Mustache from "mustache";

const TIMEOUT = 20000;

const test = [{
        in: "@TEST"
    }];

(config as any).test = test;

let buildResponse: any;
let testResponse: any;

describe("Sample tests", () => {

    beforeAll(() => {

        // build and run jcl to test service
        const jcl = fs.readFileSync("./zossrc/jcl/template.jcl").toString();
        const rendered = Mustache.render(jcl, config);

        if (!fs.existsSync("./build")) fs.mkdirSync("./build");
        fs.writeFileSync("./build/custom.jcl", rendered);
        console.log("Generated custom JCL to ./build/custom.jcl");

        let cmd = "zowe jobs submit lf \"./build/custom.jcl\" --directory \"./output\" --rfj"
        testResponse = JSON.parse(execSync(cmd).toString());

    }, TIMEOUT)

    describe("build tests", () => {
        it("should build without errors", () => {
            expect(testResponse.data.retcode).toBe("CC 0000");
        });
    });

    describe("execution tests", () => {
        it("should read all input lines", () => {
            test.forEach((testData, index) => {
                const file = fs.readFileSync(`output/${testResponse.data.jobid}/RUN/SYSPRINT.txt`).toString().trim();
                expect(file).toBe(testData.in);
            });
        });
    });
});