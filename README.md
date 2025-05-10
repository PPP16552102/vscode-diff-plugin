# Master-Diff

Pair files for quick diffing

## Configuration    

### `master-diff.patterns`

An array for patterns

```jsonc
{
    "master-diff.patterns": [
        {
            "source": "./test/fixtures/*.ts",
            "target": [
                "./test/fixtures/output1/<basename>",
                "./test/fixtures/output2/<basename>"
            ]
        },
        {
            "source": "./test/fixtures/output{1,2}/*.ts",
            "target": "<dir>/../<basename>"
        }
    ]
}
```