import React, { useState, useRef, useContext  } from 'react'
import { Snackbar, Alert, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import emailjs from '@emailjs/browser';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import MailIcon from '@mui/icons-material/Mail';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import { ThemeContext } from "../App";


// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});


const FooterHebrew = () => {
  const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [errorMode, setErrorMode] = useState(false)
  const [openAlertAdd, setIsOpenAlertAdd] = useState(false)
  const [faq, setFaq] = useState(false)


  const { hebrew } = useContext(ThemeContext) 

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_p9nruah', 'template_5nlgpjj', form.current, 'SGz3Fwi0HyW4J3L0n')
      .then((result) => {
          console.log(result.text);
          console.log("message sent!");
          setIsOpenAlertAdd(true)
          setOpenContact(false)
      }, (error) => {
          console.log(error.text);
          setErrorMode(true)
      });
  };

  const handleClose9 = () => {
    setErrorMode(false)
  }

  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClose2 = () => {
      setIsOpenAlertAdd(false)
    }


  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  return (
    <div className={`bg-gray-800 airx:mr-64 border-r-2 border-r-gray-700 mt-9`}>
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4 relative right-14">
          <div>
            <p className="font-medium tracking-wide text-gray-300 text-right">
              יצירת קשר
            </p>
            <ul className="mt-2 space-y-2 text-right">
              <li>
                <div
                  className="text-gray-500 transition-colors cursor-pointer duration-300 hover:text-deep-purple-accent-200"
                  onClick={()=> setOpenContact(true)}
                >
                  שלח אימייל
                </div>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  World
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  Games
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  References
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium tracking-wide text-gray-300 text-right">אודות</p>
            <ul className="mt-2 space-y-2 text-right">
              <li>
                <div
                  className="text-gray-500 transition-colors duration-300 cursor-pointer hover:text-deep-purple-accent-200"
                  onClick={()=> setOpen(true)}
                >
                  תקנון
                </div>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  eCommerce
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  Business
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  Entertainment
                </a>
              </li>
              
            </ul>
          </div>
          <div>
            <p className="font-medium tracking-wide text-gray-300 text-right">תמיכה</p>
            <ul className="mt-2 space-y-2 text-right">
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  Media
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  Brochure
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  Nonprofit
                </a>
              </li>
              <li>
                <div
                  className="text-gray-500 cursor-pointer transition-colors duration-300 hover:text-deep-purple-accent-200"
                  onClick={()=> setFaq(true)}
                >
                  שאלות ותשובות
                </div>
              </li>

            </ul>
          </div>
          <div>
            <p className="font-medium tracking-wide text-gray-300 text-right">
              שירותים
            </p>
            <ul className="mt-2 space-y-2 text-right">
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  Infopreneur
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  Personal
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  Wiki
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                >
                  Forum
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:max-w-md lg:col-span-2 justify-end">
          <h1 className="text-base text-right font-medium tracking-wide text-gray-300">
            הירשם לקבלת עדכונים
          </h1>
          <form className="flex flex-col items-end mt-4 md:flex-row">
            
            <button
              type="submit"
              className="inline-flex flex-grow items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none"
            >
              Subscribe
            </button>
            <input
              placeholder="Email"
              required
              type="text"
              className="relative left-2 w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm placeholder:text-right appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            />
          </form>
          <p className="mt-4 text-sm text-gray-500 text-right">
            Bacon ipsum dolor amet short ribs pig sausage prosciuto chicken
            spare ribs salami.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-500 sm:flex-row">
       
        <div className="flex items-center mt-4 space-x-4 sm:mt-0 relative md:left-16">
          <a
            href="/"
            className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
              <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
            </svg>
          </a>
          <a
            href="/"
            className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
          >
            <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
              <circle cx="15" cy="15" r="4" />
              <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
            </svg>
          </a>
          <a
            href="/"
            className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
              <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
            </svg>
          </a>
        </div>
        <p className="text-sm text-gray-500">
          © Copyright 2020 Lorem Inc. All rights reserved.
        </p>
      </div>
    </div>
    <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" className='text-center'>תקנון</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className='text-right overflow-hidden'
          >
            {/* {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')} */}
              כללי
המבוא והנספחים להסכם זה מהווים חלק בלתי נפרד ממנו (להלן כולם יחדיו – "ההסכם" או "הרישיון"). בכל מקרה של סתירה יגבר האמור בהסכם זה.
חלוקת ההסכם לסעיפים, ומתן הכותרות לסעיפים, נעשו לשם נוחות בלבד ואין לייחס להם כל משמעות בפרשנות ההסכם.
לשון ההסכם מנוסחת בלשון זכר לצורך הנוכחות בלבד אולם מתייחסת באופן זהה ושווה לשני המינים גם יחד.
 

זכויות ובעלות
החברה מספקת רישיון שימוש בתוכנה ואינה מוכרת את התוכנה, והחברה שומרת לה את כל הזכויות אשר לא ניתנות ללקוח באופן מפורש. התוכנה מוגנת על ידי חוקי זכויות יוצרים, סודות מסחריים וחוקים אחרים הנוגעים לקניין רוחני. החברה והמורשים להעניק רישיונות ושירותים מטעמה הינם הבעלים של השם המסחרי, זכויות היוצרים ושאר זכויות קניין רוחני בתוכנה ובכל עותק של התוכנה ו/או בכל גרסה של השירותים. הסכם זה אינו מעניק ללקוח כל זכות לסימני מסחר של החברה.
התוכנה, לרבות כל פיתוח של התוכנה או יישום שנעשו או נוספו לתוכנה בהתאם לדרישת ואיפיון הלקוח, הינם בבעלותה הבלעדית של החברה ויישארו בבעלות החברה בכל מקרה, גם לאחר התקנתם אצל הלקוח. זכויות הלקוח בתוכנה הם לשימוש בלבד בתקופת השירות על פי תנאי הסכם זה. מבלי לגרוע מהאמור הבעלות במידע שיוזן על-ידי הלקוח באמצעות התוכנה במשך תקופת הרישיון הינה של הלקוח.
רישיון זה הנו הרישיון המושלם והיחיד שבין הצדדים ואין מלבד התנאים, ההצהרות, הזכויות והכוונות הכלולות ברישיון זה כל תנאי או מצג נוסף, בעל פה, בכתב או בדרך אחרת.
הענקת רישיון והגבלות על הרישיון
החברה מעניקה בזאת ללקוח רישיון שימוש בתוכנה בכפוף לתנאי הסכם זה כל עוד התשלומים החודשיים מתקיימים ("תקופת הרישיון"). בתום תקופת הרישיון לא תהיה ללקוח זכות כלשהי בתוכנה.
הרישיון הניתן הינו אישי, מוגבל, בלתי עביר וללא בלעדיות. בהתאם להסכם זה, ובמסגרת הרישיון אשר ניתן ללקוח, הלקוח אינו יכול לבצע ו/או להרשות לאחר לבצע את המפורט להלן: (א) לתת לצדדים שלישיים ליהנות משימוש בתוכנה ו/או בשירותים, ובין היתר, להשכיר או לתת רישיון-משנה, להעביר זכויות, להשאיל, לשווק, להעלות את התוכנה לרשת האינטרנט, למכור לצד שלישי או להפיץ את התוכנה או חומרים ו/או שירותים הקשורים לה או חלקים מהם בכל דרך שהיא; (ב) להעתיק או לשכפל את התוכנה בשלמותה או בחלקה, אלא למטרת יצירת עותק גיבוי המשמש להתקנת התוכנה מחדש אצל הלקוח בלבד; (ג) להשתמש במידע הנמצא בתוכנה המהווה סוד מסחרי, לפתח תוכנה אחרת אשר תתממשק עם התוכנה; (ד) לשנות, לתרגם או ליצור יצירות נגזרות של התוכנה או חלקים מי מהן; (ה) לעקוף חסמים טכניים בתוכנה, להשתמש בכלי המאפשר שימוש במאפיינים ו/או פונקציות אשר אחרת אינם ניתנים להפעלה בתוכנה, לבצע הנדסה לאחור של התוכנה; (ו) להסיר, לשנות או להסתיר התראות או הודעות לגבי שמירת זכויות לסודיות ו/או זכויות קניין של החברה או של המורשים להעניק רישיונות מטעמה, ובכלל זה התראות לגבי זכויות יוצרים, הקיימות בתוכנה או באיזה מן העותקים של התוכנה; (ז) לבצע או לנסות לבצע כל פעולה אשר תפריע לפעולה תקינה של התוכנה ו/או השירותים המסופקים, תמנע גישה לשימוש בתוכנה או בשירותים על ידי לקוחות אחרים וכלל לקוחות החברה; (ח) לגרום לעומס יתר על תשתית החברה באופן שאינו סביר או שהינו ביחס שאינו פרופורציונאלי בגודלו; (ט) להשתמש בתוכנה באופן שונה מן המותר תחת סעיף זה.
הרישיון שמוענק ללקוח בהתאם להסכם זה מתיר ללקוח לעשות שימוש בתוכנה על שרת החברה אדית פתרונות תוכנה בע"מ, המחיר כולל שימוש עד לנפח על פי תנאי החבילה שנרכשה .השימוש בתוכנה הינו למספר משתמשים אשר עבורם שולם תשלום חודשי המחיר למשתמש הינו על פי תנאי החבילה. החברה רשאית לשנות את גובה התשלום בכפוף להודעה של 90 יום מראש, הוספת משתמשים נוספים כרוכה בתשלום חודשי.על פי תנאי החבילה. 
בתקופת הניסיון שהינה 14 יום השימוש הינו ללא עלות. השימוש הינו עבור משתמש אחד בלבד. לא ניתן לייבא קבצים לתוכנה בתקופת הניסיון. בתקופת הניסיון לא יוכל הלקוח לייבא קבצים לתוכנה.
השימוש במונח "תוכנה" כולל כל רכיב, תוכנה, כלי, שירות מבוסס אינטרנט וכל עדכון של התוכנה ו/או השירותים אותם מספקת החברה או שהחברה מאפשרת גישה אליהם לאחר תאריך רכישת העותק הראשוני של התוכנה (או התקנת התוכנה לראשונה). החברה רשאית לעדכן את השרת בעדכוני תוכנה המכילים שיפורים לתוכנה ותיקון תקלות תוכנה שהתגלו ע"י החברה או הלקוח.
 

תמורה ותשלומים
בתמורה להרשאת השימוש בתוכנה כאמור לעיל, ישלם הלקוח לחברה סכום קבוע חודשי, על פי תנאי החבילה, עבור כל משתמש בתוספת מע"מ, וזאת החל מ-14 יום לאחר הרישום חינם לתוכנה.
הלקוח יהיה רשאי להזמין מהספק מעת לעת לפי צרכיו שירותי פיתוח תוכנה של התאמות ושינויים, וזאת בכפוף להצעת מחיר בהתאם לבקשת הלקוח עבור כל פרוייקט.
במסגרת הרכישה הלקוח יכול לקבל הדרכה או תמיכה טלפונית על פי מחירון השירותים של החברה.  הלקוח מתחייב לשלם בעבור דמי השימוש ותמיכה בתוכנה.
ככל שהחברה תסכים שהלקוח ישלם עבור התוכנה בתשלומים, התשלומים החודשיים ישולמו על-ידי הלקוח במתכונת הנהוגה בחברה מעת לעת וכפי שיוסכם עם הלקוח.
החברה רשאית להצמיד כל סכום הקבוע בהסכם זה לרבות תשלומים, למדד המחירים לצרכן לפי הוראות הדין, והיא תמסור על כך הודעה 7 ימים מראש לפחות.
כל חשבון שיקבל הלקוח מהחברה ייחשב לנכון 21 יום לאחר משלוח החשבון ללקוח במידה והלקוח לא הודיע לחברה בכתב על השגה לגביו. בכל מקרה של סתירה בין חשבונות יגבר האמור בספרי החברה.
תשלום שהלקוח לא ישלם במועד שנקבע לפירעונו לפי ההסכם עימו, ישא ריבית פיגורים בשיעור הגבוה הנהוג בבנק לגבי חריגה מחשבונות חח"ד וכן הפרשי הצמדה והוצאות גבייה עפ"י מדיניות החברה.
רישיון השימוש בתוכנה ללקוח הנו בתוקף כל עוד הלקוח משלם את דמי השימוש בגין התוכנה. בכל מקרה בו הלקוח יפסיק לשלם לחברה את שהתחייב, מחויב הלקוח להפסיק את השימוש בתוכנה. במקרה זה, החברה רשאית לעצור את אפשרות השימוש בתוכנה, וללקוח לא תהיה כל טענה בעניין. למען הסר ספק, הלקוח מתחייב לאפשר לחברה התחברות מרחוק למחשבו.
ידוע לי ואני מאשר בחתימתי, כי כעבור שנה קלאנדרית מיום התשלום, במידה ולא הוסדר תשלום עבור שנה נוספת, לא ניתן יהיה להשתמש בתוכנה, ולהתחבר אליה.
דרישות חומרה ותוכנה
דרישות התוכנה יהיו בהתאם למפרט שיפורסם מפעם לפעם באתר החברה.
הלקוח מתחייב להשתמש בעותק מקורי וחוקי של מערכת הפעלה וכל תוכנה אחרת למחשב. כל שימוש בעותק לא מקורי וחוקי של מערכת הפעלה ו/או שימוש במערכת הפעלה שאינה מתאימה לדרישות הסף של התוכנה תביא לביטול הרישיון.
 

תמיכה טכנית
החברה מצהירה בזאת כי היא מספקת שירותי תמיכה טכנית בקשר עם תקלות תוכנה. החברה תעשה את מירב המאמצים הסבירים לפתור תקלות בקבלת פניה לשירותי תמיכה טכנית, אולם אין באמור לעיל משום מצג או התחייבות לפרק הזמן שבו תקלה כאמור תיפתר, ו/או אם פתרון לתקלה כאמור יימצא על ידי החברה ו/או צד שלישי. החברה אינה מתחייבת לרמת שירות ו/או תיקון תקלות ו/או תמיכה טכנית מעבר לאמור בסעיף זה.
משך כל תקופת הרישיון ובכפוף לעמידת הלקוח בתשלומים כפי שהתחייב, תעמוד לרשות לקוח תמיכה טכנית בימים א' עד- ה' בשעות 09:00 עד 17:00, בהתאם לתנאים המפורטים לעילמתן התמיכה מותנה ברמת ידע סבירה של גלישה באינטרנט ושימוש בסייר הקבצים ע"י נציג/ת החברה במחשב האישי של הלקוח או נציגו.
שירותי התמיכה והסיוע לתוכנה יינתנו טלפונית בלבד וכן ייעשו באמצעות תוכנת שליטה מרחוק. לשם כך, מתחייב הלקוח להחזיק רישיון לאחת מתוכנות השליטה מרחוק עפ"י המלצת החברה, אשר תהיה זמינה בכל עת בהתאם לצורך וכן לדאוג כי המחשב יהיה מחובר לרשת האינטרנט באופן שתינתן גישה למחשב באמצעות תוכנת השליטה מרחוק. בכל מקרה בו אין אפשרות לגישה מרחוק למחשב הלקוח באמצעות תוכנת השליטה מרחוק לרבות עקב חומת-אש (Firewall)  ו/או חסימת פורטים (port) ו/או הפנית פורטים בנתב (router) או מכל סיבה אחרת, יזמין הלקוח טכנאי על חשבונו באופן שתינתן גישה כאמור באמצעות תוכנת גישה מרחוק.   
בכפוף לתנאי הסדר השירות, במקרה של תקלה בלתי ניתנת לתיקון במחשב ו/או בדיסק עליו מותקנת התוכנה, תבצע החברה, התקנה חוזרת של התוכנה אצל הלקוח. על הלקוח, מוטלת חובת ההוכחה שהתוכנה אומנם הייתה מותקנת במחשבים אשר יצאו מכלל פעולה. כמו כן מתחייב המשתמש לשלם בכל מקרה עבור שירות ההתקנה של התוכנה במחשב/י הלקוח.
מבלי לגרוע מהאמור לעיל, רשאית החברה להימנע ממתן שירותי תמיכה ללא הודעה מראש, ובמקרה של אי סילוק חוב כספי כלשהו של הלקוח כלפיה.
על אף האמור לעיל, החברה ומרכז התמיכה לא יהיו מחויבים להגיש סיוע ללקוח בכל אחד מהמקרים הבאים:
נגרם נזק לקבצי הנתונים על-ידי וירוס מחשב;
נגרם נזק לקבציי המחשב כתוצאה מפגיעה בדיסק הקשיח, מחיקת הקבצים או חלקם בזדון או בשוגג, שריפה, השמדה או כל אובדן אחר שיגרם לקובצי נתונים;
כל ניסיון לשינוי הקבצים ע"י כל כלי תוכנה שהוא, למעט תוכנת החברה;
כל שימוש בתוכנה בניגוד להוראות החברה ו/או מרכז התמיכה;
בעיה בהפעלת התוכנה כתוצאה מתקלת חומרה או אי התאמת החומרה למערכת;
תקלה הנובעת ממערכת ההפעלה של המחשב או כל תוכנת הפעלה אחרת;
בכל מקרה של תקלה, שאינה קשורה ישירות בתוכנה, יהיה מרכז התמיכה רשאי ע"פ שיקול דעתו הבלעדי להחליט אם לטפל בבעיה או לא.
במידה ומרכז התמיכה בדק ו/או טיפל בבעיה שאינה קשורה ישירות בתוכנה ו/או אם לאחר שהחברה החלה בתיקון שגיאות או פגמים בתוכנה שדווחו על ידי הלקוח, יסתבר כי השגיאות ו/או הפגמים נובעים ממעשה ו/או מחדל של הלקוח, לרבות האמור בסעיף 6.6 לעיל, רשאית החברה לחייב את הלקוח במלוא ההוצאות הכרוכות בתיקון שגיאות ו/או פגמים אלה, על בסיס חישוב של שעות העבודה והוצאות בפועל ובכפוף למחירון השירות של החברה?
אין באמור בהסכם זה בכדי להבטיח ללקוח שלא ייווצרו פגמים בתוכנה עקב התנגשות עם תוכנות אחרות המותקנות ו/או שיותקנו במחשב הלקוח. בכל מקרה של פגם, הנוצר עקב התנגשות כאמור, תעשה החברה כמיטב יכולתה, במידה ותתבקש ע"י הלקוח, על מנת לתקן את הפגם שיווצר וזאת תמורת תשלום הוצאות ושעות עבודה בפועל, בכפוף למחירון השירות של החברה ומבלי שיש באמור בסעיף זה בכדי לחייב את החברה לתקן את הפגם.
 

עדכוני תוכנה
החברה מתחייבת להמשיך ולפתח את התוכנה ולשאוף למקסם את איכות התוכנה, מגוון המודולים שבה ונוחות השימוש אשר היא מאפשרת ללקוחותיה, אך אין החברה אחראית לכך שהפונקציות הכוללות בתוכנה אומנם מתאימות לצרכיו העסקיים או לצורך עסק ספציפי של הלקוח.
החברה רשאית, מעת לעת לעדכן, לשדרג, לשפר, לאבטח, את התוכנה, הגרסאות, קבצי תחזוקת תוכנה, והשירותים, וכל אפליקציה או קובץ אחר בקשר עם התוכנה והשירותים וזאת בין אם התוכנה מותקנת על מחשב המשתמש  לרבות באמצעות חיבור מרחוק ו/או באופן אוטומטי ואלקטרוני, כאשר המורשה מתחבר דרך רשת האינטרנט בכדי לעשות שימוש בתוכנה ("עדכוני תוכנה"). החברה שומרת לעצמה את הזכות ואת שיקול הדעת הבלעדי לבצע עדכוני תוכנה, ובכלל זה לשנות או להגביל את תכיפות או תדירות השימוש ו/או זמן השימוש המרבי הכולל של המורשה בתוכנה בזמן נתון, בכפוף למתן התראה סבירה מצד החברה. החברה רשאית לבצע עדכוני תוכנה כך שיחולו באופן מיידי על מנת לעמוד בדרישות כל דין, לשמר את אבטחת המידע במערכת או אבטחת מידע הדרוש לגישה של הלקוח.
החברה רשאית לבקש מן הלקוח לבצע עדכוני תוכנה על ידי טעינה ו/או הורדה של עדכוני התוכנה ו/או קובץ בקשר עם התוכנה על ידי התקנת חומרה ו/או תוכנה, לרבות באמצעות הורדה וטעינה של עדכוני תוכנה דרך רשת האינטרנט ("עדכוני תוכנה עצמאיים"). האחריות לבירור וביצוע עדכוני התוכנה העצמאיים חלה על הלקוח בלבד.
האחריות על הצלחת ואיכות עדכוני התוכנה ו/או עדכוני תוכנה עצמאיים תהיה על הלקוח, ומבלי שללקוח תהיה כל דרישה ו/או טענה ו/או תביעה כנגד החברה ו/או הספקים של החברה בגין כל נזק, קלקול, תקלה, בעיות תקשורת, או כשל אשר ייגרמו לתוכנה, למחשב, התקן ולכל קובץ ו/או יישום ו/או תוכנה בקשר עם המחשב. באחריות הלקוח לוודא כי בטרם השימוש בתוכנה הוא עומד בדרישות החומרה והתוכנה, לצורך ביצוע עדכוני התוכנה ו/או עדכוני התוכנה העצמאיים.
במקרה והלקוח לא יאפשר ו/או לא יבצע את עדכוני התוכנה ו/או עדכוני התוכנה העצמאיים, ייתכן והשימוש בתוכנה לא יתאפשר, וזאת מבלי שללקוח תהיה כל טענה, תביעה ו/או תביעה בקשר לכך כלפי החברה ו/או מי מטעמה. מבלי לגרוע מן האמור לעיל, החברה שומרת לעצמה את הזכות לחסום את הלקוח ו/או מי מטעמו מלעשות כל שימוש ו/או להפיק כל הנאה מהתוכנה.
מובהר בזאת כי ההוראות והתנאים בהסכם יחולו גם על עדכוני התוכנה וגם על עדכוני התוכנה העצמאיים, ככל שיהיו.
 

שירותים נוספים
החברה עושה מאמצים לפיתוח והרחבת קשת המוצרים והשירותים לשביעות רצון הלקוח, ולשם כך תציע החברה ללקוח, שירותים נוספים אשר יסופקו לו לפי בחירתו, בתשלום או שלא בתשלום למשך תקופה קצובה, כפי שיהיה נהוג בחברה מעת לעת. הלקוח מסכים לקבל דיוור של הצעות מהחברה ומסכים להיכלל במאגר הדיוור של החברה.
מוצרים ו/או שירותים אשר סופקו ללקוח במסגרת מבצע ללא תשלום למשך תקופה קצובה, החברה תהא רשאית לגבות בגינם תשלום בתום התקופה בתנאים כפי שיוצעו על ידה באותה העת. במידה ולא ירצה הלקוח לעשות בהם שימוש, החברה תדאג להסירן ממחשב הלקוח ולא לחייבו בגינם.
 

ויתור על טענות
התוכנה ניתנת כמות שהיא ("AS IS") ובלא כל התחייבות מצד החברה. אי לכך, אין באמור ו/או בהסכם משום מצג מצד החברה בדבר האמינות, ההתאמה, העיתוי המתאים ומידת הדיוק של התוכנה למטרה כלשהי. לפיכך, לא תהיה ללקוח כל טענה, תביעה ו/או דרישה כלפי החברה, בעלי מניות בחברה, נותני השירותים לחברה, מורשים מטעם החברה או כל צד שלישי אחר הקשור לאספקת התוכנה והשירותים ("הספקים") בגין תכונות, יכולות, מגבלות או התאמה של התוכנה לצרכיו ודרישותיו של הלקוח. בנוסף לכך, הספקים לא ישאו באחריות מפורשת או משתמעת מכח הוראות כל דין בגין טענת פגם, אי התאמה, זכות שימוש, סחירות והסגת גבול בגין אספקת התוכנה והשירותים. החברה אינה מתחייבת לכך שהתוכנה תפעל ללא תקלות ("BUGS"), וירוסים, הפרעות, גישה בלתי מורשית, התחזות וגניבת זהות וכל מגבלות חומרה ותוכנה אחרות אשר יש בהן כדי לגרום לפגיעה בצרכי הלקוח מן התוכנה ("התקלות"). החברה מקדישה משאבים ונוקטת באמצעי אבטחה שונים בפיתוח התוכנה ומחשבי החברה למניעת התקלות. עם זאת, אין החברה יכולה לאבטח את מחשבי החברה אבטחה מושלמת מפני הפגיעות.
 

הגבלת אחריות
אחריות החברה מוגבלת לאמור במפורש בהסכם זה בלבד. מעבר לאמור החברה לא תשא בשום אחריות אחרת במפורש או במשתמע, בגין נזק ישיר, עקיף, דמי נזיקין עונשיים, נזק מקרי, מיוחד או תוצאתי, או כל נזק אחר מכל סוג ומין, לרבות, דמי נזיקין בגין אובדן השימוש, אובדן נתונים או אובדן רווחים, השחתה, כשל אבטחה או גניבה של מידע עסקי ו/או מידע פיננסי, קיומם של וירוסים, תוכנות ריגול, אבדן הכנסה, קנסות, הפסדים, הוצאות, אבדן הזדמנויות עסקיות של הלקוח ו/או אחר מטעמו ו/או צד שלישי כלשהוא הנובעים או קשורים בכל דרך שהיא בהסתמכות על התוכנה, בשימוש בתוכנה ו/או בביצועיה ו/או עדכונים לתוכנה, בעיכוב בשימוש או באי יכולת להשתמש בתוכנה או בכל דרך אחרת הנובעת מן השימוש בתוכנה ("הנזקים"), אפילו אם נודע לחברה על האפשרות של נזק כאמור.
החברה לא תשא באחריות בגין אבדן כספים ו/או נזקים אחרים ללקוח ו/או אחר מטעמו ו/או צד שלישי כלשהו אשר ייגרמו כתוצאה מהסתמכות וקבלת שירותים של הלקוח או מי מטעמו על צד שלישי ו/או יישומים ו/או אתרי אינטרנט של צדדים שלישיים אשר הגישה אליהם מתאפשרת באמצעות התוכנה.
האחריות המלאה לגיבוי ושמירת כל מידע ונתוני הלקוח לרבות מידע ונתונים שהוזנו על-ידי הלקוח באמצעות התוכנה, מוטלת על הלקוח בלבד והחברה לא תהא אחראית לגיבוי ו/או לאובדן מידע כלשהו. הלקוח מוותר בזאת על כל טענה, תביעה ו/או דרישה כנגד החברה ו/או מפעיליה ו/או טכנאיה הקשורה לאובדן נתונים ו/או השמדתם מכל סיבה שהיא. ידוע ללקוח כי החברה אינה מתחייבת לספק עם התוכנה חומר ספרותי (תיעוד) הנוגע לתוכנה ואם כן, אין הכרח שהחומר יהיה מעודכן לגרסה הספציפית שבשימוש הלקוח. ידוע ללקוח כי אופציות שונות ומודולים בתוכנה יעברו שינויים, יתווספו או ירדו מהתוכנה מבלי שהחברה מחויבת לתעד בחומר הספרותי או בכל אמצעי אחר את השינויים שנעשו בתוכנה. כמו כן החברה תהא רשאית להוסיף לתוכנה ולשנותה מעת לעת לפי שיקול דעתה הבלעדי ומבלי חובת הודעה ללקוח, וללקוח לא תהא כל טענה, תביעה ו/או דרישה בעניין זה.
בכל מקרה, כל טענה, תביעה ו/או דרישה לרבות תביעת נזיקין של הלקוח כלפי החברה, תהיה מוגבלת לערך אשר אינו עולה בכללותו ובמהותו מסכום הכולל אשר הלקוח שילם לחברה בפועל עבור השימוש בתוכנה במסגרת רכישת עותק תוכנה או במשך שלושה חודשי שירות.
על אף האמור בסעיף 53 לחוק החוזים (חלק כללי) התשל"ג-1973, הלקוח מוותר בזאת על כל זכות קיזוז העומדת לו כלפי החברה ו/או מכל תשלום אחר עפ"י חוזה זה, בגין תביעה כלשהי ו/או חיוב כספי כלשהו נגד החברה או מי מטעמה, בין קצובה ובין בלתי קצובה.
בכל מקרה תהיה החברה רשאית לסלק מעצמה כל אחריות על כל אי התאמה או נזק אפשרי הנטען על-ידי המשתמש אם וכאשר תחזיר החברה את תשלומיו של המשתמש עבור עותק התוכנה כאמור בסעיף 10.4 לעיל.
החברה מצהירה בזאת כי לא תוכל לספק את התוכנה ו/או השירותים ללא הגבלות האחריות האמורות בסעיף זה לעיל. לפיכך, הגבלות האחריות על החברה האמורות בסעיף זה לעיל הינן תנאי יסודי לקיום ההסכם.
החברה לא תהיה אחראית לשינויים שערך הלקוח בניגוד להוראות סעיף 3.2 לעיל, בתוכנה ולתפקוד התוכנה כפי שנמסרה על-ידי החברה ואשר שונתה בעקבות שינויים שערך הלקוח.
יובהר כי מבלי לגרוע מהאמור ברישיון שימוש זה, לאדית פתרונות תוכנה בעמ לא תהיה כל אחריות מכל סוג, לגבי כל תוכן ו/או מסמך ו/או תמונה ו/או אמירה או כל תוספת אחרת אשר הלקוח הוסיף לתוכנה וכל אחריות לכך תהיה ללקוח עצמו.
פיצויים ושיפוי
בכל מקרה של הפרת הוראות הסכם ו/או הוראות כל דין על ידי הלקוח ו/או אחר מטעמו בקשר עם התוכנה ו/או השירותים ו/או הוראות ההסכם, ישא הלקוח באחריות לכך, ויפצה ו/או ישפה את החברה בגין האמור, לרבות תשלום הוצאות משפטיות לחברה ושכר טרחת עורך דינה על פי דרישתה הראשונה וללא הוכחת נזק. המורשה מסכים בזאת לפצות ו/או לשפות את החברה לרבות הוצאותיה המשפטיות ושכר טרחת עורך דינה, בכל מקרה של טענה ו/או תביעה כלפי החברה בקשר עם ההסכם, השירותים, והתוכנה, אשר נובעות כתוצאה מהפרת הוראות ההסכם, הוראות כל דין, הפרת זכויות של צד שלישי על ידי המורשה ו/או מי מטעמו.
הלקוח מצהיר כי ידוע לו שהפרת התחייבויותיו ו/או הצהרותיו על-פי ההסכם לרבות הפרת זכויות יוצרים בתוכנה עשויה להסב לחברה נזקים מהותיים וכי כל מקרה של הפרה כאמור הנו נשוא לתביעה אזרחית הגוררת פיצויים כספיים וצווי מניעה וכן מהווה עבירה פלילית.
 

שירותי צדדים שלישיים
הלקוח עשוי להיחשף לשירותים, מוצרים והצעות שלא מצד החברה, אלא מאת צדדים שלישיים, בקשר לשימושו בתוכנה. באם המורשה מחליט להשתמש בשירותים אלו, חלה עליו האחריות הבלעדית לקרוא ולהבין את תנאי השימוש לגבי אותו מוצר או שירות המסופק על ידי צד-שלישי. הלקוח מאשר בזאת כי החברה לא תישא באחריות כלשהי לגבי אותו מוצר או שירות של צד שלישי והשימוש בו, לרבות כל תוצאה הנובעת משימוש זה והאחריות תחול על הלקוח באופן בלעדי. הלקוח מאשר בזאת לחברה להעביר את פרטי מידע הרישום הדרוש ליצירת קשר עימו, לרבות שמו וכתובתו, וזאת בכדי לאפשר מתן שירותי צד-שלישי.
התוכנה עשויה להכיל קישורים או לאפשר גישה לאתרי אינטרנט וליישומים שאינם מופעלים על ידי החברה, אלא בידי גורמים אחרים. קישורים אלו נועדו לנוחיות המורשה בלבד. אין לחברה שליטה באתרי אינטרנט או יישומים אלו, ואין היא נושאת באחריות לתכנים המופיעים בהם ו/או לשירותים הניתנים בהם. אין במתן הגישה לאתרים וליישומים אלו באמצעות התוכנה משום אישור לחומר המופיע בהם, ו/או להקנות זכות שימוש כלשהי במידע ובתכנים המצויים בהם ו/או כדי להעיד על קשר כלשהו עם מפעילי האתרים האמורים וכל שימוש באתרים או יישומים אלו הינו באחריות המשתמש בהם בלבד.
 

שונות
הדין החל על הסכם זה הם דיני מדינת ישראל. סמכות השיפוט הייחודית בכל הקשור להסכם זה, תהא לביהמ"ש המוסמך במחוז תל-אביב בלבד.
החברה רשאית להמחות את זכויותיה מכח הסכם זה ו/או לפעול באמצעות צד שלישי כלשהו לפי שיקול דעתה הבלעדי ובלבד שזכויותיו המהותיות של הלקוח על פי ההסכם לא תיפגענה.
החברה שומרת לעצמה את הזכות לשנות ו/או להוסיף ו/או למחוק הוראות ותנאים בהסכם בכל עת. שינויים בהסכם ייעשו לאחר שניתנה עליהם הודעה מוקדמת בכל דרך סבירה שהחברה תראה לנכון, לרבות שימוש באתר האינטרנט של החברה. כל שימוש של הלקוח ו/או מי מטעמו לאחר שבוצעו שינויים בהסכם, כמוהו כהסכמה של הלקוח לקבלת השינויים בהסכם.
בתום תקופת הרישיון רשאי הלקוח להודיע על סיום ההתקשרות והפסקת השימוש בתוכנה. במקרה זה, תתאפשר ללקוח צפייה בנתונים שנאגרו בתוכנה ללא קליטת מידע חדש ובלבד שהלקוח עמד בכל תנאי הסכם זה לרבות תשלום כל חוב לחברה. במקרה זה הלקוח יאפשר לחברה התחברות מרחוק לצורך שינוי ההגדרות בתוכנה בהתאם וכן יאשר בחתימתו כי יעשה שימוש כאמור בתוכנה בהתאם לנהלי החברה.
החברה לרבות עובדיה, מתחייבים לשמור על סודיות מוחלטת בקשר לכל נתונים של הלקוח אשר ייחשפו בעטיו של מתן השירות והתמיכה לתכנה. הלקוח ו/או מי מטעמו, לא יעביר ולא ימסור לאחרים ולא יעשה כל שימוש בכל מידע שהגיע לידי צד להסכם עקב, תוך כדי ו/או אגב ביצוע חיוביו על פי הסכם זה ו/או בקשר להסכם, וכל ידע, מסמך ונתונים מכל סוג ומין שהם שיגיעו לידי הצד האמור או לידי מי מהמועסקים על ידו ו/או מטעמו, אודות הצד השני להסכם, לרבות פעילותו, עסקיו, לקוחותיו, עובדיו, וסודות מסחריים שלו, בין אם מידע כאמור הגיע לידיו (במישרין ו/או בעקיפין) בקשר עם ביצוע של הסכם זה, ובין אם אחרת.
התנאים בהסכם ממצים את כל המוסכם בין הלקוח לבין החברה בקשר עם אספקת התוכנה לרבות הגבלת האחריות של החברה והספקים, התרופות והסעדים להם זכאים הצדדים בגין הפרת ההוראות והתנאים בהסכם בקשר עם התוכנה והשירותים וכל הצעה או הסכמה קודמים בנדון בין בעל פה ובין בכתב בטלים ומבוטלים.
מלבד החברה, אין לשום צד שלישי כלשהו זכות לשנות, להוסיף, להגביל תניה או הוראה מתניות וההוראות שבהסכם הנוגעים לחברה ו/או ספקיה. במקרה של שינוי בהסכם בדרך האמורה לעיל השינוי יהיה חסר תוקף ובטל, ואין בו כדי לחייב את החברה ו/או הספקים. כל שינוי בתנאי ההסכם או ויתור של זכות מזכויות החברה על פי ההסכם יעשו אך ורק בכתב ובחתימת מורשה חתימה מטעם החברה לביצוע השינוי ו/או הוויתור כאמור, ובלבד שהשינוי ו/או הוויתורים האמורים אינם סותרים תנאי ו/או הוראה מהתנאים וההוראות שבהסכם. במקרה של סתירה בין הוראה מקורית בהסכם לבין הוראה ו/או שינוי ו/או ויתור על זכות של החברה מכח ההסכם, ההוראה המקורית בהסכם גוברת על ההוראה המאוחרת.
בכל מקרה שבו הוראה מהוראות ההסכם אינה עומדת בהוראות הדין החל, ההוראה האמורה תפורש באופן כזה שהיא תתואם להוראות הדין החל וההוראה האמורה תמשיך להיות בתוקף.
כתובות הצדדים בכל הנוגע להסכם זה הן כאמור במבוא להסכם או כל מען אחר עליו תבוא הודעה מתאימה בכתב.
_________________________________________________________________

הנני מאשר בכניסתי לתוכנה ובפתיחת משתמש את כל תנאי רישיון השימוש הכתובים לעייל,  קבלת קוד משתמש מהווה את הסכמתי לרישיון השימוש
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>הבנתי</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>

      <Dialog open={openContact}>
        
        <DialogContent>
        <div className='w-full h-fit mx-auto overflow-y-hidden overflow-x-auto'>
          
        <div className='grid items-center mx-auto background-dark mt-1 w-[245px] xsss:w-[260px] mmu:w-[280px] md:w-[330px] h-fit px-6 py-4 rounded-xl text-white overflow-y-hidden'>
        <div className='flex items-center justify-end' onClick={()=> setOpenContact(false)}>
        <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out cursor-pointer hover:text-red-700' fontSize='large'/>
        </div>
        <h1 className='font-mono text-3xl text-center tracking-wide text-cyan-100 mb-2'>{`${hebrew ? "contact us" : "צור קשר"}`}</h1>
            <div className='flex w-full mx-auto bg-white rounded-md p-1'>
              {/* <form id="myform" onSubmit={sendMail} className='flex item-center justify-center w-full'>
                <div className='flex flex-col space-y-2 mt-2 w-full'>
                  <input type="text" placeholder="נושא" value={emailSubject} className='bg-white text-gray-700 shadow-xl placeholder:text-gray-400 placeholder:text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-xl px-2 py-3 w-full' onChange={e => setEmailSubject(e.target.value)}/>
                  <h1 id="demo-simple-select-label" className='text-center font-mono tracking-wide text-xl text-gray-700'>הודעה</h1>
                  <textarea
                    maxRows={8}
                    aria-label="maximum height"
                    className='bg-white text-gray-700 shadow-xl placeholder:text-right placeholder:text-gray-400 focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-xl px-2 py-2 w-full'
                    placeholder="מקסימום 10 שורות"
                    onChange={e => setEmailBody(e.target.value)}
                    value={emailBody}
                      style={{ height: 80 }}
                           />
                  <button type='submit' disabled={emailSubject == ""} className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold w-full rounded-lg'>שלח</button>
                  </div>
              </form> */}
              <form ref={form} onSubmit={sendEmail} className='flex item-center justify-center w-full'>
              <div className='flex flex-col space-y-3 mt-2 w-full'>
                  {/* <label className='text-gray-800 font-mono pr-4 text-right'>נושא</label> */}
                  
                  {hebrew ? (<>
                    
                      <TextField InputLabelProps={{
        shrink: true,
      }} label="subject" size='small' type="text" className='bg-white text-gray-700 shadow-xl placeholder:text-gray-400 placeholder:text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-xl px-2 py-3 w-full' name="user_name" />
                    
                  </>) : (
                    <>
                    <CacheProvider value={cacheRtl}>
                  <ThemeProvider theme={theme}>
                    <div dir="rtl">
                      <TextField InputLabelProps={{
        shrink: true,
      }} label="נושא" size='small' type="text" className='bg-white text-gray-700 shadow-xl placeholder:text-gray-400 placeholder:text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-xl px-2 py-3 w-full' name="user_name" />
                    </div>
                    </ThemeProvider>
                    </CacheProvider>
                    
                    </>
                  )}
                    
                  {/* <label className='text-gray-800 font-mono pr-4 text-right'>אימייל</label> */}
                  {hebrew ? (
                    <>
                    {/* <CacheProvider value={cacheRtl}>
                  <ThemeProvider theme={theme}> */}
                <TextField label="your email" size='small' type="email" value={result?.email} className='bg-white text-gray-700 shadow-xl placeholder:text-gray-400 placeholder:text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-xl px-2 py-3 w-full' name="user_email" />
                {/* </ThemeProvider>
                    </CacheProvider> */}
                    </>
                  ) : (
                    <>
                    <CacheProvider value={cacheRtl}>
                  <ThemeProvider theme={theme}>
                <TextField label="אימייל" size='small' type="email" value={result?.email} className='bg-white text-gray-700 shadow-xl placeholder:text-gray-400 placeholder:text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-xl px-2 py-3 w-full' name="user_email" />
                </ThemeProvider>
                    </CacheProvider>
                    </>
                  )}
                  <div>
                    {hebrew ? <h1 className='text-gray-500 font-semibold font-mono pl-2'>message</h1> : <h1 className='text-gray-500 font-semibold font-mono pr-2 text-right'>הודעה</h1>}
                <textarea name="message" className='bg-white text-gray-700 shadow-md text-right border-[0.2px] border-gray-300 placeholder:text-right placeholder:text-gray-400 focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-xl px-2 py-2 w-full'/>
                <input type="submit" value={`${hebrew ? "send message" : "שלח הודעה"}`} className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold w-full rounded-lg cursor-pointer'/>
                  </div>
                </div>
              </form>
            </div>
            <div className='flex flex-col'>
            <div className='flex flex-col mt-2 space-y-2'>
                {hebrew ? (
                  <>
                  <div className='flex space-x-2 items-center justify-start'>
                  <PhoneIcon className='text-teal-300'/>
                  <h1 className='font-mono tracking-wider text-cyan-100'>02-6422957</h1>
              </div>
              <div className='flex space-x-2 items-center justify-start'>
                  <MailIcon className='text-teal-300'/>
                  <h1 className='font-mono tracking-wider text-cyan-100'>info@nartina.com</h1>
              </div>
              <div className='flex space-x-2 items-center justify-start' >
                  <BusinessIcon className='text-teal-300'/>
                  <h1 className='font-mono text-cyan-100 text-sm mmu:text-md'>nartina software solutions</h1>
              </div>
              </>
                ) : (
                  <>
                  <div className='flex space-x-2 items-center justify-end'>
                    <h1 className='font-mono tracking-wider text-cyan-100'>02-6422957</h1>
                    <PhoneEnabledIcon className='text-teal-300'/>
                </div>
                <div className='flex space-x-2 items-center justify-end'>
                    <h1 className='font-mono tracking-wider text-cyan-100'>info@nartina.com</h1>
                    <MailIcon className='text-teal-300'/>
                </div>
                <div className='flex space-x-2 items-center justify-end' >
                    <h1 className='font-mono text-cyan-100 text-sm mmu:text-md'>נרטינה פתרונות תוכנה</h1>
                    <BusinessIcon className='text-teal-300'/>
                </div>
                </>
                )}
              </div>
            </div>
        </div>
    </div>
        </DialogContent>
       
    </Dialog>
    <Snackbar open={openAlertAdd} autoHideDuration={10000} onClose={handleClose2} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose2}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            אימייל נשלח בהצלחה
        </Alert>
      </Snackbar>

      <Snackbar open={errorMode} autoHideDuration={15000} onClose={handleClose9} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose9}
          severity="error"
          sx={{ width: "100%" }}
        >
          אימייל לא נשלח, נסה שוב יותר מאוחר
        </Alert>
      </Snackbar>
      <Dialog open={faq}>
      <div class="min-w-[350px] max-w-[850px] mx-auto bg-white min-h-screen py-5 px-9">
        <CloseIcon className="justify-end cursor-pointer" onClick={()=> setFaq(false)}/>
	<div class="flex flex-col items-center">
		<h2 class="font-bold text-5xl mt-5 tracking-tight">
			FAQ
		</h2>
		<p class="text-neutral-500 text-xl mt-3">
			Frequenty asked questions
		</p>
	</div>
	<div class="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> What is a SAAS platform?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					 SAAS platform is a cloud-based software service that allows users to access
					and use a variety of tools and functionality.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> How does  billing work?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					We offers a variety of billing options, including monthly and annual subscription plans,
					as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit
					card or other secure online payment method.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> Can I get a refund for my subscription?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					We offers a 30-day money-back guarantee for most of its subscription plans. If you are not
					satisfied with your subscription within the first 30 days, you can request a full refund. Refunds
					for subscriptions that have been active for longer than 30 days may be considered on a case-by-case
					basis.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> How do I cancel my subscription?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					To cancel your We subscription, you can log in to your account and navigate to the
					subscription management page. From there, you should be able to cancel your subscription and stop
					future billing.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> Can I try this platform for free?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					We offers a free trial of its  platform for a limited time. During the trial period,
					you will have access to a limited set of features and functionality, but you will not be charged.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> How do I access   documentation?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					  Documentation is available on the company's website and can be accessed by
					logging in to your account. The documentation provides detailed information on how to use the ,
					as well as code examples and other resources.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> How do I contact support?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					If you need help with the platform or have any other questions, you can contact the
					company's support team by submitting a support request through the website or by emailing
					support@We.com.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> Do you offer any discounts or promotions?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					We may offer discounts or promotions from time to time. To stay up-to-date on the latest
					deals and special offers, you can sign up for the company's newsletter or follow it on social media.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> How do we compare to other similar services?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					 This platform is a highly reliable and feature-rich service that offers a wide range
					of tools and functionality. It is competitively priced and offers a variety of billing options to
					suit different needs and budgets.
				</p>
			</details>
		</div>
	</div>
</div>
 {/* <div className="w-96 px-4 pt-8">
 <CloseIcon className="justify-end cursor-pointer text-red-500 hover:text-red-400" onClick={()=> setFaq(false)}/>
	<div class="flex flex-col items-center mb-4">
		<h2 class="font-bold text-5xl mt-5 tracking-tight">
			FAQ
		</h2>
		<p class="text-neutral-500 text-xl mt-3">
			Frequenty asked questions
		</p>
	</div>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2 mb-4">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>What is your refund policy?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Do you offer technical support?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div> */}
      </Dialog>
  </div>
  )
}

export default FooterHebrew