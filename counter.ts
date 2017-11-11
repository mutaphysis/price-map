import { t, ngettext, msgid } from 'c-3po';

function startCount(n: number){
    console.log(t`starting count up to ${n}`); // using 't' tag for 1 to 1 translations
    for (let i = 0; i <= n; i++) {
       // use ngettext function for handling plural forms
       console.log(ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i));
    }
}