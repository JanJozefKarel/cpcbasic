/* globals cpcBasic */

"use strict";

cpcBasic.addItem("",  String.raw`
100 rem test1
110 'wait 0,0
120 'clear
130 mode 2:'comment
135 cls: cls#0: a=2: cls #(a*3)
140 for i=1 to 5:print i;: next i: print
150 a=1
160 print a;: a=a+1: if a < 5 then goto 160 else print
180 a=1: while a<=5: print a;: a=a+1: wend: print
185 'a=0: while a<5: a=a+1: if a=3 or 3=a then print "three" else print "not three:";a;: wend : ?"after wend": 'wend in else currently does not work
187 a=0: s$="": while a<5: s$=s$+str$(a)+":": a=a+1: b=0: while b<3: b=b+1: s$=s$+str$(b): wend: s$=s$+" ": wend: print s$
190 rem xx
200 a=4 or 7 and 2: print a:if a<>6 then print "error200": stop
300 'print
310 print 1 2 3: ' 123
320 print 1;2;3: ' 1  2  3
330 print 1,2,3: ' 1             2             3   [zone 13]
331 print -1 -2 -3: '-6
332 print -1;-2;-3: '-1 -2 -3
340 print "a" "b" "c": 'abc
350 print "a";"b";"c": 'abc
360 print "a","b","c": 'a        b           c   [zone 13]
900 print "ok"
`);
