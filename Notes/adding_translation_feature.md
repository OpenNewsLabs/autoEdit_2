# Some notes for the implementation of addign a tranlsation feature

Open option is to use 
IBM watson Translation


send each line of text from transcription to be translaed individually with line number.

then associate translaiton object to transcription. 
where line numbers are the same as transcription. 


so that in view it can be

```
Something in italian as the original footage

~somethign in another language translated to~

```


where the original languge is the cliccable one, and the line transcritpion is not, if you click it plays from beginning of the sentence. 


should also save in object translation engine used, and from what language to what language. 


in paper edit, should also move translation with the selection 