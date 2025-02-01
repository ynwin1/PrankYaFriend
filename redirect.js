function initializePrankster() {
    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a');
        if (anchor && isSearchEngineLink(anchor)) {
            e.preventDefault();
            chrome.storage.local.get('linkprank_probability', (data) => {
                const setRandomness = data.linkprank_probability || 0.5;

                const random = Math.random();

                if (random < setRandomness) {
                    const randomURL = getRandomURL();
                    console.log("Redirecting to random URL: " + randomURL);
                    window.location.href = randomURL
                } else {
                    console.log("Redirecting to clicked URL: " + e.target.href);
                    window.location.href = anchor.href;
                }
            });
        }
    }, true);
}


const randomURLs = [
    "http://www.milliondollarhomepage.com/",
    "https://onesquareminesweeper.com/",
    "https://www.youtube.com/watch?v=jofNR_WkoCE",
    "https://www.boredbutton.com",
    "https://www.r33b.net",
    "https://www.blankwindows.com/",
    "https://www.albinoblacksheep.com/flash/llama",
    "https://en.wikipedia.org/wiki/Mansfield_Smith-Cumming",
    "http://www.partridgegetslucky.com/",
    "https://www.youtube.com/watch?v=9bZkp7q19f0",
    "https://en.wikipedia.org/wiki/Emu_War",
    "https://en.wikipedia.org/wiki/Pyongyang_(restaurant_chain)",
    "https://en.wikipedia.org/wiki/Unusually-shaped_vegetable",
    "https://www.youtube.com/watch?v=3MteSlpxCpo",
    "https://en.wikipedia.org/wiki/Paul_Karason",
    "https://en.wikipedia.org/wiki/United_States_v._Approximately_64,695_Pounds_of_Shark_Fins",
    "https://en.wikipedia.org/wiki/Thursday_October_Christian_I",
    "https://www.youtube.com/watch?v=wZZ7oFKsKzY",
    "https://www.xmasclock.com/",
    "https://en.wikipedia.org/wiki/Phantom_kangaroo",
    "https://neal.fun/earth-reviews/",
    "https://www.youtube.com/watch?v=J---aiyznGQ",
    "https://puttingweirdthingsincoffee.com/",
    "https://www.youtube.com/watch?v=NjfGRz11dMk",
    "https://www.adultswim.com/etcetera/choir/",
    "https://www.youtube.com/watch?v=QjA5faZF1A8",
    "https://www.youtube.com/watch?v=zecCDaI-fgo",
    "https://www.theatlantic.com/health/archive/2020/04/pandemic-confusing-uncertainty/610819/",
    "https://en.wikipedia.org/wiki/Batman_v._Commissioner",
    "https://www.youtube.com/watch?v=DLzxrzFCyOs",
    "http://www.everydayim.com/",
    "https://www.donothingfor2minutes.com",
    "https://en.wikipedia.org/wiki/Infinite_monkey_theorem",
    "https://williamhoza.com/text/?t=Gotcha",
    "https://jellymar.io/",
    "https://en.wikipedia.org/wiki/Smell_of_freshly_cut_grass",
    "https://www.youtube.com/watch?v=1TyOfqcULVc",
    "https://en.wikipedia.org/wiki/Toilet_paper_orientation",
    "https://en.wikipedia.org/wiki/Buffalo_buffalo_Buffalo_buffalo_buffalo_buffalo_Buffalo_buffalo",
    "https://glowy-earthquakes.glitch.me/",
    "https://en.wikipedia.org/wiki/James_while_John_had_had_had_had_had_had_had_had_had_had_had_a_better_effect_on_the_teacher",
    "https://www.cat-bounce.com",
    "https://mrdoob.com/#/126/or_so_they_say",
    "https://www.thatsthefinger.com",
    "https://www.windows93.net",
    "https://en.wikipedia.org/wiki/Spelling_of_Shakespeare%27s_name",
    "https://en.wikipedia.org/wiki/Death_by_vending_machine",
    "https://drumsound.net/",
    "https://www.rrrgggbbb.com",
    "http://www.momentmag.com/a-house-divided/",
    "https://mondrianandme.com/",
    "https://en.wikipedia.org/wiki/Microsoft_v._MikeRoweSoft",
    "https://www.youtube.com/watch?v=1TewCPi92ro",
    "https://www.youtube.com/watch?v=nf0wQzq9Yzg",
    "https://www.omfgdogs.com",
    "https://www.youtube.com/watch?v=wvM8EtpUXJQ",
    "https://en.wikipedia.org/wiki/Dick_Assman",
    "https://www.youtube.com/watch?v=8SbUC-UaAxE",
    "https://walzr.com/IMG_0001",
    "https://www.googlesheepview.com/",
    "https://www.youtube.com/watch?v=6n3pFFPSlW4",
    "https://en.wikipedia.org/wiki/The_Moon_is_made_of_green_cheese",
    "https://www.sometimesredsometimesblue.com",
    "https://smashthewalls.com/",
    "https://www.duckphotograph.com/",
    "https://thisisnotajumpscare.com/",
    "https://www.youtube.com/watch?v=2KnTpm9Y77E",
    "https://zapatopi.net/afdb/",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://www.eso.org/public/images/eso1242a/zoomable/",
    "https://www.youtube.com/watch?v=4WgT9gy4zQA",
    "https://www.tacospin.com",
    "https://en.wikipedia.org/wiki/Loveday_(1458)",
    "https://www.ihasabucket.com/",
    "https://www.xn--slarsteinn-gbb.com/",
    "https://www.museumofconceptualart.com/accomplished/index.html",
    "https://www.internationalarchiveofdreams.com/",
    "https://en.wikipedia.org/wiki/Longest_word_in_English",
    "https://www.theendofreason.com",
    "https://burymewithmymoney.com/",
    "https://www.404media.co/zuckerberg-says-everything-i-say-leaks-in-leaked-meeting-audio/",
    "http://www.ismycomputeron.com/",
    "http://www.staggeringbeauty.com/",
    "http://corndog.io/",
    "https://www.youtube.com/watch?v=F7nCDrf90V8",
    "https://www.sadforjapan.com",
    "https://www.crossdivisions.com",
    "https://www.youtube.com/watch?v=UnkZIeuBjfo",
    "https://www.youtube.com/watch?v=nPPA-fRnOwc",
    "https://neal.fun/where-does-the-day-go/",
    "https://www.youtube.com/watch?v=WU_74a7K_oY",
    "https://en.wikipedia.org/wiki/Meaning_of_life",
    "https://www.hasthelargehadroncolliderdestroyedtheworldyet.com/",
    "https://en.wikipedia.org/wiki/Tokyo_Sexwale",
    "https://www.youtube.com/watch?v=job1V_dqYxQ",
    "https://www.movenowthinklater.com/",
    "https://2016.makemepulse.com/",
    "https://www.youtube.com/watch?v=y_2qAVcBKh0",
    "https://en.wikipedia.org/wiki/My_postillion_has_been_struck_by_lightning",
    "https://alwaysjudgeabookbyitscover.com/",
    "https://www.youtube.com/watch?v=UTS8JgFj5Gg",
    "https://www.youtube.com/watch?v=jyMvQEOtGPc",
    "http://aeon.co/magazine/nature-and-cosmos/plankton-the-tiny-sentinels-of-the-deep/",
    "https://www.youtube.com/watch?v=SzKBLPckUA8",
    "https://www.pleaselike.com/",
    "https://en.wikipedia.org/wiki/Osama_Vinladen",
    "https://www.trashloop.com",
    "https://en.wikipedia.org/wiki/New_car_smell",
    "https://www.youtube.com/watch?v=dL7LK3iEaVw",
    "https://www.koalastothemax.com",
    "https://www.youtube.com/watch?v=Xt-C6Whs0fI",
    "https://en.wikipedia.org/wiki/Breast-shaped_hill",
    "https://www.youtube.com/watch?v=_nfRqnpVmJc",
    "https://www.stick-of-gum.com/",
    "https://en.wikipedia.org/wiki/Hotel_toilet_paper_folding",
    "https://www.youtube.com/watch?v=YxIiPLVR6NA",
    "https://nobodyhere.com/justme/me.here",
    "https://www.topic.com/the-bar-mitzvah-party-starters",
    "https://www.youtube.com/watch?v=oHg5SJYRHA0",
    "https://www.youtube.com/watch?v=ST83u6TN3YE",
    "https://noidontknow.com/",
    "https://www.youtube.com/watch?v=nSFcFYjqRS0",
    "https://www.youtube.com/watch?v=2X_2IdybTV0",
    "https://www.theguardian.com/lifeandstyle/2019/oct/25/why-do-people-hate-vegans",
    "https://drawing.garden/",
    "http://www.republiquedesmangues.fr/",
    "https://www.heeeeeeeey.com",
    "https://en.wikipedia.org/wiki/International_Talk_Like_a_Pirate_Day",
    "https://en.wikipedia.org/wiki/There_is_no_sex_in_the_USSR",
    "https://oct82.com/",
    "http://www.edcaesar.co.uk/article.php?page=3&article_id=7",
    "http://ninjaflex.com/",
    "https://www.unicodesnowmanforyou.com",
    "https://www.youtube.com/watch?v=YbJOTdZBX1g",
    "https://www.youtube.com/watch?v=otCpCn0l4Wo",
    "https://www.fallingfalling.com",
    "https://www.youtube.com/watch?v=ZXFI7ZJHYsU",
    "https://www.somethingopen.com",
    "https://en.wikipedia.org/wiki/Oh-My-God_particle",
    "https://www.youtube.com/watch?v=2Z4m4lnjxkY",
    "https://en.wikipedia.org/wiki/Death_from_laughter",
    "https://www.youtube.com/watch?v=-BeTq99LqUo",
    "https://www.youtube.com/watch?v=8UVNT4wvIGY",
    "https://en.wikipedia.org/wiki/Gay_bomb",
    "https://www.youtube.com/watch?v=FODTpLSXo6g",
    "https://www.youtube.com/watch?v=xuCn8ux2gbs",
    "http://endless.horse/",
    "https://www.youtube.com/watch?v=9C_HReR_McQ",
    "https://www.niceme.me",
    "https://zoomquilt.org/",
    "https://en.wikipedia.org/wiki/Preserved_Fish",
    "https://www.youtube.com/watch?v=Fm252wRvaT4",
    "https://nothingeverhappens.com/",
    "https://www.youtube.com/watch?v=H-m4WdmmuOo",
    "https://upalc.com/follow-the-mouse.php",
    "https://en.wikipedia.org/wiki/Space_Poop_Challenge",
    "https://maninthedark.com/",
    "https://www.youtube.com/watch?v=0_YeVjKU1jQ",
    "https://en.wikipedia.org/wiki/Death_by_coconut",
    "https://en.wikipedia.org/wiki/MaDonal",
    "https://www.cracked.com/article_19021_5-amazing-things-invented-by-donald-duck-seriously.html",
    "https://en.wikipedia.org/wiki/Harry_Baals",
    "https://www.youtube.com/watch?v=ka5TXZEJFUg",
    "https://blueballmachine2.ytmnd.com/",
    "https://www.nytimes.com/interactive/2021/10/20/magazine/sharks-cape-cod.html",
    "https://rotatingsandwiches.com/",
    "https://www.youtube.com/watch?v=QH2-TGUlwu4",
    "https://hackertyper.com/",
    "https://www.youtube.com/watch?v=gQYo13gsHyQ",
    "https://jacksonpollock.org/",
    "https://www.window-swap.com/Window",
    "https://www.trypap.com",
    "http://www.patience-is-a-virtue.org/",
    "https://en.wikipedia.org/wiki/Tiny_Kox",
    "https://neal.fun/deep-sea/",
    "https://www.languagesquad.com/",
    "https://www.youtube.com/watch?v=vqbxFTN7-YY",
    "https://astriddalmady.com/cactusblue.html",
    "https://www.youtube.com/watch?v=nGeKSiCQkPw",
    "https://ffffidget.com/",
    "https://en.wikipedia.org/wiki/2_%2B_2_%3D_5",
    "https://corndogoncorndog.com/",
    "https://okay.wasv.me/",
    "https://conceptlab.com/simulator/",
    "https://en.wikipedia.org/wiki/Kardashian_Index",
    "https://www.youtube.com/watch?v=fqR7K53K0pg",
    "https://en.wikipedia.org/wiki/Pronunciation_of_GIF",
    "https://www.kamogo.com/1",
    "http://canopycanopycanopy.com/10/to_have_is_to_owe",
    "https://www.youtube.com/watch?v=5Yoz8Z60Da4",
    "https://vandervas.com/web-apps/2021/Eyeballs/index.html",
    "https://www.youtube.com/watch?v=RO_dAevhPtA",
    "https://www.leduchamp.com",
    "https://www.deepblackhole.com/",
]

function getRandomURL() {
    return randomURLs[Math.floor(Math.random() * randomURLs.length)];
}

function isSearchEngineLink(url) {
    const searchEngines = [
        'google.com',
        'bing.com',
        'yahoo.com',
        'duckduckgo.com',
        'baidu.com'
    ]
    return searchEngines.some(searchEngine => window.location.hostname.includes(searchEngine));
}

initializePrankster();