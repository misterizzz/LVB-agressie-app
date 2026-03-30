export interface Choice {
  id: string;
  label: string;
  responseText: string;
  stressDelta: number;
  trustDelta: number;
  feedback: string;
  nextSceneId: string;
  tags: string[];
}

export interface Scene {
  id: string;
  phase: number;
  title: string;
  narrative: string;
  clientBehavior: string;
  choices: Choice[];
}

export interface Ending {
  id: string;
  type: 'good' | 'mixed' | 'bad';
  title: string;
  description: string;
  advice: string;
}

export interface Scenario {
  title: string;
  subtitle: string;
  clientName: string;
  clientAge: number;
  clientDescription: string;
  context: string;
  learningGoals: string[];
  scenes: Scene[];
  endings: Ending[];
}

export const scenario: Scenario = {
  title: 'Contact onder spanning',
  subtitle: 'De-escaleren bij een cliënt met LVB tijdens een contactmoment',
  clientName: 'Milan',
  clientAge: 24,
  clientDescription:
    'Milan is 24 jaar, heeft een licht verstandelijke beperking (LVB) en functioneert sociaal-emotioneel op het niveau van 2–3 jaar. Hij reageert sterk op onduidelijkheid, druk, plotselinge overgangen en te veel taal.',
  context:
    'Je werkt als begeleider in een woonvoorziening. Het is bijna etenstijd en Milan moet handen wassen voordat hij aan tafel kan. Dit soort overgangsmomenten zijn voor Milan vaak lastig.',
  learningGoals: [
    'Vroege spanningssignalen herkennen',
    'Aansluiten bij sociaal-emotioneel niveau 2–3 jaar',
    'De-escalerende communicatie toepassen',
    'Veiligheid bewaken',
    'Reflecteren op eigen handelen',
  ],
  scenes: [
    {
      id: 'scene-1',
      phase: 1,
      title: 'Observeren',
      narrative:
        'Je loopt de woonkamer in. Milan zit op de bank. Het is bijna etenstijd en je moet hem begeleiden naar de wastafel om handen te wassen.',
      clientBehavior:
        'Milan zit onrustig op de bank. Hij friemelt aan zijn mouw, maakt korte geluiden en kijkt weg als je binnenkomt. Zijn schouders zijn gespannen.',
      choices: [
        {
          id: 'scene-1-a',
          label: 'Ik zeg meteen dat hij moet opschieten.',
          responseText:
            '"Milan, kom, opschieten! We gaan eten en je moet nog handen wassen."',
          stressDelta: 20,
          trustDelta: -15,
          feedback:
            'Je gebruikte te veel taal en gaf druk. Milan raakt hierdoor eerder overprikkeld. Bij een sociaal-emotioneel niveau van 2–3 jaar werkt haast averechts.',
          nextSceneId: 'scene-2',
          tags: ['overprikkeling', 'te-veel-taal', 'druk'],
        },
        {
          id: 'scene-1-b',
          label: 'Ik observeer eerst en benoem rustig wat ik zie.',
          responseText:
            'Je gaat rustig in de buurt zitten, op ooghoogte. Je zegt zacht: "Hé Milan, ik zie dat je aan je mouw zit. Het is bijna etenstijd."',
          stressDelta: -5,
          trustDelta: 15,
          feedback:
            'Goed: je observeerde eerst, ging op ooghoogte zitten en benoemde rustig wat je zag. Dit sluit aan bij het sociaal-emotioneel niveau en geeft Milan tijd om te wennen aan je aanwezigheid.',
          nextSceneId: 'scene-2',
          tags: ['de-escalatie', 'observeren', 'aansluiten'],
        },
        {
          id: 'scene-1-c',
          label: 'Ik pak zijn hand om hem direct te begeleiden.',
          responseText:
            'Je loopt naar Milan en pakt zijn hand om hem mee te nemen naar de wastafel.',
          stressDelta: 25,
          trustDelta: -20,
          feedback:
            'Fysieke sturing zonder waarschuwing verhoogt de spanning. Milan heeft geen controle en voelt zich overvallen. Dit past niet bij zijn behoefte aan voorspelbaarheid.',
          nextSceneId: 'scene-2',
          tags: ['fysieke-sturing', 'overprikkeling', 'onveilig'],
        },
      ],
    },
    {
      id: 'scene-2',
      phase: 2,
      title: 'Spanningsopbouw',
      narrative:
        'Je kondigt de overgang aan: het is tijd om handen te wassen voor het eten. Milan reageert op jouw benadering.',
      clientBehavior:
        'Milan kijkt je niet aan. Als je over handen wassen begint, roept hij "Nee!" en draait zich van je af. Hij duwt je hand weg als je dichterbij komt.',
      choices: [
        {
          id: 'scene-2-a',
          label: '"Kom, nu handen wassen, geen discussie."',
          responseText:
            '"Milan, nu handen wassen. Geen discussie, we gaan eten."',
          stressDelta: 20,
          trustDelta: -15,
          feedback:
            'Je gaf een directief commando zonder keuze. Bij een sociaal-emotioneel niveau van 2–3 jaar werkt dit als druk en roept verzet op.',
          nextSceneId: 'scene-3',
          tags: ['directief', 'geen-keuze', 'druk'],
        },
        {
          id: 'scene-2-b',
          label: '"Eerst handen wassen. Wil je zelf lopen of loop ik mee?"',
          responseText:
            'Je bukt je naar Milan en zegt rustig: "Milan, eerst handen wassen. Wil je zelf lopen, of zal ik meelopen?"',
          stressDelta: -10,
          trustDelta: 15,
          feedback:
            'Goed: je gaf een korte, duidelijke boodschap met een keuze uit twee opties. Dit past bij het ontwikkelingsniveau en geeft Milan een gevoel van controle.',
          nextSceneId: 'scene-3',
          tags: ['de-escalatie', 'keuze-geven', 'korte-taal'],
        },
        {
          id: 'scene-2-c',
          label: '"Waarom doe je nou zo moeilijk?"',
          responseText: '"Milan, waarom doe je nou zo moeilijk? Iedereen gaat eten."',
          stressDelta: 25,
          trustDelta: -20,
          feedback:
            'Je deed een moreel beroep en gebruikte een abstracte vraag. Milan kan op dit ontwikkelingsniveau niet reflecteren op zijn eigen gedrag in een spannend moment. Dit verhoogt de frustratie.',
          nextSceneId: 'scene-3',
          tags: ['moreel-beroep', 'abstract', 'escalerend'],
        },
      ],
    },
    {
      id: 'scene-3',
      phase: 3,
      title: 'Escalatiepunt',
      narrative:
        'De spanning is gestegen. Milan wordt steeds bozer en de situatie dreigt te escaleren.',
      clientBehavior:
        'Milan schreeuwt hard en duwt je met kracht weg. Hij slaat met zijn vuist op de leuning van de bank. Zijn gezicht is rood en zijn ademhaling is snel.',
      choices: [
        {
          id: 'scene-3-a',
          label: '"Rustig! Nu stoppen!"',
          responseText:
            'Je verheft je stem: "Milan! Rustig! Nu stoppen met dat gedrag!"',
          stressDelta: 25,
          trustDelta: -20,
          feedback:
            'Je verhief je stem en gaf een correctie in een verhitte situatie. Dit versterkt de spanning. Milan kan op dit moment niet "stoppen" op commando — zijn stressreactie heeft de overhand.',
          nextSceneId: 'scene-4',
          tags: ['stem-verheffen', 'corrigeren', 'escalerend'],
        },
        {
          id: 'scene-3-b',
          label: '"Ik zie dat je boos bent. Ik doe een stapje terug."',
          responseText:
            'Je zegt met een lage, rustige stem: "Milan, ik zie dat je boos bent." Je doet een stap achteruit en houdt je handen open langs je lichaam.',
          stressDelta: -10,
          trustDelta: 15,
          feedback:
            'Goed: je benoemde zijn emotie en creëerde fysieke afstand. Je non-verbale houding was open en niet-bedreigend. Dit geeft Milan ruimte om te reguleren.',
          nextSceneId: 'scene-4',
          tags: ['de-escalatie', 'emotie-benoemen', 'afstand', 'veiligheid'],
        },
        {
          id: 'scene-3-c',
          label: '"Als je niet luistert, mag je niet aan tafel."',
          responseText:
            '"Milan, als je niet luistert, mag je straks niet aan tafel zitten."',
          stressDelta: 20,
          trustDelta: -15,
          feedback:
            'Je dreigde met een consequentie in een acute stresssituatie. Milan kan op dit moment geen verband leggen tussen zijn gedrag en een toekomstige consequentie. Dit verhoogt zijn onveiligheidsgevoel.',
          nextSceneId: 'scene-4',
          tags: ['dreigen', 'consequentie', 'escalerend'],
        },
      ],
    },
    {
      id: 'scene-4',
      phase: 4,
      title: 'Veiligheid & De-escalatie',
      narrative:
        'Milan pakt een beker van de tafel en gooit deze door de kamer. Jij moet nu veiligheid en de-escalatie combineren.',
      clientBehavior:
        'Milan staat nu op, ademt zwaar en kijkt wild om zich heen. Hij heeft net een beker gegooid. Andere bewoners kijken geschrokken.',
      choices: [
        {
          id: 'scene-4-a',
          label: 'Dichterbij komen en streng toespreken.',
          responseText:
            'Je loopt naar Milan toe en zegt streng: "Dit kan echt niet. Ga nu zitten."',
          stressDelta: 30,
          trustDelta: -20,
          feedback:
            'Je verkortte de afstand in een onveilige situatie en gaf een commando. Dit verhoogt de kans op fysiek contact en versterkt de paniek bij Milan.',
          nextSceneId: 'scene-5',
          tags: ['onveilig', 'te-dichtbij', 'escalerend'],
        },
        {
          id: 'scene-4-b',
          label: 'Omgeving veilig maken en prikkels verlagen.',
          responseText:
            'Je schuift rustig het servies uit de buurt. Je vraagt een collega om de andere bewoners even mee te nemen. Je zet de tv uit. Je blijft op afstand en zegt kalm: "Milan, ik ben hier. Het is oké."',
          stressDelta: -15,
          trustDelta: 20,
          feedback:
            'Goed: je maakte de omgeving veilig, verminderde prikkels en bleef rustig op afstand. Je gaf een simpele boodschap van nabijheid zonder druk. Dit is precies wat nodig is bij een escalatiepunt.',
          nextSceneId: 'scene-5',
          tags: [
            'de-escalatie',
            'veiligheid',
            'prikkelreductie',
            'omgeving-aanpassen',
          ],
        },
        {
          id: 'scene-4-c',
          label: 'Door blijven praten en uitleggen waarom hij moet luisteren.',
          responseText:
            '"Milan, luister, je moet handen wassen want we gaan eten en het is belangrijk dat je schone handen hebt want er zijn bacteriën en..."',
          stressDelta: 25,
          trustDelta: -15,
          feedback:
            'Je gebruikte veel te veel taal in een moment van hoge stress. Milan kan dit niet verwerken. Overprikkeling door taal verergert de situatie.',
          nextSceneId: 'scene-5',
          tags: ['te-veel-taal', 'overprikkeling', 'escalerend'],
        },
      ],
    },
    {
      id: 'scene-5',
      phase: 5,
      title: 'Herstel',
      narrative:
        'De spanning zakt langzaam iets. Milan staat nog steeds, maar zijn ademhaling wordt rustiger. Hij kijkt naar de grond.',
      clientBehavior:
        'Milan staat stil, kijkt naar beneden. Zijn vuisten zijn niet meer gebald. Hij mompelt zachtjes. De ergste piek lijkt voorbij.',
      choices: [
        {
          id: 'scene-5-a',
          label: 'Direct de oorspronkelijke eis opnieuw stellen.',
          responseText:
            '"Oké Milan, nu gaan we alsnog handen wassen. Kom mee."',
          stressDelta: 20,
          trustDelta: -15,
          feedback:
            'Je ging te snel terug naar de oorspronkelijke eis. Milan heeft eerst tijd nodig om te reguleren. Terugvallen op de eis kan een nieuwe escalatie uitlokken.',
          nextSceneId: 'end',
          tags: ['te-snel', 'druk', 'escalerend'],
        },
        {
          id: 'scene-5-b',
          label: 'Eerst laten reguleren, dan rustig de volgende stap aanbieden.',
          responseText:
            'Je blijft op afstand en geeft Milan even de tijd. Na een minuut zeg je rustig: "Milan, het is rustig nu. Wil je even water drinken of zullen we zo samen lopen?"',
          stressDelta: -15,
          trustDelta: 20,
          feedback:
            'Goed: je gaf Milan tijd om te reguleren voordat je een volgende stap aanbood. De keuze uit twee simpele opties geeft controle terug. Eerst regulatie, dan pas actie — dat is de juiste volgorde.',
          nextSceneId: 'end',
          tags: ['de-escalatie', 'regulatie', 'keuze-geven', 'herstel'],
        },
        {
          id: 'scene-5-c',
          label: 'Uitgebreid nabespreken wat hij fout deed.',
          responseText:
            '"Milan, snap je waarom dat niet kan? Je hebt een beker gegooid en dat is niet oké. Wat had je anders kunnen doen?"',
          stressDelta: 15,
          trustDelta: -10,
          feedback:
            'Je stelde een complexe reflectievraag terwijl Milan nog aan het reguleren is. Op sociaal-emotioneel niveau 2–3 jaar kan hij nu niet reflecteren. Eerst rust, dan pas — op een later moment — kort en simpel evalueren.',
          nextSceneId: 'end',
          tags: ['te-complex', 'reflectie-te-vroeg', 'escalerend'],
        },
      ],
    },
  ],
  endings: [
    {
      id: 'ending-a',
      type: 'good',
      title: 'Goede de-escalatie',
      description:
        'Je hebt goed aangesloten bij Milan. Door rustig te blijven, korte taal te gebruiken, keuzevrijheid te bieden en de omgeving aan te passen, is Milan tot rust gekomen. Het contactmoment kon op een aangepaste manier worden hervat.',
      advice:
        'Je liet zien dat je de signalen herkende en de-escalerend handelde. Blijf oefenen met het herkennen van vroege spanningssignalen en het bieden van voorspelbaarheid.',
    },
    {
      id: 'ending-b',
      type: 'mixed',
      title: 'Gedeeltelijk herstel',
      description:
        'De situatie is deels gestabiliseerd, maar er waren momenten waarop de spanning onnodig opliep. Milan is tot rust gekomen, maar het contactmoment moest worden uitgesteld.',
      advice:
        'Je maakte een aantal goede keuzes, maar er zijn verbeterpunten. Let vooral op het gebruik van korte taal, het bieden van keuzes en het vermijden van druk in spannende momenten.',
    },
    {
      id: 'ending-c',
      type: 'bad',
      title: 'Volledige escalatie',
      description:
        'De situatie is geëscaleerd. Milan was niet meer bereikbaar en de veiligheid moest door collega\'s worden gewaarborgd. Het contactmoment kon niet plaatsvinden.',
      advice:
        'De spanning liep op door te veel taal, druk of fysieke nabijheid. Probeer het opnieuw en focus op: rustig blijven, afstand houden, prikkels verminderen en korte zinnen gebruiken. Denk aan het sociaal-emotioneel niveau van 2–3 jaar.',
    },
  ],
};

