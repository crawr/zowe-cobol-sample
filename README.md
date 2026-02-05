# Zowe Sample Project

## Setup
1. `git clone` this project
2. `npm install`
3. Create a file `config/local.json` with your project settings, e.g.:
```json
{
    "settings": {
        "hlq": "PUBLIC.TEMPLATE"
    },
    "job": {
        "name": "TEMPLATE",
        "account": "#ACCT"
    }
}
```

## Usage

1. `npm run allocate` -> Allocate your project data sets
2. `npm run genjcl` -> Generate JCL from template
3. `npm run upload` -> Upload source to data sets
4. `npm run build` -> Run JCL and download output
5. Change the code and `npm run test` -> Run test script

## Helper Scripts

* `npm run delete` -> Delete your project data sets
* `npm run build:scripts` -> Rebuild scripts
* `npm [run] start` -> upload & build
* `npm run watch` -> Watch zossrc folder for changes
