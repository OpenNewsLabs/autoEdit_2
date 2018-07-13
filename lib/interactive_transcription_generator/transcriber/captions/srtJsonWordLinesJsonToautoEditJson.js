/**
 * 
 * input 
 ```
 [
    [ { start: 338.28, end: 330.73, text: 'tecnologia' },
        { start: 337.525, end: 330.73, text: 'avanzata\n' } ],
    [ { start: 343.35, end: 339.96999999999997, text: 'quindi' },
        { start: 342.7866666666667, end: 341.0966666666667, text: 'per' },
        { start: 342.22333333333336, end: 338.28, text: 'esempio' },
        { start: 341.66, end: 337.1533333333333, text: 'utensili' },
        { start: 341.0966666666667,
        end: 329.2666666666666,
...
    ]
]
```

output - autoEdit transcription json representation, text attribute.
```
[
		{
			"id": 0,
			"speaker": "Speaker 1",
			"paragraph": [
				{
					"id": 0,
					"startTime": 0,
					"endTime": 0,
					"line": [
						{
							"id": 0,
							"startTime": 8.02,
							"endTime": 8.29,
							"text": "Social"
                        },
                        ...
```
 * @todo: could add logic to split lines in speakers if line starts with certain regex eg `[{speaker}]`
 */
 var autoEditJson = [
    {
        "id": 0,
        "speaker": "Speaker 1",
        "paragraph": [
            {
                "id": 0,
                "startTime": 0,
                "endTime": 0,
                "line": [ ]
            }
        ]
    }
]
function convertToautoEditJson(lines){
    
    lines.forEach((line, index)=>{
        autoEditJson[0].paragraph[index] = {};
        autoEditJson[0].paragraph[index].id = index;
        autoEditJson[0].paragraph[index].startTime = line[0].startTime;
        autoEditJson[0].paragraph[index].endTime = line[line.length-1].endTime;
        autoEditJson[0].paragraph[index].line = line;
    });
    return autoEditJson;
}


module.exports =  convertToautoEditJson;