export const reflectionQuestions = [
  {
    id: 'reaction',
    phase: 'Reactie',
    question: 'Hoe voelde deze situatie voor jou?',
    options: [
      'Ik voelde me rustig en in controle',
      'Ik voelde me onzeker over mijn keuzes',
      'Ik voelde me gestrest of overweldigd',
      'Ik voelde me gefrustreerd door het gedrag van Milan',
    ],
  },
  {
    id: 'description',
    phase: 'Beschrijving',
    question: 'Wat gebeurde er volgens jou in de opbouw van de spanning?',
    options: [
      'Milan gaf duidelijke signalen die ik vroeg herkende',
      'De spanning bouwde geleidelijk op en ik kon bijsturen',
      'Het escaleerde snel en ik had moeite om bij te sturen',
      'Ik merkte de signalen pas laat op',
    ],
  },
  {
    id: 'analysis',
    phase: 'Analyse',
    question: 'Welk type benadering werkte het beste?',
    options: [
      'Korte zinnen en keuze geven uit twee opties',
      'Emotie benoemen en afstand houden',
      'Omgeving aanpassen en prikkels verlagen',
      'Tijd geven om te reguleren voor de volgende stap',
    ],
  },
  {
    id: 'application',
    phase: 'Toepassing',
    question: 'Wat neem je mee naar een echt contactmoment?',
    options: [
      'Eerst observeren voor ik iets doe',
      'Minder taal gebruiken in spannende situaties',
      'Meer keuzes bieden en minder sturen',
      'Beter letten op vroege spanningssignalen',
    ],
  },
];
