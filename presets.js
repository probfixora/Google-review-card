/* =====================================================================
   Business type presets (English + Hinglish)
   A(): ek "pasand aaya / behtar ho sakta hai" option
        A(label EN, label Hinglish, phrase EN, phrase Hinglish, improve EN?, improve Hinglish?)
   S(): ek single-choice option jo apna poora sentence deta hai
   M(): multi-choice extra option (label EN, label Hinglish, phrase EN, phrase Hinglish)
   ===================================================================== */
(function () {
  const A = (le, lh, pe, ph, ne, nh) => ({ l:{en:le, hi:lh}, p:{en:pe, hi:ph}, n:{en:ne||pe, hi:nh||ph} });
  const S = (le, lh, en, hi) => ({ l:{en:le, hi:lh}, say:{en, hi} });
  const M = (le, lh, pe, ph) => ({ l:{en:le, hi:lh}, p:{en:pe, hi:ph} });
  const same = a => ({ good:a, bad:a });

  const CLEAN = A("Cleanliness", "Safai", "the cleanliness", "safai");
  const STAFF = A("Staff", "Staff", "the staff", "staff");

  const WITH = {
    t: { en:"Who were you with?", hi:"Kiske saath aaye the?" }, type:"single",
    o: [
      S("Family", "Family",
        { good:["Perfect place to visit with family.", "Came with family and everyone enjoyed it."], bad:["Visited with my family."] },
        { good:["Family ke saath gaye the, sabko bahut pasand aaya.", "Family ke saath aane ke liye perfect jagah hai."], bad:["Family ke saath gaye the."] }),
      S("Friends", "Dost",
        { good:["Great spot to hang out with friends."], bad:["Visited with friends."] },
        { good:["Doston ke saath hangout ke liye badhiya jagah hai."], bad:["Doston ke saath gaye the."] }),
      S("Partner", "Partner",
        { good:["Lovely place for a date."], bad:["Visited with my partner."] },
        { good:["Date ke liye bahut achhi jagah hai."], bad:["Partner ke saath gaye the."] }),
      S("Office team", "Office team",
        { good:["Good place for a team outing."], bad:["Visited with my office team."] },
        { good:["Office team ke saath outing ke liye achhi jagah hai."], bad:["Office team ke saath gaye the."] }),
      S("On my own", "Akele",
        { good:["Nice place to relax, even on your own."], bad:["Visited alone."] },
        { good:["Akele baith ke relax karne ke liye bhi achhi jagah hai."], bad:["Akele gaye the."] })
    ]
  };

  window.REVIEW_PRESETS = {
    res: {
      label:"Restaurant", noun:{en:"restaurant", hi:"restaurant"}, nouns:{en:"restaurants", hi:"restaurants"}, extra:WITH,
      aspects:[
        A("Taste", "Taste", "the taste of the food", "khane ka taste"),
        A("Service", "Service", "the service", "service"),
        A("Ambience", "Mahaul", "the ambience", "mahaul"),
        CLEAN,
        A("Value for money", "Price", "the value for money", "price", "the pricing", "price"),
        A("Quick serving", "Jaldi serving", "how quickly the food was served", "jaldi serving", "the serving time", "serving ka time")
      ]
    },
    cafe: {
      label:"Cafe", noun:{en:"cafe", hi:"cafe"}, nouns:{en:"cafes", hi:"cafes"}, extra:WITH,
      aspects:[
        A("Coffee", "Coffee", "the coffee", "coffee"),
        A("Food", "Khana", "the food", "khana"),
        A("Vibe", "Vibe", "the vibe", "vibe"),
        A("Service", "Service", "the service", "service"),
        CLEAN,
        A("Value for money", "Price", "the value for money", "price", "the pricing", "price")
      ]
    },
    salon: {
      label:"Salon / Parlour", noun:{en:"salon", hi:"salon"}, nouns:{en:"salons", hi:"salons"},
      extra:{
        t:{ en:"What did you get done?", hi:"Kaunsi service li?" }, type:"multi",
        say:{ en:["Got {list} done here.", "Went in for {list}."], hi:["Yahan {list} karwaya.", "{List} karwaya tha."] },
        o:[ M("Haircut","Haircut","a haircut","haircut"), M("Facial","Facial","a facial","facial"),
            M("Hair colour","Hair colour","hair colouring","hair colour"), M("Hair spa","Hair spa","a hair spa","hair spa"),
            M("Beard","Beard","beard grooming","beard trim"), M("Makeup","Makeup","makeup","makeup"),
            M("Mani-pedi","Mani-pedi","a mani-pedi","mani-pedi") ]
      },
      aspects:[
        A("Skilled staff", "Expert staff", "the skilled staff", "staff ki expertise", "the staff's skill", "staff ki expertise"),
        A("Hygiene", "Hygiene", "the hygiene", "hygiene"),
        A("Final look", "Result", "the final result", "result"),
        A("Friendly staff", "Achha behaviour", "the friendly behaviour", "staff ka behaviour", "the behaviour", "staff ka behaviour"),
        A("On time", "Time pe", "being on time", "time ki pabandi", "the waiting time", "waiting time"),
        A("Value for money", "Price", "the value for money", "price", "the pricing", "price")
      ]
    },
    clinic: {
      label:"Clinic / Doctor", noun:{en:"clinic", hi:"clinic"}, nouns:{en:"clinics", hi:"clinics"},
      aspects:[
        A("Doctor", "Doctor", "the doctor's care and attention", "doctor ka dhyan se dekhna", "the doctor's attention", "doctor ka attention"),
        A("Treatment", "Ilaaj", "the treatment", "ilaaj"),
        STAFF, CLEAN,
        A("Short wait", "Kam waiting", "the short waiting time", "kam waiting", "the waiting time", "waiting time"),
        A("Fees", "Fees", "the reasonable fees", "fees", "the fees", "fees")
      ]
    },
    gym: {
      label:"Gym / Fitness", noun:{en:"gym", hi:"gym"}, nouns:{en:"gyms", hi:"gyms"},
      extra:{
        t:{ en:"How long have you been coming?", hi:"Kab se aa rahe ho?" }, type:"single",
        o:[
          S("New member", "Naya member", same(["Joined recently."]), same(["Abhi kuch time pehle join kiya hai."])),
          S("1–6 months", "1–6 mahine", same(["Been a member for a few months now."]), same(["Kuch mahino se member hoon."])),
          S("6+ months", "6+ mahine", { good:["Been training here for a long time."], bad:["Been a member for a long time."] }, same(["Kaafi time se yahan aa rahe hain."]))
        ]
      },
      aspects:[
        A("Equipment", "Equipment", "the equipment", "equipment"),
        A("Trainers", "Trainers", "the trainers", "trainers"),
        CLEAN,
        A("Vibe", "Vibe", "the vibe", "vibe"),
        A("Timings", "Timings", "the flexible timings", "timings", "the timings", "timings"),
        A("Fees", "Fees", "the value for money", "fees", "the fees", "fees")
      ]
    },
    shop: {
      label:"Shop / Store", noun:{en:"store", hi:"shop"}, nouns:{en:"stores", hi:"shops"},
      aspects:[
        A("Variety", "Variety", "the variety of products", "saamaan ki variety"),
        A("Quality", "Quality", "the product quality", "quality"),
        A("Prices", "Rate", "the prices", "rate"),
        A("Helpful staff", "Staff", "the helpful staff", "staff ka behaviour", "the staff behaviour", "staff ka behaviour"),
        A("Quick billing", "Jaldi billing", "the quick billing", "jaldi billing", "the billing speed", "billing")
      ]
    },
    hotel: {
      label:"Hotel / Stay", noun:{en:"hotel", hi:"hotel"}, nouns:{en:"hotels", hi:"hotels"},
      extra:{
        t:{ en:"What kind of trip was it?", hi:"Kis tarah ki trip thi?" }, type:"single",
        o:[
          S("Family", "Family",
            { good:["Stayed here with family and it was comfortable for everyone."], bad:["Stayed here with family."] },
            { good:["Family ke saath ruke the, sabke liye comfortable raha."], bad:["Family ke saath ruke the."] }),
          S("Work", "Kaam se",
            { good:["Stayed here for work and it was very convenient."], bad:["Stayed here on a work trip."] },
            { good:["Kaam ke silsile mein ruke the, bahut convenient raha."], bad:["Work trip pe ruke the."] }),
          S("Couple", "Couple",
            { good:["Lovely stay for a couple."], bad:["Stayed here as a couple."] },
            { good:["Couple ke liye bahut achha stay hai."], bad:["Couple stay tha."] }),
          S("Friends", "Dost",
            { good:["Great stay with friends."], bad:["Stayed here with friends."] },
            { good:["Doston ke saath stay bahut mazedaar raha."], bad:["Doston ke saath ruke the."] })
        ]
      },
      aspects:[
        A("Rooms", "Room", "the rooms", "room"),
        CLEAN, STAFF,
        A("Location", "Location", "the location", "location"),
        A("Food", "Khana", "the food", "khana"),
        A("Value for money", "Price", "the value for money", "price", "the pricing", "price")
      ]
    },
    other: {
      label:"Other service", noun:{en:"place", hi:"jagah"}, nouns:{en:"places", hi:"places"},
      aspects:[
        A("Quality of work", "Kaam ki quality", "the quality of work", "kaam ki quality"),
        A("Professional staff", "Staff", "the professional staff", "staff", "the staff", "staff"),
        A("On-time service", "Time pe kaam", "the timely service", "time pe kaam", "the turnaround time", "time"),
        A("Fair pricing", "Price", "the fair pricing", "price", "the pricing", "price"),
        A("Communication", "Baat-cheet", "the clear communication", "baat-cheet", "the communication", "baat-cheet")
      ]
    }
  };
})();
